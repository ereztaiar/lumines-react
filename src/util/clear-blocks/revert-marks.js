import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const {
  TYPE_A,
  TYPE_B,
  TYPE_A_SPECIAL,
  TYPE_B_SPECIAL,
  DELETION_TYPE_A,
  DELETION_TYPE_B,
  DELETION_TYPE_A_SPECIAL,
  DELETION_TYPE_B_SPECIAL,
} = BLOCKS_TYPES;

function clearFromDeletion(array) {
  const width = array.length;
  const height = array[0].length;
  return new Promise((resolve) => {
    for (let x = 0; x < width; x++) {
      for (let y = height; y > 3; y--) {
        if (array[x][y] === DELETION_TYPE_A) array[x][y] = TYPE_A;
        if (array[x][y] === DELETION_TYPE_B) array[x][y] = TYPE_B;
        if (array[x][y] === DELETION_TYPE_A_SPECIAL) array[x][y] = TYPE_A_SPECIAL;
        if (array[x][y] === DELETION_TYPE_B_SPECIAL) array[x][y] = TYPE_B_SPECIAL;
      }
    }

    resolve([...array]);
  });
}

function revertUncommittedMarks(array) {
  const width = array.length;
  return new Promise((resolve) => {
    for (let x = 0; x < width; x++) {
      const column = array[x];
      for (let y = 0; y < column.length; y++) {
        const v = column[y];
        if (v === DELETION_TYPE_A) column[y] = TYPE_A;
        else if (v === DELETION_TYPE_B) column[y] = TYPE_B;
        else if (v === DELETION_TYPE_A_SPECIAL) column[y] = TYPE_A_SPECIAL;
        else if (v === DELETION_TYPE_B_SPECIAL) column[y] = TYPE_B_SPECIAL;
      }
    }
    resolve();
  });
}

export { clearFromDeletion, revertUncommittedMarks };
