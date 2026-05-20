import "babel-polyfill";
import { clearSweptColumn } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearSweptColumn', () => {
    it('clears all SWEEP cells in the given column', async () => {
        const array = g([
            '||||',
            '||||',
            '||||',
            '||||',
            '||S|',
            '||S|',
        ]);

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            '||||',
            '||||',
            '||||',
            '||||',
            '||||',
            '||||',
        ]);
    });

    it('clears all four sweep types', async () => {
        const array = g([
            '|S||',
            '|s||',
            '|#||',
            '|$||',
        ]);

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(4);
        expect(s(array)).toStrictEqual([
            '||||',
            '||||',
            '||||',
            '||||',
        ]);
    });

    it('leaves DELETION cells untouched', async () => {
        const array = g([
            '||a|',
            '||b|',
            '||*|',
            '||~|',
        ]);

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(0);
        expect(s(array)).toStrictEqual([
            '||a|',
            '||b|',
            '||*|',
            '||~|',
        ]);
    });

    it('does not touch other columns', async () => {
        const array = g([
            'S|S|',
            'S|S|',
            '||||',
            '||||',
        ]);

        const count = await clearSweptColumn(array, 2);
        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            'S|||',
            'S|||',
            '||||',
            '||||',
        ]);
    });

    it('applies gravity within the column after clearing', async () => {
        const array = g([
            '||||',
            '|A||',
            '||||',
            '||||',
            '|S||',
            '|S||',
        ]);

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            '||||',
            '||||',
            '||||',
            '||||',
            '||||',
            '|A||',
        ]);
    });

    it('respects cube anchors when applying gravity', async () => {
        const array = g([
            '|A||',
            '||||',
            '|AA|',
            '|AA|',
            '|S||',
            '|S||',
        ]);

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };

        const count = await clearSweptColumn(array, 1, cube);
        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            '||||',
            '|A||',
            '|AA|',
            '|AA|',
            '||||',
            '||||',
        ]);
    });

    it('restores cube cells from SWEEP to their base type instead of clearing them', async () => {
        const array = g([
            '||||',
            '||||',
            '|S||',
            '|S||',
            '|S||',
            '|A||',
        ]);

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };

        const count = await clearSweptColumn(array, 1, cube);

        expect(count).toBe(1);
        expect(s(array)).toStrictEqual([
            '||||',
            '||||',
            '|A||',
            '|A||',
            '||||',
            '|A||',
        ]);
    });

    it('block directly below cube does not fall when SWEEP is cleared further below it', async () => {
        const array = g([
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '|||||||S||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);

        const cube = {
            topLeft:     { x: 7, y: 1 },
            topRight:    { x: 8, y: 1 },
            bottomLeft:  { x: 7, y: 2 },
            bottomRight: { x: 8, y: 2 },
        };

        const count = await clearSweptColumn(array, 7, cube);

        expect(count).toBe(1);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('is a no-op for out-of-range columns', async () => {
        const array = g([
            'S||',
            'S||',
            '|||',
            '|||',
        ]);

        const countBelow = await clearSweptColumn(array, -1);
        const countAbove = await clearSweptColumn(array, 3);
        expect(countBelow).toBe(0);
        expect(countAbove).toBe(0);
        expect(s(array)).toStrictEqual([
            'S||',
            'S||',
            '|||',
            '|||',
        ]);
    });

    it('returns 0 when no SWEEP cells exist', async () => {
        const array = g([
            '|A||',
            '|A||',
            '||||',
            '||||',
        ]);

        const count = await clearSweptColumn(array, 1);
        expect(count).toBe(0);
        expect(s(array)).toStrictEqual([
            '|A||',
            '|A||',
            '||||',
            '||||',
        ]);
    });
});
