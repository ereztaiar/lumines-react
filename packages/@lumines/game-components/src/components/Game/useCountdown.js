import { useEffect, useRef, useState } from "react";

const COUNTDOWN_SECONDS = 120;

// Driven by the game loop's `tick` heartbeat (every ~35ms) rather than its
// own interval: a setInterval here gets torn down before it ever fires,
// since useTimer's effect (no deps) is re-run on every game-loop render.
const useCountdown = (props) => {
  const { mode, pause, isGameOver, tick, onTimeUp } = props;
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);
  const startedAtRef = useRef(null);
  const pausedAtRef = useRef(null);
  const pausedTotalRef = useRef(0);
  const timeUpRef = useRef(false);

  useEffect(() => {
    if (mode !== 'time-attack' || isGameOver || timeUpRef.current) {
      return;
    }

    if (startedAtRef.current === null) {
      startedAtRef.current = Date.now();
    }

    if (pause) {
      if (pausedAtRef.current === null) {
        pausedAtRef.current = Date.now();
      }
      return;
    }

    if (pausedAtRef.current !== null) {
      pausedTotalRef.current += Date.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }

    const elapsedSeconds = (Date.now() - startedAtRef.current - pausedTotalRef.current) / 1000;
    const next = Math.max(0, Math.ceil(COUNTDOWN_SECONDS - elapsedSeconds));

    setRemaining(next);

    if (next === 0) {
      timeUpRef.current = true;
      onTimeUp();
    }
  }, [tick, pause, isGameOver, mode]);

  return remaining;
};

export default useCountdown;
export { COUNTDOWN_SECONDS };
