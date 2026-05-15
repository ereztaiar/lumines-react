import "babel-polyfill";
import {
    countMarksInColumn,
} from './index.js';


describe('countMarksInColumn', () => {
    it('counts all four deletion types without mutating the grid', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 5, 6, 7, 8],
            [0, 0, 0, 0, 0, 0, 0, 1, 2, 3],
            [0, 0, 0, 0, 0, 0, 5, 5, 5, 5],
        ];
        const snapshot = JSON.parse(JSON.stringify(array));

        expect(await countMarksInColumn(array, 0)).toEqual(4);
        expect(await countMarksInColumn(array, 1)).toEqual(0);
        expect(await countMarksInColumn(array, 2)).toEqual(4);
        expect(array).toStrictEqual(snapshot);
    });
});
