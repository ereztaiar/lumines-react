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
  SWEEP_TYPE_A,
  SWEEP_TYPE_B,
  SWEEP_TYPE_A_SPECIAL,
  SWEEP_TYPE_B_SPECIAL,
} = BLOCKS_TYPES;

const isMarkedForDeletion = (v) =>
  v === DELETION_TYPE_A ||
  v === DELETION_TYPE_B ||
  v === DELETION_TYPE_A_SPECIAL ||
  v === DELETION_TYPE_B_SPECIAL;

const isBeingSwept = (v) =>
  v === SWEEP_TYPE_A ||
  v === SWEEP_TYPE_B ||
  v === SWEEP_TYPE_A_SPECIAL ||
  v === SWEEP_TYPE_B_SPECIAL;

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
      deletionType,
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
        if (colorTypes.includes(v)) {
          if (v === normalType) array[x][y] = deletionType;
          else if (v === specialType) array[x][y] = specialDeletionType;
          stack.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
        }
      }
    };

    const checkSquares = (
      normalType,
      specialType,
      deletionType,
      specialDeletionType,
      sweepType,
      specialSweepType,
    ) => {
      const colorTypes = [
        normalType,
        specialType,
        deletionType,
        specialDeletionType,
        sweepType,
        specialSweepType,
      ];
      const match = (v) => colorTypes.includes(v);
      for (let x = 0; x < width - 1; x++) {
        for (let y = height; y > 3; y--) {
          if (
            typeof array[x][y + 1] !== "undefined" &&
            array[x][y + 1] === EMPTY &&
            typeof array[x + 1][y + 1] !== "undefined" &&
            array[x + 1][y + 1] === EMPTY
          )
            continue;

          if (
            match(array[x][y]) &&
            match(array[x + 1][y]) &&
            match(array[x][y - 1]) &&
            match(array[x + 1][y - 1])
          ) {
            const hasSpecial =
              array[x][y] === specialType ||
              array[x][y] === specialDeletionType ||
              array[x][y] === specialSweepType ||
              array[x + 1][y] === specialType ||
              array[x + 1][y] === specialDeletionType ||
              array[x + 1][y] === specialSweepType ||
              array[x][y - 1] === specialType ||
              array[x][y - 1] === specialDeletionType ||
              array[x][y - 1] === specialSweepType ||
              array[x + 1][y - 1] === specialType ||
              array[x + 1][y - 1] === specialDeletionType ||
              array[x + 1][y - 1] === specialSweepType;

            const markCell = (cx, cy) => {
              const v = array[cx][cy];
              if (v === normalType) array[cx][cy] = deletionType;
              else if (v === specialType) array[cx][cy] = specialDeletionType;
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
                deletionType,
                specialDeletionType,
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
      SWEEP_TYPE_A,
      SWEEP_TYPE_A_SPECIAL,
    );
    checkSquares(
      TYPE_B,
      TYPE_B_SPECIAL,
      DELETION_TYPE_B,
      DELETION_TYPE_B_SPECIAL,
      SWEEP_TYPE_B,
      SWEEP_TYPE_B_SPECIAL,
    );

    resolve([...array]);
  });
}

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

function commitColumnAsSweeping(array, col) {
  return new Promise((resolve) => {
    if (col < 0 || col >= array.length) {
      resolve(0);
      return;
    }
    const column = array[col];
    let count = 0;
    for (let y = 0; y < column.length; y++) {
      const v = column[y];
      if (v === DELETION_TYPE_A) {
        column[y] = SWEEP_TYPE_A;
        count++;
      } else if (v === DELETION_TYPE_B) {
        column[y] = SWEEP_TYPE_B;
        count++;
      } else if (v === DELETION_TYPE_A_SPECIAL) {
        column[y] = SWEEP_TYPE_A_SPECIAL;
        count++;
      } else if (v === DELETION_TYPE_B_SPECIAL) {
        column[y] = SWEEP_TYPE_B_SPECIAL;
        count++;
      }
    }
    resolve(count);
  });
}

function clearSweptColumn(array, col, cube = null) {
  return new Promise((resolve) => {
    if (col < 0 || col >= array.length) {
      resolve(0);
      return;
    }
    const column = array[col];
    let count = 0;
    for (let y = 0; y < column.length; y++) {
      if (isBeingSwept(column[y])) {
        column[y] = EMPTY;
        count++;
      }
    }
    if (count > 0) {
      applyGravity(array, new Set([col]), getCubeAnchors(cube, array));
    }
    resolve(count);
  });
}

export {
  prepareForDeletion,
  clearFromDeletion,
  clearColumn,
  countMarksInColumn,
  clearAllMarked,
  revertUncommittedMarks,
  commitColumnAsSweeping,
  clearSweptColumn,
};
