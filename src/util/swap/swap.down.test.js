import "babel-polyfill";
import {
    moveDown,
    errors,
    DROP_RATE
} from './index.js';


describe('move block down', () => {
    let array, cube;

    it('move block down by 1', async () => {
        array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 7

            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15

        ];
        cube = {
            topLeft: {x: 7, y: 0},
            topRight: {x: 8, y: 0},
            bottomLeft: {x: 7, y: 1},
            bottomRight: {x: 8, y: 1}
        }
        await moveDown(array, cube);

        expect(array).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
            [0, 1, 2, 0, 0, 0, 0, 0, 0, 0], // 7

            [0, 1, 2, 0, 0, 0, 0, 0, 0, 0], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15
        ]);
    });

    it('move block down by 2', async () => {
        array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 7

            [1, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15

        ];
        cube = {
            topLeft: {x: 7, y: 0},
            topRight: {x: 8, y: 0},
            bottomLeft: {x: 7, y: 1},
            bottomRight: {x: 8, y: 1}
        }
        await moveDown(array, cube, DROP_RATE.DROP_FAST);

        expect(array).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
            [0, 0, 1, 2, 0, 0, 0, 0, 0, 0], // 7

            [0, 0, 1, 2, 0, 0, 0, 0, 0, 0], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15
        ]);
    });

    it('move block down by 1', async () => {
        array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
            [0, 0, 0, 0, 0, 0, 0, 1, 2, 0], // 7

            [0, 0, 0, 0, 0, 0, 0, 1, 2, 0], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15

        ];
        cube = {
            topLeft: {x: 7, y: 7},
            topRight: {x: 8, y: 7},
            bottomLeft: {x: 7, y: 8},
            bottomRight: {x: 8, y: 8}
        }
        await moveDown(array, cube);

        expect(array).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2], // 7

            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15
        ]);
    });

    it('passes through a SWEEP block below both sides without false OUT_OF_BOUNDS', async () => {
        // SWEEP_TYPE_A = 9, SWEEP_TYPE_B = 10. Cube at col 7-8 rows 1-2,
        // SWEEP blocks at rows 3 (directly below). Cube should move through them.
        array = Array.from({ length: 16 }, () => new Array(10).fill(0));
        array[7][1] = 1; // topLeft
        array[7][2] = 1; // bottomLeft
        array[8][1] = 2; // topRight
        array[8][2] = 2; // bottomRight
        array[7][3] = 9; // SWEEP below left
        array[8][3] = 9; // SWEEP below right

        cube = {
            topLeft:     { x: 7, y: 1 },
            topRight:    { x: 8, y: 1 },
            bottomLeft:  { x: 7, y: 2 },
            bottomRight: { x: 8, y: 2 },
        };

        const [, dest, outOfBounds] = await moveDown(array, cube);

        // Should NOT return OUT_OF_BOUNDS
        expect(outOfBounds).toBeUndefined();
        // Cube moved down by 1
        expect(dest.bottomLeft.y).toBe(3);
        expect(dest.bottomRight.y).toBe(3);
        // Cube blocks at new positions
        expect(array[7][2]).toBe(1);
        expect(array[7][3]).toBe(1);
        expect(array[8][2]).toBe(2);
        expect(array[8][3]).toBe(2);
        // Old top positions are now EMPTY
        expect(array[7][1]).toBe(0);
        expect(array[8][1]).toBe(0);
        // SWEEP was absorbed (not re-positioned above the cube)
        expect(array[7][1]).toBe(0);
        expect(array[8][1]).toBe(0);
    });

    it('treats SWEEP as transparent on one side and real block on other — produces split', async () => {
        array = Array.from({ length: 16 }, () => new Array(10).fill(0));
        array[7][1] = 1; // topLeft
        array[7][2] = 1; // bottomLeft
        array[8][1] = 2; // topRight
        array[8][2] = 2; // bottomRight
        array[7][3] = 9; // SWEEP below left — transparent
        array[8][3] = 2; // real block below right — blocking

        cube = {
            topLeft:     { x: 7, y: 1 },
            topRight:    { x: 8, y: 1 },
            bottomLeft:  { x: 7, y: 2 },
            bottomRight: { x: 8, y: 2 },
        };

        const [, dest, outOfBounds] = await moveDown(array, cube);

        expect(outOfBounds).toBeUndefined();
        // Left side falls through SWEEP, right stays (split)
        expect(dest.bottomLeft.y).toBe(3);
        expect(dest.bottomRight.y).toBe(2);
    });

    it('move block down by 1 column', async () => {
        array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 4, 4, 4, 4, 4, 4], // 6
            [0, 0, 0, 1, 2, 3, 3, 3, 3, 3], // 7

            [0, 0, 0, 1, 2, 0, 0, 0, 0, 0], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15

        ];
        cube = {
            topLeft: {x: 7, y: 3},
            topRight: {x: 8, y: 3},
            bottomLeft: {x: 7, y: 4},
            bottomRight: {x: 8, y: 4}
        }
        await moveDown(array, cube);

        expect(array).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
            [0, 0, 0, 0, 4, 4, 4, 4, 4, 4], // 6
            [0, 0, 0, 1, 2, 3, 3, 3, 3, 3], // 7

            [0, 0, 0, 0, 1, 2, 0, 0, 0, 0], // 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 9
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // 15
        ]);
    });
});
