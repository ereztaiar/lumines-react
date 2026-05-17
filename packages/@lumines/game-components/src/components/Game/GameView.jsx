import React, { useState } from "react";
import { createEmptyGrid } from "@lumines/game-components/src/components/Board";
import { useGameSounds } from "./useGameSounds";
import { useCubeState } from "./useCubeState";
import { useGameLoop, MAX_TICK, INITIAL_TICK } from "./useGameLoop";
import { useGameKeys } from "./useGameKeys";

const GameView = (props) => {
  const { scoring: { deletedBlocks, multiplier, resetScore }, children } = props;
  const [pause, togglePause] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [grid, setGrid] = useState(() => createEmptyGrid().next().value);

  const sounds = useGameSounds();
  const cube = useCubeState({ grid, setGrid, setIsGameOver });
  const { tick, currentDeleted } = useGameLoop({ grid, setGrid, pause, isGameOver, cube, scoring: { deletedBlocks, multiplier } });
  useGameKeys({ grid, setGrid, cube, pause, togglePause, sounds });

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
