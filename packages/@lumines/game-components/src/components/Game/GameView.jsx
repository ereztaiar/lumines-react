import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { createEmptyGrid } from "@lumines/game-components/src/components/Board";
import {
  generateCube,
  dispenseOrder,
  CUBE_STATES,
} from "@lumines/game-components/src/components/Dispenser";
import useTimer from "@lumines/core/src/hooks/useTimer";
import useKey from "@lumines/core/src/hooks/useKey"; // todo: replace with context
import * as swap from "Util/swap";
import * as sounds from "Assets/sounds";
import {
  clearFromDeletion,
  prepareForDeletion,
  clearColumn,
} from "Util/clear-blocks";

const MAX_TICK = 160;
const INITIAL_TICK = 0;

function nop() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 0);
  });
}

const GameView = (props) => {
  const {
    scoring: { addOne, multiplier, deletedBlocks, resetScore },
    children,
  } = props;

  const [pause, togglePause] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [currentCube, setCurrentCube] = useState(() => generateCube().next().value);
  const [newCube, setNewCube] = useState(CUBE_STATES.WAITING);
  const [grid, setGrid] = useState(() => createEmptyGrid().next().value);
  const [isSplit, setIsSplit] = useState(false);
  const isSplitRef = useRef(false);
  const setSplit = (val) => { isSplitRef.current = val; setIsSplit(val); };
  const [isHardDropping, setIsHardDropping] = useState(false);
  const [speed, setSpeed] = useState(35);
  const [dropCount, setDropCount] = useState(0);
  const [playRotate] = useSound(sounds.waterDrop);
  const [playDrop] = useSound(sounds.lazer2);
  const [playMove] = useSound(sounds.drip);
  const [currentDeleted, setCurrentDeleted] = useState(0);

  const [tick, setTick] = useState(INITIAL_TICK);

  const startDrop = async () => {
    setNewCube(CUBE_STATES.DROP);
    setSplit(false);
  };

  const drop = async () => {
    if (newCube !== CUBE_STATES.DROP) {
      return;
    }
    try {
      const [updatedGrid, dest, outOfBounds] = await swap.moveDown(
        grid,
        currentCube,
      );
      if (outOfBounds === swap.errors.OUT_OF_BOUNDS) {
        setNewCube(CUBE_STATES.NEW);
        setDropCount(0);
        setIsHardDropping(false);
        return;
      }

      if (typeof dest !== "undefined") {
        if (Math.abs(dest?.bottomLeft?.y - dest?.bottomRight?.y) > 0) {
          setSplit(true);
        }
        setCurrentCube({ ...dest });
      }
      setGrid([...updatedGrid]);
      await nop();
    } catch (e) {
      // console.log(e)
    }
  };

  useTimer(async () => {
    if (pause || isGameOver) {
      return;
    }

    setTick(tick + 1 === MAX_TICK ? INITIAL_TICK : tick + 1);
    if (tick === 1) {
      clearFromDeletion(grid);
      setCurrentDeleted(0);
    }

    if (dropCount === MAX_TICK / 2) {
      await startDrop();
    } else if (isHardDropping || tick % 10 === 0) {
      await drop();

      prepareForDeletion(grid);
      const score = await clearColumn(grid, tick / 10);
      deletedBlocks(score);
      setCurrentDeleted(currentDeleted + score);
      multiplier(score);
    }
    if (dropCount >= MAX_TICK) {
      setDropCount(0);
    }

    setGrid([...grid]);
  }, speed);

  useKey(
    async (key) => {
      if (key === "p") {
        togglePause(!pause);
      }
      if (pause) {
        return;
      }
      try {
        if (isSplitRef.current) {
          return;
        }
        let updatedGrid, dest, outOfBounds;
        switch (key) {
          case "ArrowLeft":
            playMove();
            [updatedGrid, dest] = await swap.moveLeft(grid, currentCube);
            await nop();
            break;
          case "ArrowRight":
            playMove();
            [updatedGrid, dest] = await swap.moveRight(grid, currentCube);
            await nop();
            break;
          case "ArrowDown":
            playDrop();
            await startDrop();
            setIsHardDropping(true);
            return;
          default:
            break;
        }
        setGrid([...updatedGrid]);
        if (outOfBounds === swap.errors.OUT_OF_BOUNDS) {
          setNewCube(CUBE_STATES.NEW);
          setDropCount(0);
          return;
        }
        if (typeof dest !== "undefined") {
          setCurrentCube({ ...dest });
        }
      } catch (ex) {}
    },
    async (key) => {
      if (isSplitRef.current || pause) {
        return;
      }
      try {
        let updatedGrid, dest, outOfBounds;
        switch (key) {
          case "ArrowLeft":
            break;
          case "ArrowRight":
            break;
          case " ": // space
          case "ArrowUp":
            playRotate();
            [updatedGrid, dest] = await swap.rotate(grid, currentCube);
            await nop();
            break;
          default:
            break;
        }

        setGrid([...updatedGrid]);
        if (outOfBounds === swap.errors.OUT_OF_BOUNDS) {
          setNewCube(CUBE_STATES.NEW);
          setDropCount(0);
          return;
        }
        if (typeof dest !== "undefined") {
          setCurrentCube({ ...dest });
        }
      } catch (ex) {}
    },
  );

  useEffect(() => {
    if (newCube === CUBE_STATES.READY) {
      const spawnBlocked = dispenseOrder.some((order) => {
        const block = currentCube[order];
        return grid[block.x]?.[block.y] !== 0;
      });
      if (spawnBlocked) {
        setIsGameOver(true);
        return;
      }
      dispenseOrder.map((order, idx) => {
        const block = currentCube[order];
        grid[block.x][block.y] = block.Block;
      });
      setGrid([...grid]);
      setSplit(false);
      setNewCube(CUBE_STATES.WAITING);
    }
    return () => {};
  }, [newCube]);

  useEffect(() => {
    setNewCube(CUBE_STATES.NEW);
    return () => {};
  }, []);

  useEffect(() => {
    if (tick % 10) {
      setDropCount(dropCount + 1);
    }
    return () => {};
  }, [tick]);

  return (
    <>
      {children({
        currentCube,
        setCurrentCube,
        grid,
        setGrid,
        newCube,
        setNewCube,
        tick,
        currentDeleted,
        pause,
        togglePause,
        resetScore,
        isGameOver,
      })}
    </>
  );
};

export default GameView;
export { MAX_TICK, INITIAL_TICK };
