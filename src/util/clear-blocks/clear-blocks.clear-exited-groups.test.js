import "babel-polyfill";
import {
    clearExitedGroups,
} from './index.js';


describe('clearExitedGroups', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill(0));

    it('clears a 2x2 component when swiper exits its rightmost column', async () => {
        const array = makeGrid(8, 10);
        array[2][8] = 5; array[2][9] = 5;
        array[3][8] = 5; array[3][9] = 5;

        const cleared = await clearExitedGroups(array, 3);
        expect(cleared).toBe(4);
        expect(array[2][8]).toBe(0); expect(array[2][9]).toBe(0);
        expect(array[3][8]).toBe(0); expect(array[3][9]).toBe(0);
    });

    it('does not clear a component whose maxX does not match exitedCol', async () => {
        const array = makeGrid(8, 10);
        array[2][8] = 5; array[2][9] = 5;
        array[3][8] = 5; array[3][9] = 5; // maxX = 3

        const cleared = await clearExitedGroups(array, 2); // swiper exiting col 2
        expect(cleared).toBe(0);
        expect(array[3][8]).toBe(5); // group still intact
    });

    it('does not clear a late-arrival group behind the swiper', async () => {
        // group with maxX=1; swiper has moved to col 5, just exited col 4
        const array = makeGrid(8, 10);
        array[0][8] = 5; array[0][9] = 5;
        array[1][8] = 5; array[1][9] = 5;

        const cleared = await clearExitedGroups(array, 4);
        expect(cleared).toBe(0);
        expect(array[0][8]).toBe(5);
    });

    it('clears a multi-column component spanning across swiper when right edge exits', async () => {
        const array = makeGrid(8, 10);
        for (let x = 3; x <= 6; x++) {
            array[x][8] = 5;
            array[x][9] = 5;
        }
        let cleared = await clearExitedGroups(array, 5);
        expect(cleared).toBe(0);
        expect(array[3][8]).toBe(5);

        cleared = await clearExitedGroups(array, 6);
        expect(cleared).toBe(8);
        for (let x = 3; x <= 6; x++) {
            expect(array[x][8]).toBe(0);
            expect(array[x][9]).toBe(0);
        }
    });

    it('applies gravity to affected columns after clearing', async () => {
        const array = makeGrid(4, 6);
        array[1][4] = 5; array[2][4] = 5;
        array[1][5] = 5; array[2][5] = 5;

        const cleared = await clearExitedGroups(array, 2);
        expect(cleared).toBe(4);
        expect(array[1][5]).toBe(0);
        expect(array[2][5]).toBe(0);
    });

    it('clears only the matching component when multiple exist', async () => {
        const array = makeGrid(8, 10);
        // Component A: cols 1-2, maxX=2
        array[1][8] = 5; array[1][9] = 5;
        array[2][8] = 5; array[2][9] = 5;
        // Component B: cols 5-6, maxX=6
        array[5][8] = 6; array[5][9] = 6;
        array[6][8] = 6; array[6][9] = 6;

        const cleared = await clearExitedGroups(array, 2);
        expect(cleared).toBe(4);
        expect(array[1][8]).toBe(0);
        expect(array[5][8]).toBe(6); // untouched
    });

    it('treats normal and special deletion types as part of the same component', async () => {
        const array = makeGrid(8, 10);
        array[2][8] = 5; array[2][9] = 7; // special deletion mixed in
        array[3][8] = 5; array[3][9] = 5;

        const cleared = await clearExitedGroups(array, 3);
        expect(cleared).toBe(4);
        expect(array[2][9]).toBe(0);
    });

    it('holds descending cube cells in place while clearing below them', async () => {
        // Cube (non-split) at cols 4-5, rows 3-4. Marked 2x2 directly below
        // it at rows 8-9. Without anchors, gravity would pull the cube down
        // to fill the cleared space; with anchors, it stays at rows 3-4.
        const array = makeGrid(8, 10);
        array[4][3] = 1; array[4][4] = 1; // cube left half
        array[5][3] = 1; array[5][4] = 1; // cube right half
        array[4][8] = 5; array[4][9] = 5;
        array[5][8] = 5; array[5][9] = 5;

        const cube = {
            topLeft:     { x: 4, y: 3 },
            topRight:    { x: 5, y: 3 },
            bottomLeft:  { x: 4, y: 4 },
            bottomRight: { x: 5, y: 4 },
        };

        const cleared = await clearExitedGroups(array, 5, cube);
        expect(cleared).toBe(4);
        expect(array[4][3]).toBe(1);
        expect(array[4][4]).toBe(1);
        expect(array[5][3]).toBe(1);
        expect(array[5][4]).toBe(1);
        expect(array[4][8]).toBe(0);
        expect(array[4][9]).toBe(0);
    });

    it('keeps a split cube intact when only one half is over cleared blocks', async () => {
        // Split cube: left half at (col 1, rows 2-3); right half at (col 2, rows 4-5).
        // Marked 2x2 only in cols 0-1 below the left half. Gravity would otherwise
        // drop the left half (col 1 had cells cleared) while leaving the right
        // half (col 2 untouched) — splitting the cube further.
        const array = makeGrid(4, 10);
        array[1][2] = 1; array[1][3] = 1; // cube left half
        array[2][4] = 1; array[2][5] = 1; // cube right half
        array[0][8] = 5; array[0][9] = 5;
        array[1][8] = 5; array[1][9] = 5;

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 4 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 5 },
        };

        const cleared = await clearExitedGroups(array, 1, cube);
        expect(cleared).toBe(4);
        // Both halves stay exactly where they were
        expect(array[1][2]).toBe(1);
        expect(array[1][3]).toBe(1);
        expect(array[2][4]).toBe(1);
        expect(array[2][5]).toBe(1);
    });

    it('compacts cells inside each segment but does not let them cross an anchor', async () => {
        // Stack in col 2: block at row 1, cube cell anchor at row 4, then
        // marked 2x2 at rows 8-9 in cols 1-2. After clearing, the row-1
        // block should fall to row 3 (just above the anchor), not past it.
        const array = makeGrid(4, 10);
        array[2][1] = 1; // free block above anchor
        array[2][4] = 1; // cube cell (anchor)
        array[1][8] = 5; array[1][9] = 5;
        array[2][8] = 5; array[2][9] = 5;

        const cube = {
            topLeft:     { x: 2, y: 4 },
            topRight:    { x: 3, y: 4 },
            bottomLeft:  { x: 2, y: 5 },
            bottomRight: { x: 3, y: 5 },
        };
        array[2][5] = 1;
        array[3][4] = 1;
        array[3][5] = 1;

        await clearExitedGroups(array, 2, cube);
        expect(array[2][4]).toBe(1);
        expect(array[2][5]).toBe(1);
        expect(array[2][3]).toBe(1);
        expect(array[2][1]).toBe(0);
        expect(array[2][8]).toBe(0);
        expect(array[2][9]).toBe(0);
    });

    it('clears a group of sweep types (9-12) when its maxX matches exitedCol', async () => {
        const array = makeGrid(8, 10);
        array[2][8] = 9;  array[2][9] = 9;  // SWEEP_TYPE_A
        array[3][8] = 10; array[3][9] = 12; // SWEEP_TYPE_B / SWEEP_TYPE_B_SPECIAL

        const cleared = await clearExitedGroups(array, 3);
        expect(cleared).toBe(4);
        expect(array[2][8]).toBe(0);
        expect(array[3][9]).toBe(0);
    });

    it('falls back to plain gravity when no cube is supplied', async () => {
        const array = makeGrid(4, 8);
        array[1][2] = 1; // floating block above cleared row
        array[1][6] = 5;
        array[2][6] = 5;
        array[1][7] = 5;
        array[2][7] = 5;

        await clearExitedGroups(array, 2);
        // Block at row 2 falls all the way down (no anchor)
        expect(array[1][2]).toBe(0);
        expect(array[1][7]).toBe(1);
    });
});
