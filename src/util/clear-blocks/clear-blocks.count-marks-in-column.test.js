import "babel-polyfill";
import { countMarksInColumn } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('countMarksInColumn', () => {
    it('counts all four deletion types without mutating the grid', async () => {
        const input = [
            '|||',
            '|||',
            '|||',
            '|||',
            '|||',
            '|||',
            'a|a',
            'bAa',
            '*Ba',
            '~@a',
        ];
        const array = g(input);

        expect(await countMarksInColumn(array, 0)).toEqual(4);
        expect(await countMarksInColumn(array, 1)).toEqual(0);
        expect(await countMarksInColumn(array, 2)).toEqual(4);
        expect(s(array)).toStrictEqual(input);
    });
});
