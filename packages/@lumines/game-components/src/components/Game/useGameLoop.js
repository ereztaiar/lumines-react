import { useEffect, useRef, useState } from "react";
import useTimer from "@lumines/core/src/hooks/useTimer";
import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser";
import {
  prepareForDeletion,
  revertUncommittedMarks,
  commitColumnAsSweeping,
  clearAllSweptCells,
} from "Util/clear-blocks";

const MAX_TICK = 160;
const INITIAL_TICK = 0;

const useGameLoop = (props) => {
  const { grid, setGrid, pause, isGameOver, cube, scoring } = props;
  const { deletedBlocks, multiplier } = scoring;

  const [tick, setTick] = useState(INITIAL_TICK);
  const [currentDeleted, setCurrentDeleted] = useState(0);
  const prevSwiperColRef = useRef(-1);
  const speed = 35;

  useTimer(async () => {
    if (pause || isGameOver) {
      return;
    }

    setTick(tick + 1 === MAX_TICK ? INITIAL_TICK : tick + 1);

    if (cube.dropCountRef.current === MAX_TICK / 2) {
      await cube.startDrop();
    } else if (cube.isHardDropping || tick % 10 === 0) {
      const liveCube = await cube.drop();
      // drop() returns null both for a landed cube (which must fall with
      // gravity like any stack block) and for a WAITING cube that is already
      // drawn in the grid but not dropping yet — that one must stay pinned or
      // its grid cells fall away from the currentCube descriptor.
      const anchorCube =
        liveCube ||
        (cube.newCube === CUBE_STATES.WAITING ? cube.currentCube : null);

      const swiperCol = Math.floor(tick / 10);
      const prevSwiperCol = prevSwiperColRef.current;
      let score = 0;

      await revertUncommittedMarks(grid);
      await prepareForDeletion(grid);

      const swiperAdvanced = prevSwiperCol !== swiperCol;
      // Wrap (last col → 0): flush any group left at the right edge of the board
      // before this pass commits new marks that would blend into it.
      if (swiperAdvanced && swiperCol < prevSwiperCol) {
        score += await clearAllSweptCells(grid, anchorCube);
      }

      const committed = await commitColumnAsSweeping(grid, swiperCol);

      // The swiper entered a column with nothing to promote, so every SWEEPING
      // cell to its left belongs to a fully-passed group — erase them together.
      // Sweeping is deferred this way so a marked group only vanishes (and
      // gravity only runs) once the swiper has crossed all of it.
      if (swiperAdvanced && committed === 0) {
        score += await clearAllSweptCells(grid, anchorCube);
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

    setGrid([...grid]);
  }, speed);

  useEffect(() => {
    if (tick % 10) {
      cube.setDropCount((prev) => prev + 1);
    }
    return () => {};
  }, [tick]);

  return { tick, currentDeleted };
};

export { useGameLoop, MAX_TICK, INITIAL_TICK };
