import "babel-polyfill";
import { clearAllSweptCells } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearAllSweptCells', () => {
    it('clears every SWEEP cell on the board in one call', async () => {
        const array = g([
            '||||',
            '||||',
            'S|s|',
            'S|s|',
        ]);

        const count = await clearAllSweptCells(array);
        expect(count).toBe(4);
        expect(s(array)).toStrictEqual([
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

        const count = await clearAllSweptCells(array);
        expect(count).toBe(4);
        expect(s(array)).toStrictEqual([
            '||||',
            '||||',
            '||||',
            '||||',
        ]);
    });

    it('leaves DELETION and RECURSIVE cells untouched', async () => {
        const array = g([
            '||a|',
            '||b|',
            '||*|',
            '||~|',
            '||X|',
            '||x|',
            '||+|',
            '||=|',
        ]);

        const count = await clearAllSweptCells(array);
        expect(count).toBe(0);
        expect(s(array)).toStrictEqual([
            '||a|',
            '||b|',
            '||*|',
            '||~|',
            '||X|',
            '||x|',
            '||+|',
            '||=|',
        ]);
    });

    it('applies gravity after clearing', async () => {
        const array = g([
            '||||',
            '||||',
            '||||',
            '|A||',
            '|S||',
            '|S||',
        ]);

        const count = await clearAllSweptCells(array);
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

    it('clears sweep groups separated by a gap in the same column together', async () => {
        const array = g([
            '|||',
            '|S|',
            '|S|',
            '|A|',
            '|S|',
            '|S|',
        ]);

        const count = await clearAllSweptCells(array);
        expect(count).toBe(4);
        expect(s(array)).toStrictEqual([
            '|||',
            '|||',
            '|||',
            '|||',
            '|||',
            '|A|',
        ]);
    });

    it('keeps the falling cube anchored when clearing beneath it', async () => {
        const array = g([
            '||||',
            '||||',
            '|AA|',
            '|AA|',
            '|S||',
            '|s||',
        ]);

        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };

        const count = await clearAllSweptCells(array, cube);
        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            '||||',
            '||||',
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

        const count = await clearAllSweptCells(array, cube);

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

        const count = await clearAllSweptCells(array, cube);

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

    it('settles both cube columns in the same pass — no asymmetric floor', async () => {
        // Cube at cols 5-6, SWEEP zones in both columns with a live B row between.
        // Both B's must end up at the same height after one clear, otherwise the
        // next moveDown tick lands one side early and splits the cube.
        const array = g([
            '||||||||||||||||',
            '|||||AB|||||||||',
            '|||||AB|||||||||',
            '|||||SS|||||||||',
            '|||||BB|||||||||',
            '|||||SS|||||||||',
            '|||||SS|||||||||',
            '|||||SS|||||||||',
        ]);

        const cube = {
            topLeft:     { x: 5, y: 1 },
            topRight:    { x: 6, y: 1 },
            bottomLeft:  { x: 5, y: 2 },
            bottomRight: { x: 6, y: 2 },
        };

        const count = await clearAllSweptCells(array, cube);

        expect(count).toBe(8);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '|||||AB|||||||||',
            '|||||AB|||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||BB|||||||||',
        ]);
    });

    it('returns 0 and leaves the grid unchanged when no SWEEP cells exist', async () => {
        const array = g([
            '||||',
            '||||',
            '|A||',
            '|A||',
        ]);

        const count = await clearAllSweptCells(array);
        expect(count).toBe(0);
        expect(s(array)).toStrictEqual([
            '||||',
            '||||',
            '|A||',
            '|A||',
        ]);
    });
});
