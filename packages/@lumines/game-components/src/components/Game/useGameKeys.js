import { useEffect, useRef } from "react";
import useKey from "@lumines/core/src/hooks/useKey";
import { KEYS } from "@lumines/core";
import * as swap from "Util/swap";
import { initialHeldDirection, pressDirection, releaseDirection } from "Util/heldDirection";
import { nop } from "./nop";

const useGameKeys = (props) => {
  const { gridRef, setGrid, cube, pause, togglePause, sounds, speed = 35 } = props;
  const { playRotate, playDrop, playMoveLeft, playMoveRight } = sounds;

  // Repeating every core game tick (35ms) felt too sharp/twitchy as input —
  // held left/right gets its own, slower cadence, decoupled from the tick
  // rate that drives drop/sweep timing.
  const moveRepeatSpeed = speed * 3.5;

  // Left/right repeat is driven by our own interval (below), not by the
  // browser's keydown auto-repeat (inconsistent initial delay + OS-controlled
  // rate) — this ref just tracks which arrow is currently physically held.
  const holdRef = useRef(initialHeldDirection());

  // The repeat interval below is a raw setInterval, not a React-driven
  // callback, so it can't pick up prop changes on its own — read pause live
  // through a ref kept in sync each render.
  const pauseRef = useRef(pause);
  useEffect(() => {
    pauseRef.current = pause;
  }, [pause]);

  const move = async (direction) => {
    if (cube.isSplitRef.current) {
      return;
    }
    try {
      const swapFn = direction === "left" ? swap.moveLeft : swap.moveRight;
      const playSound = direction === "left" ? playMoveLeft : playMoveRight;
      playSound();
      // Refs, not closure state: a handler can fire inside a tick's nop()
      // yield, after the cube has already moved — swapping cells at the
      // closure's stale position orphans half the cube.
      const [updatedGrid, dest] = await swapFn(
        gridRef.current,
        cube.currentCubeRef.current,
      );
      await nop();
      if (typeof updatedGrid !== "undefined") {
        setGrid([...updatedGrid]);
      }
      if (typeof dest !== "undefined") {
        cube.setCurrentCube({ ...dest });
      }
    } catch (ex) {
      if (process.env.NODE_ENV !== 'production') console.error(ex);
    }
  };

  // A free-running interval started once at mount has a phase unrelated to
  // when the player actually presses a key — a tap shorter than
  // moveRepeatSpeed could still coincide with a stray tick and double-move.
  // Starting the interval fresh on every new press anchors its first tick to
  // moveRepeatSpeed after that press, so a short tap can never overlap one.
  const repeatIntervalRef = useRef(null);

  const stopRepeat = () => {
    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  };

  const startRepeat = () => {
    stopRepeat();
    repeatIntervalRef.current = setInterval(() => {
      if (pauseRef.current || cube.isSplitRef.current) {
        return;
      }
      const { active } = holdRef.current;
      if (active) {
        move(active);
      }
    }, moveRepeatSpeed);
  };

  useEffect(() => {
    // Losing window focus (e.g. alt-tab) while a key is held never fires a
    // matching keyup — without this, the repeat interval would keep moving
    // the cube forever in the last-held direction.
    const clearHold = () => {
      holdRef.current = initialHeldDirection();
      stopRepeat();
    };
    window.addEventListener("blur", clearHold);
    return () => {
      window.removeEventListener("blur", clearHold);
      stopRepeat();
    };
  }, []);

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
        switch (key) {
          case "ArrowLeft":
          case "ArrowRight": {
            // Ignore native OS auto-repeat entirely — the interval above
            // drives repeat at our own slower cadence instead.
            if (repeat) {
              return;
            }
            const direction = key === "ArrowLeft" ? "left" : "right";
            holdRef.current = pressDirection(holdRef.current, direction);
            startRepeat();
            // A quick tap can release before the interval's first tick,
            // which would otherwise silently swallow the move — step
            // immediately on press; the interval only handles continued holds.
            await move(direction);
            return;
          }
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
      } catch (ex) {
        if (process.env.NODE_ENV !== 'production') console.error(ex);
      }
    },
    async (key) => {
      // Releasing left/right must always clear the hold, even while paused or
      // split — otherwise a key released during a pause leaves the repeat
      // interval moving the cube on its own once play resumes.
      if (key === "ArrowLeft" || key === "ArrowRight") {
        const direction = key === "ArrowLeft" ? "left" : "right";
        holdRef.current = releaseDirection(holdRef.current, direction);
        if (!holdRef.current.active) {
          stopRepeat();
        }
        return;
      }
      if (cube.isSplitRef.current || pause) {
        return;
      }
      try {
        let updatedGrid, dest;
        switch (key) {
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
