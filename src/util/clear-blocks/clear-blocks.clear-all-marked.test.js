import "babel-polyfill";
import { prepareForDeletion, clearAllMarked } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearAllMarked', () => {
    it('removes deletion-marked blocks across all columns with gravity and returns total count', async () => {
        const array = g([
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|a|||',
            '|Ab*|',
            '|aBA|',
        ]);

        const total = await clearAllMarked(array);

        expect(total).toEqual(4);
        expect(s(array)).toStrictEqual([
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|||||',
            '|ABA|',
        ]);
    });

    it('clears an entire special flood-fill chain in one shot', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||@AAAA||||||||',
            '|||AA|||||||||||',
        ]);

        await prepareForDeletion(array);

        expect(array[3][8]).toBe('*');
        expect(array[3][9]).toBe('a');
        expect(array[4][8]).toBe('a');
        expect(array[4][9]).toBe('a');
        expect(array[5][8]).toBe('a');
        expect(array[6][8]).toBe('a');
        expect(array[7][8]).toBe('a');

        const total = await clearAllMarked(array);

        expect(total).toEqual(7);
        expect(array[3][8]).toBe('|');
        expect(array[3][9]).toBe('|');
        expect(array[4][8]).toBe('|');
        expect(array[4][9]).toBe('|');
        expect(array[5][8]).toBe('|');
        expect(array[6][8]).toBe('|');
        expect(array[7][8]).toBe('|');
    });
});
