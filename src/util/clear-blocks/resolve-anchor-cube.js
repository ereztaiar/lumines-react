import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser/cube-states";

// Decides which cube (if any) must be pinned against sweep-clears and gravity.
// DROP: mid-flight cube — moveDown owns its fall, gravity must not touch it.
// WAITING: drawn at the ready rows but not dropping yet — unpinned, its grid
// cells would fall away from the currentCube descriptor.
// NEW/READY: the descriptor points at a landed cube whose cells are ordinary
// stack blocks now — they must fall with gravity like everything else.
// Callers must read state and cube from refs, not render closures: landing can
// flush the whole spawn chain (NEW → READY → draw → WAITING) mid-tick, and a
// stale closure here is what let gravity rip a freshly spawned cube in half.
function resolveAnchorCube(state, currentCube) {
  return state === CUBE_STATES.DROP || state === CUBE_STATES.WAITING
    ? currentCube
    : null;
}

export { resolveAnchorCube };
