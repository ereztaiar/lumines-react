import { COLUMNS, READY_GRID, ROWS } from "@lumines/game-components/src/components/Board";

const BLOCKS_TYPES = {
    EMPTY: 0,
    TYPE_A: 1,
    TYPE_B: 2,
    TYPE_A_SPECIAL: 3,
    TYPE_B_SPECIAL: 4,
    DELETION_TYPE_A: 5,
    DELETION_TYPE_B: 6,
};

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

export {
    createEmptyGrid,
    BLOCKS_TYPES
}