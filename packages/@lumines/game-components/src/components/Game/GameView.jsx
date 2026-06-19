import React, { useRef, useState } from "react";
import { createEmptyGrid } from "@lumines/game-components/src/components/Board";
import { useGameSounds } from "./useGameSounds";
import { useCubeState } from "./useCubeState";
import { useGameLoop, MAX_TICK, INITIAL_TICK } from "./useGameLoop";
import { useGameKeys } from "./useGameKeys";
import useCountdown from "./useCountdown";

const GameView = (props) => {
  const { mode, muted, skinSounds, speed, scoring: { deletedBlocks, multiplier, resetScore }, children } = props;
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

  const sounds = useGameSounds(skinSounds, muted);
  const cube = useCubeState({ gridRef, setGrid, setIsGameOver });
  const { tick, currentDeleted } = useGameLoop({ gridRef, setGrid, pause, isGameOver, cube, speed, scoring: { deletedBlocks, multiplier }, sounds });
  useGameKeys({ gridRef, setGrid, cube, pause, togglePause, sounds });
  const timeRemaining = useCountdown({ mode, pause, isGameOver, tick, onTimeUp: () => setIsGameOver(true) });

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
        timeRemaining,
        mode,
      })}
    </>
  );
};

export default GameView;
export { MAX_TICK, INITIAL_TICK };
