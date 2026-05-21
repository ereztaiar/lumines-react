import "babel-polyfill";
import { clearColumn } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearColumn', () => {
    it('removes marked blocks and compacts remaining blocks down', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||B|',
            '||||||||||||||B|',
            '||||||||||||||a|',
            '||||||||||||||a|',
            '||||||||||||||a|',
            '||||AA||BB||AB*a',
            '||||AA||BB||BBaa',
        ]);
        const result = await clearColumn(array, array.length - 2);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||AA||BB||ABBa',
            '||||AA||BB||BBBa',
        ]);
        expect(result).toEqual(5);
    });

    it('returns the count of cleared blocks and skips unmarked blocks', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||B|',
            '||||||||||||||A|',
            '||||||||||||||B|',
            '||||AA||BB||ABaa',
            '||||AA||BB||BBaa',
        ]);
        const result = await clearColumn(array, array.length - 2);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||B|',
            '||||AA||BB||ABAa',
            '||||AA||BB||BBBa',
        ]);
        expect(result).toEqual(2);
    });
});
