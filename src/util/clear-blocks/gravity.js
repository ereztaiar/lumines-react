import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const { EMPTY } = BLOCKS_TYPES;

function getCubeAnchors(cube, array) {
  const map = new Map();
  if (!cube) return map;
  for (const key of ["topLeft", "topRight", "bottomLeft", "bottomRight"]) {
    const cell = cube[key];
    if (!cell || typeof cell.x !== "number" || typeof cell.y !== "number") continue;
    if (array && array[cell.x]?.[cell.y] === EMPTY) continue;
    if (!map.has(cell.x)) map.set(cell.x, new Set());
    map.get(cell.x).add(cell.y);
  }
  return map;
}

// Iterates bottom-up so relative block order is preserved while packing toward end.
function compactSegmentTowardBottom(column, newColumn, start, end) {
  let j = end;
  for (let i = end; i >= start; i--) {
    if (column[i] !== EMPTY) newColumn[j--] = column[i];
  }
}

// Anchor rows are pinned (landed cube cells that must not shift). Each segment
// between consecutive anchors compacts independently so the cube stays in place.
function compactColumnWithAnchors(column, newColumn, anchorSet) {
  const sortedAnchors = [...anchorSet].sort((a, b) => a - b);
  let segStart = 0;
  for (const ay of sortedAnchors) {
    compactSegmentTowardBottom(column, newColumn, segStart, ay - 1);
    newColumn[ay] = column[ay];
    segStart = ay + 1;
  }
  compactSegmentTowardBottom(column, newColumn, segStart, column.length - 1);
}

function applyGravity(array, affectedCols, anchors = new Map()) {
  for (const col of affectedCols) {
    const column = array[col];
    const anchorSet = anchors.get(col);
    const newColumn = new Array(column.length).fill(EMPTY);

    if (!anchorSet || anchorSet.size === 0) {
      compactSegmentTowardBottom(column, newColumn, 0, column.length - 1);
    } else {
      compactColumnWithAnchors(column, newColumn, anchorSet);
    }

    array[col] = newColumn;
  }
}

export { getCubeAnchors, applyGravity };
