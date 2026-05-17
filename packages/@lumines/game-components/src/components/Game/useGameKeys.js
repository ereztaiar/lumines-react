import useKey from "@lumines/core/src/hooks/useKey";
import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser";
import * as swap from "Util/swap";
import { nop } from "./nop";

const useGameKeys = (props) => {
  const { grid, setGrid, cube, pause, togglePause, sounds } = props;
  const { playRotate, playDrop, playMove } = sounds;

  useKey(
    async (key) => {
      if (key === "p") {
        togglePause(!pause);
      }
      if (pause) {
        return;
      }
      try {
        if (cube.isSplitRef.current) {
          return;
        }
        let updatedGrid, dest, outOfBounds;
        switch (key) {
          case "ArrowLeft":
            playMove();
            [updatedGrid, dest] = await swap.moveLeft(grid, cube.currentCube);
            await nop();
            break;
          case "ArrowRight":
            playMove();
            [updatedGrid, dest] = await swap.moveRight(grid, cube.currentCube);
            await nop();
            break;
          case "ArrowDown":
            playDrop();
            await cube.startDrop();
            cube.setIsHardDropping(true);
            return;
          default:
            break;
        }
        setGrid([...updatedGrid]);
        if (outOfBounds === swap.errors.OUT_OF_BOUNDS) {
          cube.setNewCube(CUBE_STATES.NEW);
          cube.setDropCount(0);
          return;
        }
        if (typeof dest !== "undefined") {
          cube.setCurrentCube({ ...dest });
        }
      } catch (ex) {}
    },
    async (key) => {
      if (cube.isSplitRef.current || pause) {
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
            [updatedGrid, dest] = await swap.rotate(grid, cube.currentCube);
            await nop();
            break;
          default:
            break;
        }
        setGrid([...updatedGrid]);
        if (outOfBounds === swap.errors.OUT_OF_BOUNDS) {
          cube.setNewCube(CUBE_STATES.NEW);
          cube.setDropCount(0);
          return;
        }
        if (typeof dest !== "undefined") {
          cube.setCurrentCube({ ...dest });
        }
      } catch (ex) {}
    },
  );
};

export { useGameKeys };
