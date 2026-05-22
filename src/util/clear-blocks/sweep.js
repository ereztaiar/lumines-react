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

function commitColumnAsSweeping(array, col) {
  return new Promise((resolve) => {
    if (col < 0 || col >= array.length) {
      resolve(0);
      return;
    }
    const column = array[col];
    let count = 0;
    for (let y = 0; y < column.length; y++) {
      const v = column[y];
      if (v === DELETION_TYPE_A || v === RECURSIVE_TYPE_A) {
        column[y] = SWEEPING_TYPE_A;
        count++;
      } else if (v === DELETION_TYPE_B || v === RECURSIVE_TYPE_B) {
        column[y] = SWEEPING_TYPE_B;
        count++;
      } else if (v === DELETION_TYPE_A_SPECIAL || v === RECURSIVE_TYPE_A_SPECIAL) {
        column[y] = SWEEPING_TYPE_A_SPECIAL;
        count++;
      } else if (v === DELETION_TYPE_B_SPECIAL || v === RECURSIVE_TYPE_B_SPECIAL) {
        column[y] = SWEEPING_TYPE_B_SPECIAL;
        count++;
      }
    }
    resolve(count);
  });
}

function clearSweptColumn(array, col, cube = null) {
  return new Promise((resolve) => {
    if (col < 0 || col >= array.length) {
      resolve(0);
      return;
    }
    const column = array[col];
    let count = 0;

    const cubeRows = new Set();
    if (cube) {
      for (const key of ["topLeft", "topRight", "bottomLeft", "bottomRight"]) {
        const cell = cube[key];
        if (cell && cell.x === col) cubeRows.add(cell.y);
      }
    }

    for (let y = 0; y < column.length; y++) {
      if (!isBeingSwept(column[y])) continue;
      if (cubeRows.has(y)) {
        // Restore the cube's cell to its base type — the falling cube is
        // immune to being swept mid-flight; only landed blocks get cleared.
        column[y] = sweepingToNormal(column[y]);
      } else {
        column[y] = EMPTY;
        count++;
      }
    }
    if (count > 0) {
      const anchors = getCubeAnchors(cube, array);
      if (cube) {
        const colCells = ["topLeft", "topRight", "bottomLeft", "bottomRight"]
          .filter((k) => cube[k] && cube[k].x === col)
          .map((k) => cube[k].y);
        if (colCells.length > 0) {
          const belowRow = Math.max(...colCells) + 1;
          if (belowRow < array[col].length) {
            if (!anchors.has(col)) anchors.set(col, new Set());
            anchors.get(col).add(belowRow);
          }
        }
      }
      applyGravity(array, new Set([col]), anchors);
    }
    resolve(count);
  });
}

export { commitColumnAsSweeping, clearSweptColumn };
