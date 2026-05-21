import "babel-polyfill";
import { clearFromColumn } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearFromColumn', () => {
    it('preserves marks before startCol and clears from startCol onward', async () => {
        const array = g([
            '|||||',
            '|||||',
            '|||||',
            'aa|aa',
            'aa|aa',
        ]);
        const count = await clearFromColumn(array, 2);
        expect(count).toBe(4);
        expect(s(array)).toStrictEqual([
            '|||||',
            '|||||',
            '|||||',
            'aa|||',
            'aa|||',
        ]);
    });

    it('clears marks across multiple columns from startCol and compacts blocks down', async () => {
        const array = g([
            '||||||',
            '||||||',
            '||BB||',
            '||BB||',
            '||bbaa',
            '||bbaa',
        ]);
        const count = await clearFromColumn(array, 2);
        expect(count).toBe(8);
        expect(s(array)).toStrictEqual([
            '||||||',
            '||||||',
            '||||||',
            '||||||',
            '||BB||',
            '||BB||',
        ]);
    });
});
