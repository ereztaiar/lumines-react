import "babel-polyfill";
import {
    commitColumnAsSweeping,
} from './index.js';


describe('commitColumnAsSweeping', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill(0));

    it('converts DELETION_TYPE_A (5) cells in the column to SWEEP_TYPE_A (9)', async () => {
        const array = makeGrid(4, 4);
        array[2] = [0, 5, 5, 0];

        const count = await commitColumnAsSweeping(array, 2);
        expect(count).toBe(2);
        expect(array[2]).toEqual([0, 9, 9, 0]);
    });

    it('converts all four deletion types to their matching sweep types', async () => {
        const array = makeGrid(4, 4);
        array[1] = [5, 6, 7, 8];

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(4);
        expect(array[1]).toEqual([9, 10, 11, 12]);
    });

    it('does not touch other columns', async () => {
        const array = makeGrid(4, 4);
        array[0] = [5, 5, 0, 0];
        array[2] = [5, 5, 0, 0];

        const count = await commitColumnAsSweeping(array, 2);
        expect(count).toBe(2);
        expect(array[0]).toEqual([5, 5, 0, 0]);
        expect(array[2]).toEqual([9, 9, 0, 0]);
    });

    it('leaves non-deletion values untouched', async () => {
        const array = makeGrid(4, 5);
        array[1] = [0, 1, 2, 3, 4];

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(0);
        expect(array[1]).toEqual([0, 1, 2, 3, 4]);
    });

    it('is a no-op for out-of-range columns', async () => {
        const array = makeGrid(3, 4);
        array[0] = [5, 5, 0, 0];

        const countBelow = await commitColumnAsSweeping(array, -1);
        const countAbove = await commitColumnAsSweeping(array, 3);
        expect(countBelow).toBe(0);
        expect(countAbove).toBe(0);
        expect(array[0]).toEqual([5, 5, 0, 0]);
    });

    it('leaves already-committed SWEEP cells unchanged', async () => {
        const array = makeGrid(4, 4);
        array[1] = [9, 10, 11, 12];

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(0);
        expect(array[1]).toEqual([9, 10, 11, 12]);
    });
});
