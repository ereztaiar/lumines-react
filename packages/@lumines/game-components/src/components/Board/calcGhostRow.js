import { BLOCKS_TYPES } from "./block-types";

const { EMPTY } = BLOCKS_TYPES;

// Bottom row the falling cube would land on if dropped now, matching
// moveDown's rule: any non-EMPTY cell is solid. Returns the cube's own
// bottom row when it is already resting.
const calcGhostRow = (grid, cube) => {
  const leftX = cube.topLeft.x;
  const rightX = cube.topRight.x;
  const startY = cube.bottomLeft.y + 1;
  const totalRows = grid[leftX].length;
  for (let y = startY; y < totalRows; y++) {
    if (grid[leftX][y] !== EMPTY || grid[rightX][y] !== EMPTY) {
      return y - 1;
    }
  }
  return totalRows - 1;
};

export { calcGhostRow };
