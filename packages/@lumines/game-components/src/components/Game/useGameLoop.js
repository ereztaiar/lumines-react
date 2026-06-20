import { useEffect, useRef, useState } from "react";
import useTimer from "@lumines/core/src/hooks/useTimer";
import {
  prepareForDeletion,
  revertUncommittedMarks,
  commitColumnAsSweeping,
  clearAllSweptCells,
  resolveAnchorCube,
  isGridEmpty,
  advanceChain,
  resetChainIfNoClear,
} from "Util/clear-blocks";

const MAX_TICK = 160;
const INITIAL_TICK = 0;

const useGameLoop = (props) => {
  const { gridRef, setGrid, pause, isGameOver, cube, speed = 35, scoring, sounds } = props;
  const { deletedBlocks, multiplier, allClearBonus } = scoring;
  const playDeletion = sounds && sounds.playDeletion ? sounds.playDeletion : () => {};

  const [tick, setTick] = useState(INITIAL_TICK);
  const [currentDeleted, setCurrentDeleted] = useState(0);
  const [chainCount, setChainCount] = useState(0);
  const prevSwiperColRef = useRef(-1);
  const chainCountRef = useRef(0);
  const lapHadClearRef = useRef(false);

  useTimer(async () => {
    if (pause || isGameOver) {
      return;
    }

    setTick(tick + 1 === MAX_TICK ? INITIAL_TICK : tick + 1);

    if (cube.dropCountRef.current === MAX_TICK / 2) {
      await cube.startDrop();
    } else if (cube.isHardDropping || tick % 10 === 0) {
      await cube.drop();
      // The anchor pins the live cube's cells against sweep-clears and gravity.
      // It is resolved from refs at clear time, never from render-closure state:
      // landing flushes the spawn chain (NEW → READY → draw → WAITING) in the
      // middle of this very tick, and a key event can move the cube during a
      // nop() yield — a closure-based anchor misses both and lets gravity pull
      // a drawn cube's columns into the stack, splitting it.
      const anchorCube = () =>
        resolveAnchorCube(cube.newCubeRef.current, cube.currentCubeRef.current);

      const grid = gridRef.current;
      const swiperCol = Math.floor(tick / 10);
      const prevSwiperCol = prevSwiperColRef.current;
      let score = 0;

      // A clear event is one square (or chained group) the swiper actually
      // erased. Each one bumps the chain counter and scores at that chain's
      // multiplier — consecutive clears across a full sweep revolution build
      // toward a bigger payoff, mirroring the original game's chain bonus.
      const registerClear = (cleared) => {
        if (cleared <= 0) return;
        playDeletion();
        lapHadClearRef.current = true;
        chainCountRef.current = advanceChain(chainCountRef.current);
        setChainCount(chainCountRef.current);
        multiplier(cleared, chainCountRef.current);
        if (isGridEmpty(grid, anchorCube())) allClearBonus();
      };

      await revertUncommittedMarks(grid);
      await prepareForDeletion(grid);

      const swiperAdvanced = prevSwiperCol !== swiperCol;
      // Wrap (last col → 0): flush any group left at the right edge of the board
      // before this pass commits new marks that would blend into it.
      if (swiperAdvanced && swiperCol < prevSwiperCol) {
        // A full revolution just completed with nothing cleared breaks the
        // chain. This check runs before this tick's own wrap-clear is
        // registered, so a clear straddling the wrap boundary still extends
        // the chain instead of resetting it.
        chainCountRef.current = resetChainIfNoClear(chainCountRef.current, lapHadClearRef.current);
        setChainCount(chainCountRef.current);
        lapHadClearRef.current = false;

        const cleared = await clearAllSweptCells(grid, anchorCube());
        registerClear(cleared);
        score += cleared;
      }

      const committed = await commitColumnAsSweeping(grid, swiperCol);

      // The swiper entered a column with nothing to promote, so every SWEEPING
      // cell to its left belongs to a fully-passed group — erase them together.
      // Sweeping is deferred this way so a marked group only vanishes (and
      // gravity only runs) once the swiper has crossed all of it.
      if (swiperAdvanced && committed === 0) {
        const cleared = await clearAllSweptCells(grid, anchorCube());
        registerClear(cleared);
        score += cleared;
      }
      prevSwiperColRef.current = swiperCol;

      deletedBlocks(score);
      setCurrentDeleted(currentDeleted + score);
    }

    if (tick === MAX_TICK - 1) {
      setCurrentDeleted(0);
    }

    if (cube.dropCountRef.current >= MAX_TICK) {
      cube.setDropCount(0);
    }

    setGrid([...gridRef.current]);
  }, speed);

  useEffect(() => {
    if (tick % 10) {
      cube.setDropCount((prev) => prev + 1);
    }
    return () => { /* placeholder for future cleanup */ };
    // cube is recreated every render of useCubeState; setDropCount always
    // writes through dropCountRef regardless of which render's closure called
    // it, so depending on the live `cube` object here would only make this
    // effect re-run on every render without changing its behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return { tick, currentDeleted, chainCount };
};

export { useGameLoop, MAX_TICK, INITIAL_TICK };
