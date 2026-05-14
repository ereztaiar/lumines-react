import React, { useEffect, useState } from "react";
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

const initialCube = generateCube().next().value;
const initialGrid = createEmptyGrid().next().value;

function nop() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 0);
  });
}

const GameView = (props) => {
  const {
    scoring: { addOne, multiplier, deletedBlocks },
    children,
  } = props;

  const [pause, togglePause] = useState(false);

  const [currentCube, setCurrentCube] = useState(initialCube);
  const [newCube, setNewCube] = useState(CUBE_STATES.WAITING);
  const [grid, setGrid] = useState(initialGrid);
  const [isSplit, setIsSplit] = useState(false);
  const [speed, setSpeed] = useState(35);
  const [dropCount, setDropCount] = useState(0);
  const [playRotate] = useSound(sounds.lazer1);
  const [playDrop] = useSound(sounds.lazer2);
  const [playMove] = useSound(sounds.punch);
  const [currentDeleted, setCurrentDeleted] = useState(0);

  const [tick, setTick] = useState(INITIAL_TICK);

  const startDrop = async () => {
    setNewCube(CUBE_STATES.DROP);
    setIsSplit(false);
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
        return;
      }

      if (typeof dest !== "undefined") {
        if (Math.abs(dest?.bottomLeft?.y - dest?.bottomRight?.y) > 0) {
          setIsSplit(true);
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
    if (pause) {
      return;
    }

    setTick(tick + 1 === MAX_TICK ? INITIAL_TICK : tick + 1);
    if (tick === 1) {
      clearFromDeletion(grid);
      setCurrentDeleted(0);
    }

    if (dropCount === MAX_TICK / 2) {
      await startDrop();
    } else if (tick % 10 === 0) {
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
        if (isSplit) {
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
            [updatedGrid, dest, outOfBounds] = await swap.moveDown(
              grid,
              currentCube,
            );
            addOne();
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
    async (key) => {
      if (isSplit || pause) {
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
          case "ArrowDown":
            [updatedGrid, dest, outOfBounds] = await swap.moveDown(
              grid,
              currentCube,
            );
            addOne();
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
      dispenseOrder.map((order, idx) => {
        const block = currentCube[order];
        grid[block.x][block.y] = block.Block;
      });
      setGrid([...grid]);
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
      })}
    </>
  );
};

export default GameView;
export { MAX_TICK, INITIAL_TICK };
