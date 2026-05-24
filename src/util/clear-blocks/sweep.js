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
// startRow skips cells above the sweep region so a separate upper sweep group
// is not erased by this pass.
function eraseSweptCells(column, cubeRows, startRow = 0) {
  let count = 0;
  for (let y = startRow; y < column.length; y++) {
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

// Returns the other column the cube occupies, or null if the cube is not in col.
function getCubePartnerCol(cube, col) {
  if (!cube) return null;
  const leftCol  = cube.topLeft?.x;
  const rightCol = cube.topRight?.x;
  if (leftCol  === col) return rightCol  ?? null;
  if (rightCol === col) return leftCol   ?? null;
  return null;
}

// Find the row at which the bottom sweep region starts. Scan upward from the
// last non-empty row; the first empty cell encountered is the gap that separates
// the sweep region from any upper-group sweep cells above it.
function findSweepStartRow(column) {
  let lastNonEmpty = -1;
  for (let y = 0; y < column.length; y++) {
    if (column[y] !== EMPTY) lastNonEmpty = y;
  }
  if (lastNonEmpty < 0) return 0;
  for (let y = lastNonEmpty; y >= 0; y--) {
    if (column[y] === EMPTY) return y + 1;
  }
  return 0;
}

function clearSweptColumn(array, col, cube = null) {
  return new Promise((resolve) => {
    if (col < 0 || col >= array.length) {
      resolve(0);
      return;
    }
    const column = array[col];
    const startRow = findSweepStartRow(column);

    const cubeRows = collectCubeRowsInCol(cube, col);
    let count = eraseSweptCells(column, cubeRows, startRow);
    if (count > 0) {
      const anchors = getCubeAnchors(cube, array);
      addBelowCubeAnchor(anchors, cube, col, column.length);
      // Sweep cells sitting above the gap (rows 0..startRow-1) belong to a
      // different group — pin them so gravity does not collapse them into the
      // space freed by this pass.
      for (let y = 0; y < startRow; y++) {
        if (isBeingSwept(column[y])) {
          if (!anchors.has(col)) anchors.set(col, new Set());
          anchors.get(col).add(y);
        }
      }

      const affectedCols = new Set([col]);

      // When the cube straddles this column and its partner, clearing only one
      // column creates an asymmetric landing surface for the next moveDown tick:
      // blocks above the swept zone fall here but stay put in the partner column
      // (whose sweep cells are still present). Erase and compact the partner now
      // so both columns settle to the same height in the same pass.
      const partnerCol = getCubePartnerCol(cube, col);
      if (partnerCol !== null && partnerCol >= 0 && partnerCol < array.length) {
        const partnerColumn   = array[partnerCol];
        const partnerStart    = findSweepStartRow(partnerColumn);
        const partnerCubeRows = collectCubeRowsInCol(cube, partnerCol);
        const partnerCount    = eraseSweptCells(partnerColumn, partnerCubeRows, partnerStart);
        if (partnerCount > 0) {
          addBelowCubeAnchor(anchors, cube, partnerCol, partnerColumn.length);
          for (let y = 0; y < partnerStart; y++) {
            if (isBeingSwept(partnerColumn[y])) {
              if (!anchors.has(partnerCol)) anchors.set(partnerCol, new Set());
              anchors.get(partnerCol).add(y);
            }
          }
          count += partnerCount;
          affectedCols.add(partnerCol);
        }
      }

      applyGravity(array, affectedCols, anchors);
    }
    resolve(count);
  });
}

export { commitColumnAsSweeping, clearSweptColumn };
