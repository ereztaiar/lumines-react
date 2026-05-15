import "babel-polyfill";
import {
    revertUnclaimedMarks,
} from './index.js';


describe('revertUnclaimedMarks', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill(0));

    it('reverts all four deletion types in unvisited columns', async () => {
        const array = makeGrid(6, 4);
        array[3] = [5, 6, 7, 8];

        await revertUnclaimedMarks(array, 3);
        expect(array[3]).toEqual([1, 2, 3, 4]);
    });

    it('does not touch columns the swiper has already passed', async () => {
        const array = makeGrid(6, 4);
        array[0] = [5, 6, 7, 8];
        array[5] = [5, 6, 7, 8];

        await revertUnclaimedMarks(array, 3);
        expect(array[0]).toEqual([5, 6, 7, 8]); // locked-in
        expect(array[5]).toEqual([1, 2, 3, 4]); // reverted
    });

    it('leaves non-deletion values untouched', async () => {
        const array = makeGrid(4, 5);
        array[2] = [0, 1, 2, 3, 4];

        await revertUnclaimedMarks(array, 0);
        expect(array[2]).toEqual([0, 1, 2, 3, 4]);
    });

    it('is a no-op when swiperCol is at or beyond the grid width', async () => {
        const array = makeGrid(4, 3);
        array[3] = [5, 6, 7];
        const snapshot = JSON.parse(JSON.stringify(array));

        await revertUnclaimedMarks(array, 4);
        expect(array).toStrictEqual(snapshot);
    });
});
