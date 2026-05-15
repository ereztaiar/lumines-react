import {
  COLUMNS,
  READY_GRID,
  ROWS,
} from "@lumines/game-components/src/components/Board";
import { BLOCKS_TYPES } from "./block-types";

function* createEmptyGrid() {
  while (true) {
    const gridColumns = [];
    for (let x = 0; x < COLUMNS; x++) {
      const gridRows = [];
      for (let y = 0; y < ROWS + READY_GRID; y++) {
        gridRows.push(BLOCKS_TYPES.EMPTY);
      }
      gridColumns.push(gridRows);
    }

    yield gridColumns;
  }
}

export { createEmptyGrid, BLOCKS_TYPES };
