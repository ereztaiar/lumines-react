import "babel-polyfill";
import {
    commitColumnAsSweeping,
} from './index.js';


describe('commitColumnAsSweeping', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill('|'));

    it('converts DELETION_TYPE_A cells in the column to SWEEP_TYPE_A', async () => {
        const array = makeGrid(4, 4);
        array[2] = ['|', 'a', 'a', '|'];

        const count = await commitColumnAsSweeping(array, 2);
        expect(count).toBe(2);
        expect(array[2]).toEqual(['|', 'S', 'S', '|']);
    });

    it('converts all four deletion types to their matching sweep types', async () => {
        const array = makeGrid(4, 4);
        array[1] = ['a', 'b', '*', '~'];

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(4);
        expect(array[1]).toEqual(['S', 's', '#', '$']);
    });

    it('does not touch other columns', async () => {
        const array = makeGrid(4, 4);
        array[0] = ['a', 'a', '|', '|'];
        array[2] = ['a', 'a', '|', '|'];

        const count = await commitColumnAsSweeping(array, 2);
        expect(count).toBe(2);
        expect(array[0]).toEqual(['a', 'a', '|', '|']);
        expect(array[2]).toEqual(['S', 'S', '|', '|']);
    });

    it('leaves non-deletion values untouched', async () => {
        const array = makeGrid(4, 5);
        array[1] = ['|', 'A', 'B', '@', '%'];

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(0);
        expect(array[1]).toEqual(['|', 'A', 'B', '@', '%']);
    });

    it('is a no-op for out-of-range columns', async () => {
        const array = makeGrid(3, 4);
        array[0] = ['a', 'a', '|', '|'];

        const countBelow = await commitColumnAsSweeping(array, -1);
        const countAbove = await commitColumnAsSweeping(array, 3);
        expect(countBelow).toBe(0);
        expect(countAbove).toBe(0);
        expect(array[0]).toEqual(['a', 'a', '|', '|']);
    });

    it('leaves already-committed SWEEP cells unchanged', async () => {
        const array = makeGrid(4, 4);
        array[1] = ['S', 's', '#', '$'];

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(0);
        expect(array[1]).toEqual(['S', 's', '#', '$']);
    });
});
