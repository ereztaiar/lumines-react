import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";
import { isBeingSwept, sweepingToNormal } from "./predicates.js";
import { getCubeAnchors, applyGravity } from "./gravity.js";

const {
  EMPTY,
  DELETION_TYPE_A,
  DELETION_TYPE_B,
  DELETION_TYPE_A_SPECIAL,
  DELETION_TYPE_B_SPECIAL,
  RECURSIVE_TYPE_A,
  RECURSIVE_TYPE_B,
  RECURSIVE_TYPE_A_SPECIAL,
  RECURSIVE_TYPE_B_SPECIAL,
  SWEEPING_TYPE_A,
  SWEEPING_TYPE_B,
  SWEEPING_TYPE_A_SPECIAL,
  SWEEPING_TYPE_B_SPECIAL,
} = BLOCKS_TYPES;

// Both DELETION (matched corner) and RECURSIVE (flood-filled neighbor) collapse to
// the same SWEEPING variant — the swiper treats them identically once committed.
// Returns null for cells that are not pending deletion.
function promoteToSweeping(v) {
  if (v === DELETION_TYPE_A || v === RECURSIVE_TYPE_A) return SWEEPING_TYPE_A;
  if (v === DELETION_TYPE_B || v === RECURSIVE_TYPE_B) return SWEEPING_TYPE_B;
  if (v === DELETION_TYPE_A_SPECIAL || v === RECURSIVE_TYPE_A_SPECIAL) return SWEEPING_TYPE_A_SPECIAL;
  if (v === DELETION_TYPE_B_SPECIAL || v === RECURSIVE_TYPE_B_SPECIAL) return SWEEPING_TYPE_B_SPECIAL;
  return null;
}

function commitColumnAsSweeping(array, col) {
  return new Promise((resolve) => {
    if (col < 0 || col >= array.length) {
      resolve(0);
      return;
    }
    const column = array[col];
    let count = 0;
    for (let y = 0; y < column.length; y++) {
      const swept = promoteToSweeping(column[y]);
      if (swept !== null) {
        column[y] = swept;
        count++;
      }
    }
    resolve(count);
  });
}

function collectCubeRowsInCol(cube, col) {
  const rows = new Set();
  if (!cube) return rows;
  for (const key of ["topLeft", "topRight", "bottomLeft", "bottomRight"]) {
    const cell = cube[key];
    if (cell && cell.x === col) rows.add(cell.y);
  }
  return rows;
}

// Cube cells that overlap this column are restored to their base type rather than
// cleared — the falling cube is immune to being swept mid-flight.
function eraseSweptCells(column, cubeRows) {
  let count = 0;
  for (let y = 0; y < column.length; y++) {
    if (!isBeingSwept(column[y])) continue;
    if (cubeRows.has(y)) {
      column[y] = sweepingToNormal(column[y]);
    } else {
      column[y] = EMPTY;
      count++;
    }
  }
  return count;
}

// Erases every committed SWEEPING cell in the grid in a single pass, then applies
// gravity once across all affected columns. Called only when the swiper has fully
// passed the marked group (or wrapped), so the whole group vanishes atomically —
// clearing column-by-column would stagger gravity and present a falling cube with
// an artificially uneven floor, splitting it.
function clearAllSweptCells(array, cube = null) {
  return new Promise((resolve) => {
    let count = 0;
    const affectedCols = new Set();
    const anchors = getCubeAnchors(cube, array);

    for (let col = 0; col < array.length; col++) {
      const column = array[col];
      const cubeRows = collectCubeRowsInCol(cube, col);
      const cleared = eraseSweptCells(column, cubeRows);
      if (cleared > 0) {
        affectedCols.add(col);
        count += cleared;
      }
    }

    if (count > 0) {
      applyGravity(array, affectedCols, anchors);
    }
    resolve(count);
  });
}

// Whether the board holds any blocks at all, ignoring cells the live falling
// cube currently occupies (it's written into the grid while mid-air, but isn't
// part of the settled stack an all-clear bonus is meant to reward).
function isGridEmpty(array, cube = null) {
  for (let col = 0; col < array.length; col++) {
    const column = array[col];
    const cubeRows = collectCubeRowsInCol(cube, col);
    for (let y = 0; y < column.length; y++) {
      if (cubeRows.has(y)) continue;
      if (column[y] !== EMPTY) return false;
    }
  }
  return true;
}

export { commitColumnAsSweeping, clearAllSweptCells, isGridEmpty };
