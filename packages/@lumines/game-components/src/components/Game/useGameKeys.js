import useKey from "@lumines/core/src/hooks/useKey";
import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser";
import * as swap from "Util/swap";
import { nop } from "./nop";

const useGameKeys = (props) => {
  const { gridRef, setGrid, cube, pause, togglePause, sounds } = props;
  const { playRotate, playDrop, playMove } = sounds;

  useKey(
    async (key, repeat) => {
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
            // Refs, not closure state: a handler can fire inside a tick's
            // nop() yield, after the cube has already moved — swapping cells
            // at the closure's stale position orphans half the cube.
            [updatedGrid, dest] = await swap.moveLeft(
              gridRef.current,
              cube.currentCubeRef.current,
            );
            await nop();
            break;
          case "ArrowRight":
            playMove();
            [updatedGrid, dest] = await swap.moveRight(
              gridRef.current,
              cube.currentCubeRef.current,
            );
            await nop();
            break;
          case "ArrowDown":
            // Auto-repeat from a held key must not start the next cube the
            // instant it spawns — only a fresh press begins a hard drop.
            if (repeat) {
              return;
            }
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
            [updatedGrid, dest] = await swap.rotate(
              gridRef.current,
              cube.currentCubeRef.current,
            );
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
