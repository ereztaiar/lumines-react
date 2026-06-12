import { calcGhostRow } from "./calcGhostRow";
import { BLOCKS_TYPES } from "./block-types";

const { EMPTY, TYPE_A, TYPE_B, SWEEPING_TYPE_A } = BLOCKS_TYPES;

const COLUMNS = 16;
const TOTAL_ROWS = 12;

const makeEmptyGrid = () =>
  Array.from({ length: COLUMNS }, () => Array(TOTAL_ROWS).fill(EMPTY));

const makeCube = (leftX, topY) => ({
  topLeft: { x: leftX, y: topY },
  topRight: { x: leftX + 1, y: topY },
  bottomLeft: { x: leftX, y: topY + 1 },
  bottomRight: { x: leftX + 1, y: topY + 1 },
});

describe("calcGhostRow", () => {
  it("projects to the bottom row on an empty board", () => {
    const grid = makeEmptyGrid();
    const cube = makeCube(7, 0);

    expect(calcGhostRow(grid, cube)).toBe(TOTAL_ROWS - 1);
  });

  it("lands on top of an existing stack", () => {
    const grid = makeEmptyGrid();
    grid[7][10] = TYPE_A;
    grid[7][11] = TYPE_A;
    grid[8][11] = TYPE_B;
    const cube = makeCube(7, 0);

    expect(calcGhostRow(grid, cube)).toBe(9);
  });

  it("uses the taller of the two columns under the cube", () => {
    const grid = makeEmptyGrid();
    grid[7][11] = TYPE_A;
    grid[8][8] = TYPE_B;
    grid[8][9] = TYPE_B;
    grid[8][10] = TYPE_B;
    grid[8][11] = TYPE_B;
    const cube = makeCube(7, 0);

    expect(calcGhostRow(grid, cube)).toBe(7);
  });

  it("returns the cube's own bottom row when already resting", () => {
    const grid = makeEmptyGrid();
    grid[7][6] = TYPE_A;
    grid[7][7] = TYPE_A;
    grid[7][8] = TYPE_A;
    grid[7][9] = TYPE_A;
    grid[7][10] = TYPE_A;
    grid[7][11] = TYPE_A;
    const cube = makeCube(7, 4);

    expect(calcGhostRow(grid, cube)).toBe(cube.bottomLeft.y);
  });

  it("treats SWEEPING cells as solid, matching moveDown", () => {
    const grid = makeEmptyGrid();
    grid[7][11] = SWEEPING_TYPE_A;
    grid[8][11] = SWEEPING_TYPE_A;
    const cube = makeCube(7, 0);

    expect(calcGhostRow(grid, cube)).toBe(10);
  });
});
