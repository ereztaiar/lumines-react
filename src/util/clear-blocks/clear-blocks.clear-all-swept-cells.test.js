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

    it('block directly below cube falls when SWEEP beneath it clears; cube stays anchored', async () => {
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
            '||||||||B|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||A||||||||',
        ]);
    });

    it('leaves no floating non-cube block after clearing under a resting cube', async () => {
        // Cube rests on a B whose support is a sweep group; once the group
        // clears, the B must settle to the floor instead of hanging mid-air.
        const array = g([
            '||||||||||||||||',
            '||||AB||||||||||',
            '||||AB||||||||||',
            '||||B|||||||||||',
            '||||S|||||||||||',
            '||||S|||||||||||',
            '||||sA||||||||||',
            '||||sA||||||||||',
            '||||AB||||||||||',
            '||||AB||||||||||',
        ]);

        const cube = {
            topLeft:     { x: 4, y: 1 },
            topRight:    { x: 5, y: 1 },
            bottomLeft:  { x: 4, y: 2 },
            bottomRight: { x: 5, y: 2 },
        };

        const count = await clearAllSweptCells(array, cube);

        expect(count).toBe(4);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||AB||||||||||',
            '||||AB||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||A||||||||||',
            '||||BA||||||||||',
            '||||AB||||||||||',
            '||||AB||||||||||',
        ]);

        // No non-cube block may sit above an EMPTY cell in its column.
        const cubeCells = new Set(['4,1', '5,1', '4,2', '5,2']);
        for (let x = 0; x < array.length; x++) {
            for (let y = 0; y < array[x].length - 1; y++) {
                if (array[x][y] !== '|' && !cubeCells.has(`${x},${y}`)) {
                    expect(array[x][y + 1]).not.toBe('|');
                }
            }
        }
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
