// Mirror of BLOCKS_TYPES from @lumines/game-components/src/components/Board/logic.
// Inlined here so this file is consumable by Jest without dragging in JSX
// dependencies (Board/index.jsx) that the root babel config can't parse.
const EMPTY = 0;
const TYPE_A = 1;
const TYPE_B = 2;
const TYPE_A_SPECIAL = 3;
const TYPE_B_SPECIAL = 4;
const DELETION_TYPE_A = 5;
const DELETION_TYPE_B = 6;
const DELETION_TYPE_A_SPECIAL = 7;
const DELETION_TYPE_B_SPECIAL = 8;

const isMarkedForDeletion = (v) =>
  v === DELETION_TYPE_A ||
  v === DELETION_TYPE_B ||
  v === DELETION_TYPE_A_SPECIAL ||
  v === DELETION_TYPE_B_SPECIAL;

function prepareForDeletion(array) {
  const width = array.length;
  const height = array[0].length;
  return new Promise((resolve) => {
    const floodFill = (
      startX,
      startY,
      colorTypes,
      deletionType,
      specialType,
      specialDeletionType,
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
        if (
          colorTypes.includes(v) ||
          v === deletionType ||
          v === specialDeletionType
        ) {
          array[x][y] =
            v === specialType || v === specialDeletionType
              ? specialDeletionType
              : deletionType;
          stack.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
        }
      }
    };

    const checkSquares = (
      normalType,
      specialType,
      deletionType,
      specialDeletionType,
    ) => {
      for (let x = 0; x < width - 1; x++) {
        for (let y = height; y > 3; y--) {
          if (
            typeof array[x][y + 1] !== "undefined" &&
            array[x][y + 1] === EMPTY &&
            typeof array[x + 1][y + 1] !== "undefined" &&
            array[x + 1][y + 1] === EMPTY
          )
            continue;

          const match = (v) =>
            v === normalType ||
            v === specialType ||
            v === deletionType ||
            v === specialDeletionType;

          if (
            match(array[x][y]) &&
            match(array[x + 1][y]) &&
            match(array[x][y - 1]) &&
            match(array[x + 1][y - 1])
          ) {
            const hasSpecial =
              array[x][y] === specialType ||
              array[x][y] === specialDeletionType ||
              array[x + 1][y] === specialType ||
              array[x + 1][y] === specialDeletionType ||
              array[x][y - 1] === specialType ||
              array[x][y - 1] === specialDeletionType ||
              array[x + 1][y - 1] === specialType ||
              array[x + 1][y - 1] === specialDeletionType;

            const markCell = (cx, cy) => {
              const v = array[cx][cy];
              array[cx][cy] =
                v === specialType || v === specialDeletionType
                  ? specialDeletionType
                  : deletionType;
            };
            markCell(x, y);
            markCell(x + 1, y);
            markCell(x, y - 1);
            markCell(x + 1, y - 1);

            if (hasSpecial) {
              floodFill(
                x,
                y,
                [normalType, specialType],
                deletionType,
                specialType,
                specialDeletionType,
              );
            }
          }
        }
      }
    };

    checkSquares(TYPE_A, TYPE_A_SPECIAL, DELETION_TYPE_A, DELETION_TYPE_A_SPECIAL);
    checkSquares(TYPE_B, TYPE_B_SPECIAL, DELETION_TYPE_B, DELETION_TYPE_B_SPECIAL);

    resolve([...array]);
  });
}

function clearFromDeletion(array) {
  const width = array.length;
  const height = array[0].length;
  return new Promise((resolve, reject) => {
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

function clearColumn(array, x) {
  const column = array[x];
  return new Promise((resolve, reject) => {
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
    array[x] = [...newColumn];
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

function clearAllMarked(array) {
  const width = array.length;
  return new Promise((resolve) => {
    let total = 0;
    for (let x = 0; x < width; x++) {
      const column = array[x];
      const newColumn = new Array(column.length).fill(EMPTY);
      let j = column.length - 1;
      for (let i = column.length - 1; i >= 0; i--) {
        const v = column[i];
        if (v === EMPTY) continue;
        if (isMarkedForDeletion(v)) {
          total++;
          continue;
        }
        newColumn[j--] = v;
      }
      array[x] = newColumn;
    }
    resolve(total);
  });
}

export {
  prepareForDeletion,
  clearFromDeletion,
  clearColumn,
  countMarksInColumn,
  clearAllMarked,
};
