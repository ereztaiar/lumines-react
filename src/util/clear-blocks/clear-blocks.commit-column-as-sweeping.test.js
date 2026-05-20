import "babel-polyfill";
import { commitColumnAsSweeping } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('commitColumnAsSweeping', () => {
    it('converts DELETION_TYPE_A cells in the column to SWEEP_TYPE_A', async () => {
        const array = g([
            '||||',
            '||a|',
            '||a|',
            '||||',
        ]);

        const count = await commitColumnAsSweeping(array, 2);
        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            '||||',
            '||S|',
            '||S|',
            '||||',
        ]);
    });

    it('converts all four deletion types to their matching sweep types', async () => {
        const array = g([
            '|a||',
            '|b||',
            '|*||',
            '|~||',
        ]);

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(4);
        expect(s(array)).toStrictEqual([
            '|S||',
            '|s||',
            '|#||',
            '|$||',
        ]);
    });

    it('does not touch other columns', async () => {
        const array = g([
            'a|a|',
            'a|a|',
            '||||',
            '||||',
        ]);

        const count = await commitColumnAsSweeping(array, 2);
        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            'a|S|',
            'a|S|',
            '||||',
            '||||',
        ]);
    });

    it('leaves non-deletion values untouched', async () => {
        const array = g([
            '||||',
            '|A||',
            '|B||',
            '|@||',
            '|%||',
        ]);

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(0);
        expect(s(array)).toStrictEqual([
            '||||',
            '|A||',
            '|B||',
            '|@||',
            '|%||',
        ]);
    });

    it('is a no-op for out-of-range columns', async () => {
        const array = g([
            'a||',
            'a||',
            '|||',
            '|||',
        ]);

        const countBelow = await commitColumnAsSweeping(array, -1);
        const countAbove = await commitColumnAsSweeping(array, 3);
        expect(countBelow).toBe(0);
        expect(countAbove).toBe(0);
        expect(s(array)).toStrictEqual([
            'a||',
            'a||',
            '|||',
            '|||',
        ]);
    });

    it('leaves already-committed SWEEP cells unchanged', async () => {
        const array = g([
            '|S||',
            '|s||',
            '|#||',
            '|$||',
        ]);

        const count = await commitColumnAsSweeping(array, 1);
        expect(count).toBe(0);
        expect(s(array)).toStrictEqual([
            '|S||',
            '|s||',
            '|#||',
            '|$||',
        ]);
    });
});
