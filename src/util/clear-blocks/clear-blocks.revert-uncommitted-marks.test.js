import "babel-polyfill";
import {
    revertUncommittedMarks,
} from './index.js';


describe('revertUncommittedMarks', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill(0));

    it('reverts all four deletion types back to their plain type', async () => {
        const array = makeGrid(6, 4);
        array[3] = [5, 6, 7, 8];

        await revertUncommittedMarks(array);
        expect(array[3]).toEqual([1, 2, 3, 4]);
    });

    it('reverts deletion marks in every column regardless of position', async () => {
        const array = makeGrid(6, 4);
        array[0] = [5, 6, 7, 8];
        array[5] = [5, 6, 7, 8];

        await revertUncommittedMarks(array);
        expect(array[0]).toEqual([1, 2, 3, 4]);
        expect(array[5]).toEqual([1, 2, 3, 4]);
    });

    it('does not touch SWEEP cells (9-12)', async () => {
        const array = makeGrid(4, 4);
        array[2] = [9, 10, 11, 12];

        await revertUncommittedMarks(array);
        expect(array[2]).toEqual([9, 10, 11, 12]);
    });

    it('leaves non-deletion values untouched', async () => {
        const array = makeGrid(4, 5);
        array[2] = [0, 1, 2, 3, 4];

        await revertUncommittedMarks(array);
        expect(array[2]).toEqual([0, 1, 2, 3, 4]);
    });

    it('reverts a mixed column of DELETION and SWEEP correctly', async () => {
        const array = makeGrid(4, 4);
        array[1] = [5, 9, 6, 10];

        await revertUncommittedMarks(array);
        expect(array[1]).toEqual([1, 9, 2, 10]);
    });
});
