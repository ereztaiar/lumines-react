import useKey from "@lumines/core/src/hooks/useKey";
import { KEYS } from "@lumines/core";
import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser";
import * as swap from "Util/swap";
import { nop } from "./nop";

const useGameKeys = (props) => {
  const { gridRef, setGrid, cube, pause, togglePause, sounds } = props;
  const { playRotate, playDrop, playMoveLeft, playMoveRight } = sounds;

  useKey(
    async (key, repeat, code) => {
      // !repeat: a held Escape must toggle pause once, not every auto-repeat tick
      if (code === "KeyP" || (key === KEYS.ESCAPE && !repeat)) {
        togglePause(!pause);
      }
      if (pause) {
        return;
      }
      try {
        if (cube.isSplitRef.current) {
          return;
        }
        let updatedGrid, dest;
        switch (key) {
          case "ArrowLeft":
            playMoveLeft();
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
            playMoveRight();
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
        if (typeof updatedGrid !== "undefined") {
          setGrid([...updatedGrid]);
        }
        if (typeof dest !== "undefined") {
          cube.setCurrentCube({ ...dest });
        }
      } catch (ex) {
        if (process.env.NODE_ENV !== 'production') console.error(ex);
      }
    },
    async (key) => {
      if (cube.isSplitRef.current || pause) {
        return;
      }
      try {
        let updatedGrid, dest;
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
        if (typeof updatedGrid !== "undefined") {
          setGrid([...updatedGrid]);
        }
        if (typeof dest !== "undefined") {
          cube.setCurrentCube({ ...dest });
        }
      } catch (ex) {
        if (process.env.NODE_ENV !== 'production') console.error(ex);
      }
    },
  );
};

export { useGameKeys };
