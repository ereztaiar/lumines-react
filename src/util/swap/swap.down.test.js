import "babel-polyfill";
import { moveDown, errors, DROP_RATE } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('move block down', () => {
    it('move block down by 1', async () => {
        const array = g([
            '|||||||AA|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
        const cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };
        await moveDown(array, cube);

        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '|||||||AA|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('move block down by 2', async () => {
        const array = g([
            '|||||||AA|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
        const cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };
        await moveDown(array, cube, DROP_RATE.DROP_FAST);

        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AA|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('move block down by 1 from mid-grid', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AA|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
        ]);
        const cube = {
            topLeft:     { x: 7, y: 7 },
            topRight:    { x: 8, y: 7 },
            bottomLeft:  { x: 7, y: 8 },
            bottomRight: { x: 8, y: 8 },
        };
        await moveDown(array, cube);

        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AA|||||||',
            '|||||||BB|||||||',
        ]);
    });

    it('passes through a SWEEP block below both sides without false OUT_OF_BOUNDS', async () => {
        const array = g([
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '|||||||SS|||||||',
            '||||||||||||||||',
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

        const [, dest, outOfBounds] = await moveDown(array, cube);

        expect(outOfBounds).toBeUndefined();
        expect(dest.bottomLeft.y).toBe(3);
        expect(dest.bottomRight.y).toBe(3);
        expect(array[7][2]).toBe('A');
        expect(array[7][3]).toBe('A');
        expect(array[8][2]).toBe('B');
        expect(array[8][3]).toBe('B');
        expect(array[7][1]).toBe('|');
        expect(array[8][1]).toBe('|');
    });

    it('splits when SWEEP is transparent on one side but real block on the other', async () => {
        const array = g([
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '|||||||SB|||||||',
            '||||||||||||||||',
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

        const [, dest, outOfBounds] = await moveDown(array, cube);

        // right is blocked by solid B; left passes through the SWEEP mark — cube splits
        expect(outOfBounds).toBeUndefined();
        expect(dest.bottomLeft.y).toBe(3);
        expect(dest.bottomRight.y).toBe(2);
        // left side moved down through the sweep (sweep absorbed, not bubbled)
        expect(array[7][1]).toBe('|');
        expect(array[7][2]).toBe('A');
        expect(array[7][3]).toBe('A');
        // right side stayed in place
        expect(array[8][1]).toBe('B');
        expect(array[8][2]).toBe('B');
    });

    it('splits when left is blocked by solid block but right is free', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AA|||||||',
            '||||||%BB|||||||',
            '||||||%@||||||||',
            '||||||%@||||||||',
            '||||||%@||||||||',
            '||||||%@||||||||',
            '||||||%@||||||||',
        ]);
        const cube = {
            topLeft:     { x: 7, y: 3 },
            topRight:    { x: 8, y: 3 },
            bottomLeft:  { x: 7, y: 4 },
            bottomRight: { x: 8, y: 4 },
        };
        const [, dest, outOfBounds] = await moveDown(array, cube);

        // left is blocked by '@' at row 5; right is free — cube splits
        expect(outOfBounds).toBeUndefined();
        expect(dest.bottomLeft.y).toBe(4);
        expect(dest.bottomRight.y).toBe(5);
        // left side stays in place
        expect(array[7][3]).toBe('A');
        expect(array[7][4]).toBe('B');
        // right side moved down one row
        expect(array[8][3]).toBe('|');
        expect(array[8][4]).toBe('A');
        expect(array[8][5]).toBe('B');
    });
});
