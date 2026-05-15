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
} = BLOCKS_TYPES;

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

function findMarkedComponents(array) {
  const width = array.length;
  const height = array[0].length;
  const visited = new Set();
  const groups = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (!isMarkedForDeletion(array[x][y])) continue;
      const key = `${x},${y}`;
      if (visited.has(key)) continue;

      const component = [];
      let maxX = x;
      const queue = [[x, y]];
      while (queue.length > 0) {
        const [cx, cy] = queue.shift();
        const ck = `${cx},${cy}`;
        if (visited.has(ck)) continue;
        if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
        if (!isMarkedForDeletion(array[cx][cy])) continue;
        visited.add(ck);
        component.push([cx, cy]);
        if (cx > maxX) maxX = cx;
        queue.push([cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]);
      }

      groups.push({ component, maxX });
    }
  }

  return groups;
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

function clearExitedGroups(array, exitedCol, cube = null) {
  return new Promise((resolve) => {
    const groups = findMarkedComponents(array);
    let total = 0;
    const affectedCols = new Set();
    for (const { component, maxX } of groups) {
      if (maxX === exitedCol) {
        for (const [cx, cy] of component) {
          array[cx][cy] = EMPTY;
          affectedCols.add(cx);
          total++;
        }
      }
    }
    applyGravity(array, affectedCols, getCubeAnchors(cube, array));
    resolve(total);
  });
}

function revertUnclaimedMarks(array, swiperCol) {
  const width = array.length;
  return new Promise((resolve) => {
    for (let x = swiperCol; x < width; x++) {
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

export {
  prepareForDeletion,
  clearFromDeletion,
  clearColumn,
  countMarksInColumn,
  clearAllMarked,
  clearExitedGroups,
  revertUnclaimedMarks,
};
