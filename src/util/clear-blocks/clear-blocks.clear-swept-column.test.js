import "babel-polyfill";
import {
    clearSweptColumn,
} from './index.js';


describe('clearSweptColumn', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill('|'));

    it('clears all SWEEP cells in the given column', async () => {
        const array = makeGrid(4, 6);
        array[2] = ['|', '|', '|', '|', 'S', 'S'];

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(2);
        expect(array[2]).toEqual(['|', '|', '|', '|', '|', '|']);
    });

    it('clears all four sweep types', async () => {
        const array = makeGrid(4, 4);
        array[1] = ['S', 's', '#', '$'];

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(4);
        expect(array[1]).toEqual(['|', '|', '|', '|']);
    });

    it('leaves DELETION cells untouched', async () => {
        const array = makeGrid(4, 4);
        array[2] = ['a', 'b', '*', '~'];

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(0);
        expect(array[2]).toEqual(['a', 'b', '*', '~']);
    });

    it('does not touch other columns', async () => {
        const array = makeGrid(4, 4);
        array[0] = ['S', 'S', '|', '|'];
        array[2] = ['S', 'S', '|', '|'];

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(2);
        expect(array[0]).toEqual(['S', 'S', '|', '|']);
    });

    it('applies gravity within the column after clearing', async () => {
        const array = makeGrid(4, 6);
        array[1] = ['|', 'A', '|', '|', 'S', 'S'];

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(2);
        expect(array[1]).toEqual(['|', '|', '|', '|', '|', 'A']);
    });

    it('respects cube anchors when applying gravity', async () => {
        // A floating block above the cube cell would fall past it without an anchor.
        const array = makeGrid(4, 6);
        array[1] = ['A', '|', 'A', '|', 'S', 'S'];

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };
        array[1][3] = 'A';
        array[2][2] = 'A';
        array[2][3] = 'A';

        const count = await clearSweptColumn(array, 1, cube);
        expect(count).toBe(2);
        // The cube cells stay at rows 2-3; the row-0 block falls to row 1
        expect(array[1][2]).toBe('A');
        expect(array[1][3]).toBe('A');
        expect(array[1][1]).toBe('A');
        expect(array[1][0]).toBe('|');
        // Cleared cells are EMPTY
        expect(array[1][4]).toBe('|');
        expect(array[1][5]).toBe('|');
    });

    it('restores cube cells from SWEEP to their base type instead of clearing them', async () => {
        // Cube occupies col 1 rows 2-3. Those rows are SWEEP. Non-cube SWEEP
        // at row 4 should be cleared normally.
        const array = makeGrid(4, 6);
        array[1] = ['|', '|', 'S', 'S', 'S', 'A']; // rows 2-4 are SWEEP, row 5 is a real block

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };

        const count = await clearSweptColumn(array, 1, cube);

        // Only the non-cube SWEEP cell (row 4) was cleared
        expect(count).toBe(1);
        // Cube cells restored to TYPE_A, not cleared to EMPTY
        expect(array[1][2]).toBe('A');
        expect(array[1][3]).toBe('A');
        // Non-cube SWEEP cleared
        expect(array[1][4]).toBe('|');
        // Real block at row 5 fell to fill the cleared slot
        expect(array[1][5]).toBe('A');
    });

    it('block directly below cube does not fall when SWEEP is cleared further below it', async () => {
        // Col 7: cube bottom at y=2, real block at y=3 (touching cube), SWEEP at y=4
        // Col 8: cube bottom at y=2, real block at y=3 (touching cube), no SWEEP
        // After clearing col 7, the block at y=3 must NOT fall to y=4 —
        // otherwise the next moveDown sees an asymmetric surface and splits the cube.
        const array = Array.from({ length: 16 }, () => new Array(10).fill('|'));
        array[7][1] = 'A'; array[7][2] = 'A'; // cube left col, rows 1-2
        array[8][1] = 'B'; array[8][2] = 'B'; // cube right col, rows 1-2
        array[7][3] = 'A'; // block touching cube bottom-left
        array[8][3] = 'B'; // block touching cube bottom-right
        array[7][4] = 'S'; // SWEEP below the touching block in left col only

        const cube = {
            topLeft:     { x: 7, y: 1 },
            topRight:    { x: 8, y: 1 },
            bottomLeft:  { x: 7, y: 2 },
            bottomRight: { x: 8, y: 2 },
        };

        const count = await clearSweptColumn(array, 7, cube);

        // Only the SWEEP cell was cleared
        expect(count).toBe(1);
        // Block directly below cube must stay — landing surface must stay symmetric
        expect(array[7][3]).toBe('A');
        // SWEEP cleared
        expect(array[7][4]).toBe('|');
    });

    it('is a no-op for out-of-range columns', async () => {
        const array = makeGrid(3, 4);
        array[0] = ['S', 'S', '|', '|'];

        const countBelow = await clearSweptColumn(array, -1);
        const countAbove = await clearSweptColumn(array, 3);
        expect(countBelow).toBe(0);
        expect(countAbove).toBe(0);
        expect(array[0]).toEqual(['S', 'S', '|', '|']);
    });

    it('returns 0 when no SWEEP cells exist', async () => {
        const array = makeGrid(4, 4);
        array[1] = ['A', 'A', '|', '|'];

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(0);
        expect(array[1]).toEqual(['A', 'A', '|', '|']);
    });
});
