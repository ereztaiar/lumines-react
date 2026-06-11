import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const {
  EMPTY,
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
  SWEEPING_TYPE_A,
  SWEEPING_TYPE_B,
  SWEEPING_TYPE_A_SPECIAL,
  SWEEPING_TYPE_B_SPECIAL,
} = BLOCKS_TYPES;

// colorTypes includes deletion and recursive variants so the fill traverses
// already-marked cells — reaching further same-color blocks without re-promoting
// cells that are already in the correct state.
function floodFill(
  array,
  startX,
  startY,
  colorTypes,
  normalType,
  specialType,
  recursiveType,
  specialRecursiveType,
) {
  const width = array.length;
  const height = array[0].length;
  const stack = [[startX, startY]];
  const visited = new Set();
  while (stack.length > 0) {
    const [x, y] = stack.pop();
    const key = `${x},${y}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    const v = array[x][y];
    if (colorTypes.includes(v)) {
      if (v === normalType) array[x][y] = recursiveType;
      else if (v === specialType) array[x][y] = specialRecursiveType;
      stack.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
    }
  }
}

// y > 3 is a game rule: 2×2 matches only score in the lower portion of the board.
// Squares where both columns below are empty are skipped — they haven't settled yet.
function checkSquares(
  array,
  normalType,
  specialType,
  deletionType,
  specialDeletionType,
  recursiveType,
  specialRecursiveType,
  sweepingType,
  specialSweepingType,
) {
  // Sweeping specials count too: once both columns of a special 2×2 are
  // committed, the flood-filled neighbors beyond it must keep re-marking each
  // tick until the swiper reaches them, or the group's tail would never commit.
  const isSpecialCell = (v) =>
    v === specialType ||
    v === specialDeletionType ||
    v === specialRecursiveType ||
    v === specialSweepingType;
  const width = array.length;
  const height = array[0].length;
  // Sweeping types are already committed by the swiper but still represent
  // the same color — including them lets a partially-swept group re-mark its
  // remaining columns on the next tick after revertUncommittedMarks runs.
  const colorTypes = [
    normalType,
    specialType,
    deletionType,
    specialDeletionType,
    recursiveType,
    specialRecursiveType,
    sweepingType,
    specialSweepingType,
  ];
  const match = (v) => colorTypes.includes(v);
  for (let x = 0; x < width - 1; x++) {
    for (let y = height; y > 3; y--) {
      if (array[x][y + 1] === EMPTY && array[x + 1][y + 1] === EMPTY) continue;

      if (
        match(array[x][y]) &&
        match(array[x + 1][y]) &&
        match(array[x][y - 1]) &&
        match(array[x + 1][y - 1])
      ) {
        const hasSpecial = [
          array[x][y],
          array[x + 1][y],
          array[x][y - 1],
          array[x + 1][y - 1],
        ].some(isSpecialCell);

        const markCell = (cx, cy) => {
          const v = array[cx][cy];
          if (v === normalType || v === recursiveType)
            array[cx][cy] = deletionType;
          else if (v === specialType || v === specialRecursiveType)
            array[cx][cy] = specialDeletionType;
        };
        markCell(x, y);
        markCell(x + 1, y);
        markCell(x, y - 1);
        markCell(x + 1, y - 1);

        if (hasSpecial) {
          floodFill(
            array,
            x,
            y,
            colorTypes,
            normalType,
            specialType,
            recursiveType,
            specialRecursiveType,
          );
        }
      }
    }
  }
}

function prepareForDeletion(array) {
  return new Promise((resolve) => {
    checkSquares(
      array,
      TYPE_A,
      TYPE_A_SPECIAL,
      DELETION_TYPE_A,
      DELETION_TYPE_A_SPECIAL,
      RECURSIVE_TYPE_A,
      RECURSIVE_TYPE_A_SPECIAL,
      SWEEPING_TYPE_A,
      SWEEPING_TYPE_A_SPECIAL,
    );
    checkSquares(
      array,
      TYPE_B,
      TYPE_B_SPECIAL,
      DELETION_TYPE_B,
      DELETION_TYPE_B_SPECIAL,
      RECURSIVE_TYPE_B,
      RECURSIVE_TYPE_B_SPECIAL,
      SWEEPING_TYPE_B,
      SWEEPING_TYPE_B_SPECIAL,
    );
    resolve([...array]);
  });
}

export { prepareForDeletion };
