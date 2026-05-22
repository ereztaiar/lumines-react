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
  RECURSIVE_TYPE_A,
  RECURSIVE_TYPE_B,
  RECURSIVE_TYPE_A_SPECIAL,
  RECURSIVE_TYPE_B_SPECIAL,
} = BLOCKS_TYPES;

const TENTATIVE_TO_BASE = new Map([
  [DELETION_TYPE_A, TYPE_A],
  [DELETION_TYPE_B, TYPE_B],
  [DELETION_TYPE_A_SPECIAL, TYPE_A_SPECIAL],
  [DELETION_TYPE_B_SPECIAL, TYPE_B_SPECIAL],
  [RECURSIVE_TYPE_A, TYPE_A],
  [RECURSIVE_TYPE_B, TYPE_B],
  [RECURSIVE_TYPE_A_SPECIAL, TYPE_A_SPECIAL],
  [RECURSIVE_TYPE_B_SPECIAL, TYPE_B_SPECIAL],
]);

const revertCell = (column, y) => {
  const base = TENTATIVE_TO_BASE.get(column[y]);
  if (base !== undefined) column[y] = base;
};

function clearFromDeletion(array) {
  const width = array.length;
  const height = array[0].length;
  return new Promise((resolve) => {
    for (let x = 0; x < width; x++) {
      for (let y = height; y > 3; y--) {
        revertCell(array[x], y);
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
        revertCell(column, y);
      }
    }
    resolve();
  });
}

export { clearFromDeletion, revertUncommittedMarks };
