import { useEffect, useRef, useState } from "react";
import {
  generateCube,
  dispenseOrder,
  CUBE_STATES,
} from "@lumines/game-components/src/components/Dispenser";
import * as swap from "Util/swap";
import { nop } from "./nop";

const useCubeState = (props) => {
  const { grid, setGrid, setIsGameOver } = props;

  const [currentCube, setCurrentCube] = useState(
    () => generateCube().next().value,
  );
  const [newCube, setNewCube] = useState(CUBE_STATES.WAITING);
  const [isSplit, setIsSplit] = useState(false);
  const isSplitRef = useRef(false);
  const [isHardDropping, setIsHardDropping] = useState(false);
  const [dropCount, setDropCount] = useState(0);

  const setSplit = (val) => {
    isSplitRef.current = val;
    setIsSplit(val);
  };

  const startDrop = async () => {
    setNewCube(CUBE_STATES.DROP);
    setSplit(false);
  };

  const drop = async () => {
    if (newCube !== CUBE_STATES.DROP) {
      return null;
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
        return null;
      }
      if (typeof dest !== "undefined") {
        if (Math.abs(dest?.bottomLeft?.y - dest?.bottomRight?.y) > 0) {
          setSplit(true);
        }
        setCurrentCube({ ...dest });
      }
      setGrid([...updatedGrid]);
      await nop();
      return dest || null;
    } catch (e) {
      return null;
    }
  };

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
      dispenseOrder.map((order) => {
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

  return {
    currentCube,
    setCurrentCube,
    newCube,
    setNewCube,
    isSplit,
    setSplit,
    isSplitRef,
    isHardDropping,
    setIsHardDropping,
    dropCount,
    setDropCount,
    startDrop,
    drop,
  };
};

export { useCubeState };
