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

function applyGravity(array, affectedCols, anchors = new Map()) {
  for (const col of affectedCols) {
    const column = array[col];
    const anchorSet = anchors.get(col);
    const newColumn = new Array(column.length).fill(EMPTY);

    if (!anchorSet || anchorSet.size === 0) {
      let j = column.length - 1;
      for (let i = column.length - 1; i >= 0; i--) {
        if (column[i] !== EMPTY) newColumn[j--] = column[i];
      }
      array[col] = newColumn;
      continue;
    }

    const sortedAnchors = [...anchorSet].sort((a, b) => a - b);
    let segStart = 0;
    for (const ay of sortedAnchors) {
      let j = ay - 1;
      for (let i = ay - 1; i >= segStart; i--) {
        if (column[i] !== EMPTY) newColumn[j--] = column[i];
      }
      newColumn[ay] = column[ay];
      segStart = ay + 1;
    }
    let j = column.length - 1;
    for (let i = column.length - 1; i >= segStart; i--) {
      if (column[i] !== EMPTY) newColumn[j--] = column[i];
    }
    array[col] = newColumn;
  }
}

export { getCubeAnchors, applyGravity };
