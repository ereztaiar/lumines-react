import "babel-polyfill";
import { moveDown, errors } from './index.js';
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearAllSweptCells,
} from '../clear-blocks';
import { g, s } from '../grid-test-helpers.js';


// One iteration of useGameLoop's tick % 10 === 0 branch.
async function gameTick(grid, cube, swiperCol, prevSwiperCol) {
    const [, dest, outOfBounds] = await moveDown(grid, cube);
    const liveCube = outOfBounds === errors.OUT_OF_BOUNDS ? null : dest;

    await revertUncommittedMarks(grid);
    await prepareForDeletion(grid);

    let score = 0;
    const advanced = prevSwiperCol !== swiperCol;
    if (advanced && prevSwiperCol !== null && swiperCol < prevSwiperCol) {
        score += await clearAllSweptCells(grid, liveCube);
    }
    const committed = await commitColumnAsSweeping(grid, swiperCol);
    if (advanced && committed === 0) {
        score += await clearAllSweptCells(grid, liveCube);
    }
    return {
        cube: liveCube || cube,
        outOfBounds: outOfBounds === errors.OUT_OF_BOUNDS,
        score,
    };
}


describe('cube + swiper interaction (realistic stacks)', () => {
    it('cube splits when one column is shorter — free side falls to the deeper stack', async () => {
        // col 7 stack tops at row 7 (rows 7-9). col 8 stack tops at row 5 (rows 5-9).
        // right side hits col 8 first and stops; left side continues falling to col 7 stack.
        const grid = g([
            '|||||||AB|||||||',  // 0 cube
            '|||||||AB|||||||',  // 1 cube
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||||B|||||||',  // 5 col 8 stack top
            '||||||||A|||||||',  // 6
            '|||||||AB|||||||',  // 7 col 7 stack top
            '|||||||AA|||||||',  // 8
            '|||||||BB|||||||',  // 9
        ]);
        let cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };

        let prevSwiperCol = null;
        let lastResult = null;
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            lastResult = await gameTick(grid, cube, swiperCol, prevSwiperCol);
            cube = lastResult.cube;
            prevSwiperCol = swiperCol;
            if (lastResult.outOfBounds) break;
        }
        expect(lastResult.outOfBounds).toBe(true);
        // right stopped on the shorter (col 8) stack; left fell two rows deeper to col 7 stack
        expect(cube.bottomRight.y).toBe(4);
        expect(cube.bottomLeft.y).toBe(6);
    });

    it('cube does not split when swiper clears a 2x2 in the stack below it, leaving asymmetric gap', async () => {
        // realistic: cube falling, stack at the bottom with a matched 2x2 in cols 7-8
        // at the top of the stack. As the swiper sweeps those, gravity creates an
        // asymmetric gap; cube falling into it should not split.
        const grid = g([
            '|||||||AB|||||||',  // 0 cube
            '|||||||AB|||||||',  // 1 cube
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||||||||||||',  // 5
            '||||||||||||||||',  // 6
            '|||||||AA|||||||',  // 7 matched 2x2 (will be DELETION → SWEEPING)
            '|||||||AA|||||||',  // 8 matched 2x2
            '|||||||BB|||||||',  // 9
        ]);
        let cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };

        let prevSwiperCol = null;
        let outOfBoundsTickCount = 0;
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            const result = await gameTick(grid, cube, swiperCol, prevSwiperCol);
            cube = result.cube;
            expect(cube.bottomLeft.y).toBe(cube.bottomRight.y);
            prevSwiperCol = swiperCol;
            if (result.outOfBounds) {
                outOfBoundsTickCount++;
                if (outOfBoundsTickCount > 2) break;
            }
        }
    });

    it('cube splits when falling toward an asymmetric stack and both sides eventually land', async () => {
        // col 6 stack: rows 5-8. col 7 stack: rows 6-9. col 8 stack: rows 8-9.
        // cols 6-7 rows 6-7 form a 2x2 match — deletion marks block the left side early,
        // causing a split; right side falls deeper to col 8 stack.
        const grid = g([
            '|||||||AB|||||||',  // 0 cube
            '|||||||AB|||||||',  // 1 cube
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||A|||||||||',  // 5 col 6 top
            '||||||AA||||||||',  // 6 cols 6-7
            '||||||AA||||||||',  // 7 2x2 match (cols 6-7, rows 6-7)
            '||||||AAA|||||||',  // 8 col 8 top
            '|||||||BB|||||||',  // 9
        ]);
        let cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };

        let prevSwiperCol = null;
        let lastResult = null;
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            lastResult = await gameTick(grid, cube, swiperCol, prevSwiperCol);
            cube = lastResult.cube;
            prevSwiperCol = swiperCol;
            if (lastResult.outOfBounds) break;
        }
        expect(lastResult.outOfBounds).toBe(true);
        // left blocked by deletion marks above col 7 stack; right fell to col 8 stack
        expect(cube.bottomLeft.y).toBe(5);
        expect(cube.bottomRight.y).toBe(7);
    });
});
