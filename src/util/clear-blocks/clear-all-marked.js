import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";
import { isMarkedForDeletion } from "./predicates.js";

const { EMPTY } = BLOCKS_TYPES;

function clearFromColumn(array, startCol) {
  return new Promise((resolve) => {
    let total = 0;
    for (let x = startCol; x < array.length; x++) {
      const column = array[x];
      const newColumn = new Array(column.length).fill(EMPTY);
      let j = column.length - 1;
      for (let i = column.length - 1; i >= 0; i--) {
        const v = column[i];
        if (v === EMPTY) continue;
        if (isMarkedForDeletion(v)) { total++; continue; }
        newColumn[j--] = v;
      }
      array[x] = newColumn;
    }
    resolve(total);
  });
}

function clearAllMarked(array) {
  return clearFromColumn(array, 0);
}

export { clearAllMarked, clearFromColumn };
