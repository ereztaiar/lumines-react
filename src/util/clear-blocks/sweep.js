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

// After clearing, gravity would pull blocks down into the cube's current position.
// Pinning an anchor one row below the cube's lowest cell in this column stops
// blocks from falling into the gap the cube still occupies.
function addBelowCubeAnchor(anchors, cube, col, colLength) {
  if (!cube) return;
  const colCells = ["topLeft", "topRight", "bottomLeft", "bottomRight"]
    .filter((k) => cube[k] && cube[k].x === col)
    .map((k) => cube[k].y);
  if (colCells.length === 0) return;
  const belowRow = Math.max(...colCells) + 1;
  if (belowRow < colLength) {
    if (!anchors.has(col)) anchors.set(col, new Set());
    anchors.get(col).add(belowRow);
  }
}

function clearSweptColumn(array, col, cube = null) {
  return new Promise((resolve) => {
    if (col < 0 || col >= array.length) {
      resolve(0);
      return;
    }
    const cubeRows = collectCubeRowsInCol(cube, col);
    const count = eraseSweptCells(array[col], cubeRows);
    if (count > 0) {
      const anchors = getCubeAnchors(cube, array);
      addBelowCubeAnchor(anchors, cube, col, array[col].length);
      applyGravity(array, new Set([col]), anchors);
    }
    resolve(count);
  });
}

export { commitColumnAsSweeping, clearSweptColumn };
