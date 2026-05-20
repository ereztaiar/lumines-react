import "babel-polyfill";
import { clearColumn } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearColumn', () => {
    it('removes marked blocks and compacts remaining blocks down', async () => {
        const array = g([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||a|',
            '||||||||||||||a|',
            '|||||||BB|||||a|',
            '|||||||BB|||||B|',
            '||||||||||||||A|',
            '||||||||||||ABaa',
            '||||||||||||BBaa',
        ]);
        const result = await clearColumn(array, array.length - 2);
        expect(s(array)).toStrictEqual([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||BB|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||ABBa',
            '||||||||||||BBAa',
        ]);
        expect(result).toEqual(5);
    });

    it('returns the count of cleared blocks and skips unmarked blocks', async () => {
        const array = g([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||B|',
            '||||||||||||||A|',
            '|||||||BB|||||||',
            '|||||||BB|||||B|',
            '||||||||||||||A|',
            '||||||||||||ABaa',
            '||||||||||||BBaa',
        ]);
        const result = await clearColumn(array, array.length - 2);
        expect(s(array)).toStrictEqual([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||B|',
            '||||||||||||||A|',
            '|||||||BB|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||ABBa',
            '||||||||||||BBAa',
        ]);
        expect(result).toEqual(2);
    });
});
