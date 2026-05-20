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

        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||*aaaa||||||||',
            '|||aa|||||||||||',
        ]);

        const total = await clearAllMarked(array);

        expect(total).toEqual(7);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });
});
