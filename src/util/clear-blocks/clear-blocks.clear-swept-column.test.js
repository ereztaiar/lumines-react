import "babel-polyfill";
import {
    clearSweptColumn,
} from './index.js';


describe('clearSweptColumn', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill(0));

    it('clears all SWEEP cells in the given column', async () => {
        const array = makeGrid(4, 6);
        array[2] = [0, 0, 0, 0, 9, 9];

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(2);
        expect(array[2]).toEqual([0, 0, 0, 0, 0, 0]);
    });

    it('clears all four sweep types', async () => {
        const array = makeGrid(4, 4);
        array[1] = [9, 10, 11, 12];

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(4);
        expect(array[1]).toEqual([0, 0, 0, 0]);
    });

    it('leaves DELETION cells untouched', async () => {
        const array = makeGrid(4, 4);
        array[2] = [5, 6, 7, 8];

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(0);
        expect(array[2]).toEqual([5, 6, 7, 8]);
    });

    it('does not touch other columns', async () => {
        const array = makeGrid(4, 4);
        array[0] = [9, 9, 0, 0];
        array[2] = [9, 9, 0, 0];

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(2);
        expect(array[0]).toEqual([9, 9, 0, 0]);
    });

    it('applies gravity within the column after clearing', async () => {
        const array = makeGrid(4, 6);
        array[1] = [0, 1, 0, 0, 9, 9];

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(2);
        expect(array[1]).toEqual([0, 0, 0, 0, 0, 1]);
    });

    it('respects cube anchors when applying gravity', async () => {
        // A floating block above the cube cell would fall past it without an anchor.
        const array = makeGrid(4, 6);
        array[1] = [1, 0, 1, 0, 9, 9];

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };
        array[1][3] = 1;
        array[2][2] = 1;
        array[2][3] = 1;

        const count = await clearSweptColumn(array, 1, cube);
        expect(count).toBe(2);
        // The cube cells stay at rows 2-3; the row-0 block falls to row 1
        expect(array[1][2]).toBe(1);
        expect(array[1][3]).toBe(1);
        expect(array[1][1]).toBe(1);
        expect(array[1][0]).toBe(0);
        // Cleared cells are EMPTY
        expect(array[1][4]).toBe(0);
        expect(array[1][5]).toBe(0);
    });

    it('restores cube cells from SWEEP to their base type instead of clearing them', async () => {
        // Cube occupies col 1 rows 2-3. Those rows are SWEEP (9). Non-cube SWEEP
        // at row 4 should be cleared normally.
        const array = makeGrid(4, 6);
        array[1] = [0, 0, 9, 9, 9, 1]; // rows 2-4 are SWEEP, row 5 is a real block

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };

        const count = await clearSweptColumn(array, 1, cube);

        // Only the non-cube SWEEP cell (row 4) was cleared
        expect(count).toBe(1);
        // Cube cells restored to TYPE_A (1), not cleared to EMPTY
        expect(array[1][2]).toBe(1);
        expect(array[1][3]).toBe(1);
        // Non-cube SWEEP cleared
        expect(array[1][4]).toBe(0);
        // Real block at row 5 fell to fill the cleared slot
        expect(array[1][5]).toBe(1);
    });

    it('is a no-op for out-of-range columns', async () => {
        const array = makeGrid(3, 4);
        array[0] = [9, 9, 0, 0];

        const countBelow = await clearSweptColumn(array, -1);
        const countAbove = await clearSweptColumn(array, 3);
        expect(countBelow).toBe(0);
        expect(countAbove).toBe(0);
        expect(array[0]).toEqual([9, 9, 0, 0]);
    });

    it('returns 0 when no SWEEP cells exist', async () => {
        const array = makeGrid(4, 4);
        array[1] = [1, 1, 0, 0];

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(0);
        expect(array[1]).toEqual([1, 1, 0, 0]);
    });
});
