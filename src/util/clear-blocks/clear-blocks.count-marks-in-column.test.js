import "babel-polyfill";
import {
    countMarksInColumn,
} from './index.js';


describe('countMarksInColumn', () => {
    it('counts all four deletion types without mutating the grid', async () => {
        let array = [
            ['|', '|', '|', '|', '|', '|', 'a', 'b', '*', '~'],
            ['|', '|', '|', '|', '|', '|', '|', 'A', 'B', '@'],
            ['|', '|', '|', '|', '|', '|', 'a', 'a', 'a', 'a'],
        ];
        const snapshot = JSON.parse(JSON.stringify(array));

        expect(await countMarksInColumn(array, 0)).toEqual(4);
        expect(await countMarksInColumn(array, 1)).toEqual(0);
        expect(await countMarksInColumn(array, 2)).toEqual(4);
        expect(array).toStrictEqual(snapshot);
    });
});
