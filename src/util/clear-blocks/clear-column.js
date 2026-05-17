import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";
import { isMarkedForDeletion } from "./predicates.js";

const { EMPTY } = BLOCKS_TYPES;

function clearColumn(array, x) {
  const column = array[x];
  return new Promise((resolve) => {
    let i = column.length - 1;
    let j = column.length - 1;
    let count = 0;
    const newColumn = new Array(column.length).fill(EMPTY);
    for (; column[i] !== EMPTY; i--) {
      if (i <= 1) break;
      if (isMarkedForDeletion(column[i])) {
        count++;
        continue;
      }
      newColumn[j--] = column[i];
    }
    for (; i >= 0; i--) {
      newColumn[i] = column[i];
    }
    array[x] = newColumn;
    resolve(count);
  });
}

function countMarksInColumn(array, x) {
  const column = array[x];
  return new Promise((resolve) => {
    let count = 0;
    for (let i = 0; i < column.length; i++) {
      if (isMarkedForDeletion(column[i])) count++;
    }
    resolve(count);
  });
}

export { clearColumn, countMarksInColumn };
