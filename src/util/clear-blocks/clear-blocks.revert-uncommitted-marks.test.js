import "babel-polyfill";
import {
    revertUncommittedMarks,
} from './index.js';


describe('revertUncommittedMarks', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill('|'));

    it('reverts all four deletion types back to their plain type', async () => {
        const array = makeGrid(6, 4);
        array[3] = ['a', 'b', '*', '~'];

        await revertUncommittedMarks(array);
        expect(array[3]).toEqual(['A', 'B', '@', '%']);
    });

    it('reverts deletion marks in every column regardless of position', async () => {
        const array = makeGrid(6, 4);
        array[0] = ['a', 'b', '*', '~'];
        array[5] = ['a', 'b', '*', '~'];

        await revertUncommittedMarks(array);
        expect(array[0]).toEqual(['A', 'B', '@', '%']);
        expect(array[5]).toEqual(['A', 'B', '@', '%']);
    });

    it('does not touch SWEEP cells', async () => {
        const array = makeGrid(4, 4);
        array[2] = ['S', 's', '#', '$'];

        await revertUncommittedMarks(array);
        expect(array[2]).toEqual(['S', 's', '#', '$']);
    });

    it('leaves non-deletion values untouched', async () => {
        const array = makeGrid(4, 5);
        array[2] = ['|', 'A', 'B', '@', '%'];

        await revertUncommittedMarks(array);
        expect(array[2]).toEqual(['|', 'A', 'B', '@', '%']);
    });

    it('reverts a mixed column of DELETION and SWEEP correctly', async () => {
        const array = makeGrid(4, 4);
        array[1] = ['a', 'S', 'b', 's'];

        await revertUncommittedMarks(array);
        expect(array[1]).toEqual(['A', 'S', 'B', 's']);
    });
});
