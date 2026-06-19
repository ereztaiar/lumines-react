import { useEffect, useRef, useState } from "react";
import useTimer from "@lumines/core/src/hooks/useTimer";
import {
  prepareForDeletion,
  revertUncommittedMarks,
  commitColumnAsSweeping,
  clearAllSweptCells,
  resolveAnchorCube,
} from "Util/clear-blocks";

const MAX_TICK = 160;
const INITIAL_TICK = 0;

const useGameLoop = (props) => {
  const { gridRef, setGrid, pause, isGameOver, cube, speed = 35, scoring } = props;
  const { deletedBlocks, multiplier } = scoring;

  const [tick, setTick] = useState(INITIAL_TICK);
  const [currentDeleted, setCurrentDeleted] = useState(0);
  const prevSwiperColRef = useRef(-1);

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

      await revertUncommittedMarks(grid);
      await prepareForDeletion(grid);

      const swiperAdvanced = prevSwiperCol !== swiperCol;
      // Wrap (last col → 0): flush any group left at the right edge of the board
      // before this pass commits new marks that would blend into it.
      if (swiperAdvanced && swiperCol < prevSwiperCol) {
        score += await clearAllSweptCells(grid, anchorCube());
      }

      const committed = await commitColumnAsSweeping(grid, swiperCol);

      // The swiper entered a column with nothing to promote, so every SWEEPING
      // cell to its left belongs to a fully-passed group — erase them together.
      // Sweeping is deferred this way so a marked group only vanishes (and
      // gravity only runs) once the swiper has crossed all of it.
      if (swiperAdvanced && committed === 0) {
        score += await clearAllSweptCells(grid, anchorCube());
      }
      prevSwiperColRef.current = swiperCol;

      deletedBlocks(score);
      setCurrentDeleted(currentDeleted + score);
      multiplier(score);
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
  }, [tick]);

  return { tick, currentDeleted };
};

export { useGameLoop, MAX_TICK, INITIAL_TICK };
