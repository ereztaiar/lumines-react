import { useEffect, useRef, useState } from "react";
import {
  generateCube,
  dispenseOrder,
  CUBE_STATES,
} from "@lumines/game-components/src/components/Dispenser";
import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";
import * as swap from "Util/swap";
import { nop } from "./nop";

const { EMPTY } = BLOCKS_TYPES;

const useCubeState = (props) => {
  const { gridRef, setGrid, setIsGameOver } = props;

  const [currentCube, setCurrentCubeState] = useState(
    () => generateCube().next().value,
  );
  // Mutation paths (game loop, key handlers, drop) must read the cube and its
  // state through refs: render-closure state goes stale mid-tick when landing
  // flushes the spawn chain or a key event interleaves at a nop() yield, and a
  // stale descriptor is what let gravity rip a freshly spawned cube in half.
  const currentCubeRef = useRef(currentCube);
  const [newCube, setNewCubeState] = useState(CUBE_STATES.WAITING);
  const newCubeRef = useRef(CUBE_STATES.WAITING);
  const [isSplit, setIsSplit] = useState(false);
  const isSplitRef = useRef(false);
  const [isHardDropping, setIsHardDropping] = useState(false);
  const [dropCount, setDropCountState] = useState(0);
  const dropCountRef = useRef(0);

  const setNewCube = (val) => {
    newCubeRef.current = val;
    setNewCubeState(val);
  };

  const setCurrentCube = (val) => {
    currentCubeRef.current = val;
    setCurrentCubeState(val);
  };

  const setDropCount = (valOrFn) => {
    const next =
      typeof valOrFn === "function" ? valOrFn(dropCountRef.current) : valOrFn;
    dropCountRef.current = next;
    setDropCountState(next);
  };

  const setSplit = (val) => {
    isSplitRef.current = val;
    setIsSplit(val);
  };

  const startDrop = async () => {
    setIsHardDropping(false);
    setNewCube(CUBE_STATES.DROP);
    setSplit(false);
  };

  const drop = async () => {
    if (newCubeRef.current !== CUBE_STATES.DROP) {
      return null;
    }
    try {
      const [updatedGrid, dest, outOfBounds] = await swap.moveDown(
        gridRef.current,
        currentCubeRef.current,
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
      if (process.env.NODE_ENV !== 'production') console.error(e);
      return null;
    }
  };

  useEffect(() => {
    if (newCube === CUBE_STATES.READY) {
      const grid = gridRef.current;
      const cube = currentCubeRef.current;
      const spawnBlocked = dispenseOrder.some((order) => {
        const block = cube[order];
        return grid[block.x]?.[block.y] !== EMPTY;
      });
      if (spawnBlocked) {
        setIsGameOver(true);
        return;
      }
      dispenseOrder.map((order) => {
        const block = cube[order];
        grid[block.x][block.y] = block.Block;
      });
      setGrid([...grid]);
      setSplit(false);
      setNewCube(CUBE_STATES.WAITING);
    }
    return () => { /* placeholder for future cleanup */ };
    // gridRef is a stable ref and setIsGameOver is a stable useState setter;
    // setGrid is recreated every GameView render, so adding it here would make
    // this effect re-run every render instead of only on newCube transitions.
    // The grid mutated above is always read fresh via gridRef.current.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCube]);

  useEffect(() => {
    setNewCube(CUBE_STATES.NEW);
    return () => { /* placeholder for future cleanup */ };
  }, []);

  return {
    currentCube,
    currentCubeRef,
    setCurrentCube,
    newCube,
    newCubeRef,
    setNewCube,
    isSplit,
    setSplit,
    isSplitRef,
    isHardDropping,
    setIsHardDropping,
    dropCount,
    dropCountRef,
    setDropCount,
    startDrop,
    drop,
  };
};

export { useCubeState };
