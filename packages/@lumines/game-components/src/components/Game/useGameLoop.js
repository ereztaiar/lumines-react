import { useEffect, useRef, useState } from "react";
import useTimer from "@lumines/core/src/hooks/useTimer";
import {
  prepareForDeletion,
  revertUncommittedMarks,
  commitColumnAsSweeping,
  clearSweptColumn,
} from "Util/clear-blocks";

const MAX_TICK = 160;
const INITIAL_TICK = 0;

const useGameLoop = (props) => {
  const { grid, setGrid, pause, isGameOver, cube, scoring } = props;
  const { deletedBlocks, multiplier } = scoring;

  const [tick, setTick] = useState(INITIAL_TICK);
  const [currentDeleted, setCurrentDeleted] = useState(0);
  const prevSwiperColRef = useRef(null);
  const speed = 35;

  useTimer(async () => {
    if (pause || isGameOver) {
      return;
    }

    setTick(tick + 1 === MAX_TICK ? INITIAL_TICK : tick + 1);

    if (cube.dropCount === MAX_TICK / 2) {
      await cube.startDrop();
    } else if (cube.isHardDropping || tick % 10 === 0) {
      const liveCube = await cube.drop();

      const swiperCol = Math.floor(tick / 10);
      const prevSwiperCol = prevSwiperColRef.current;
      let score = 0;

      await revertUncommittedMarks(grid);
      await prepareForDeletion(grid);
      await commitColumnAsSweeping(grid, swiperCol);

      if (prevSwiperCol !== null && prevSwiperCol !== swiperCol) {
        score += await clearSweptColumn(grid, prevSwiperCol, liveCube);
      }
      prevSwiperColRef.current = swiperCol;

      deletedBlocks(score);
      setCurrentDeleted(currentDeleted + score);
      multiplier(score);
    }

    if (tick === MAX_TICK - 1) {
      setCurrentDeleted(0);
    }

    if (cube.dropCount >= MAX_TICK) {
      cube.setDropCount(0);
    }

    setGrid([...grid]);
  }, speed);

  useEffect(() => {
    if (tick % 10) {
      cube.setDropCount(cube.dropCount + 1);
    }
    return () => {};
  }, [tick]);

  return { tick, currentDeleted };
};

export { useGameLoop, MAX_TICK, INITIAL_TICK };
