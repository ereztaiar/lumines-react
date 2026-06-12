import React, { useRef, useState } from "react";
import { createEmptyGrid } from "@lumines/game-components/src/components/Board";
import { useGameSounds } from "./useGameSounds";
import { useCubeState } from "./useCubeState";
import { useGameLoop, MAX_TICK, INITIAL_TICK } from "./useGameLoop";
import { useGameKeys } from "./useGameKeys";

const GameView = (props) => {
  const { scoring: { deletedBlocks, multiplier, resetScore }, children } = props;
  const [pause, togglePause] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [grid, setGridState] = useState(() => createEmptyGrid().next().value);
  // Mutation paths (loop, keys, drop) read the grid through this ref so an
  // async tick or key handler never operates on a render-stale outer array
  // whose columns gravity has already replaced. State stays render-only.
  const gridRef = useRef(grid);
  const setGrid = (next) => {
    gridRef.current = next;
    setGridState(next);
  };

  const sounds = useGameSounds();
  const cube = useCubeState({ gridRef, setGrid, setIsGameOver });
  const { tick, currentDeleted } = useGameLoop({ gridRef, setGrid, pause, isGameOver, cube, scoring: { deletedBlocks, multiplier } });
  useGameKeys({ gridRef, setGrid, cube, pause, togglePause, sounds });

  return (
    <>
      {children({
        currentCube: cube.currentCube,
        setCurrentCube: cube.setCurrentCube,
        grid,
        setGrid,
        newCube: cube.newCube,
        setNewCube: cube.setNewCube,
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
