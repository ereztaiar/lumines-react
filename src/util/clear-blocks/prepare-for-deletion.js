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
} = BLOCKS_TYPES;

function prepareForDeletion(array) {
  const width = array.length;
  const height = array[0].length;
  return new Promise((resolve) => {
    const floodFill = (
      startX,
      startY,
      colorTypes,
      normalType,
      specialType,
      recursiveType,
      specialRecursiveType,
    ) => {
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
    };

    const checkSquares = (
      normalType,
      specialType,
      deletionType,
      specialDeletionType,
      recursiveType,
      specialRecursiveType,
    ) => {
      const colorTypes = [
        normalType,
        specialType,
        deletionType,
        specialDeletionType,
        recursiveType,
        specialRecursiveType,
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
            const isSpecialCell = (v) =>
              v === specialType || v === specialDeletionType || v === specialRecursiveType;
            const hasSpecial = [
              array[x][y],
              array[x + 1][y],
              array[x][y - 1],
              array[x + 1][y - 1],
            ].some(isSpecialCell);

            const markCell = (cx, cy) => {
              const v = array[cx][cy];
              if (v === normalType || v === recursiveType) array[cx][cy] = deletionType;
              else if (v === specialType || v === specialRecursiveType)
                array[cx][cy] = specialDeletionType;
            };
            markCell(x, y);
            markCell(x + 1, y);
            markCell(x, y - 1);
            markCell(x + 1, y - 1);

            if (hasSpecial) {
              floodFill(
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
    };

    checkSquares(
      TYPE_A,
      TYPE_A_SPECIAL,
      DELETION_TYPE_A,
      DELETION_TYPE_A_SPECIAL,
      RECURSIVE_TYPE_A,
      RECURSIVE_TYPE_A_SPECIAL,
    );
    checkSquares(
      TYPE_B,
      TYPE_B_SPECIAL,
      DELETION_TYPE_B,
      DELETION_TYPE_B_SPECIAL,
      RECURSIVE_TYPE_B,
      RECURSIVE_TYPE_B_SPECIAL,
    );

    resolve([...array]);
  });
}

export { prepareForDeletion };
