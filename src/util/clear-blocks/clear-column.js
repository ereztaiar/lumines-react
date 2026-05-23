import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";
import { isMarkedForDeletion, isBeingRecursive } from "./predicates.js";

const { EMPTY } = BLOCKS_TYPES;

// Walks the contiguous non-EMPTY stack from the bottom up. Deletion and recursive
// marks are dropped; solid blocks are compacted toward the bottom into newColumn.
// Top two rows are off-limits for clearing even if filled.
// Returns the scan boundary (first EMPTY row) and the count of removed marks.
function scanAndCompactBottom(column, newColumn) {
  let i = column.length - 1;
  let j = column.length - 1;
  let count = 0;
  for (; column[i] !== EMPTY; i--) {
    if (i <= 1) break;
    if (isMarkedForDeletion(column[i]) || isBeingRecursive(column[i])) {
      count++;
      continue;
    }
    newColumn[j--] = column[i];
  }
  return { boundary: i, count };
}

// Only the bottommost contiguous block stack is eligible for clearing; cells
// above the first EMPTY gap belong to a higher segment not yet reached by the swiper.
function copyTopVerbatim(column, newColumn, boundary) {
  for (let i = boundary; i >= 0; i--) {
    newColumn[i] = column[i];
  }
}

function clearColumn(array, x) {
  const column = array[x];
  return new Promise((resolve) => {
    const newColumn = new Array(column.length).fill(EMPTY);
    const { boundary, count } = scanAndCompactBottom(column, newColumn);
    copyTopVerbatim(column, newColumn, boundary);
    array[x] = newColumn;
    resolve(count);
  });
}

function countMarksInColumn(array, x) {
  const column = array[x];
  return new Promise((resolve) => {
    let count = 0;
    for (let i = 0; i < column.length; i++) {
      if (isMarkedForDeletion(column[i]) || isBeingRecursive(column[i])) count++;
    }
    resolve(count);
  });
}

export { clearColumn, countMarksInColumn };
