import "babel-polyfill";
import { moveDown, errors } from './index.js';
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearSweptColumn,
} from '../clear-blocks';
import { g, s } from '../grid-test-helpers.js';


// One iteration of useGameLoop's tick % 10 === 0 branch.
async function gameTick(grid, cube, swiperCol, prevSwiperCol) {
    const [, dest, outOfBounds] = await moveDown(grid, cube);
    const liveCube = outOfBounds === errors.OUT_OF_BOUNDS ? null : dest;

    await revertUncommittedMarks(grid);
    await prepareForDeletion(grid);
    await commitColumnAsSweeping(grid, swiperCol);

    let score = 0;
    if (prevSwiperCol !== null && prevSwiperCol !== swiperCol) {
        score = await clearSweptColumn(grid, prevSwiperCol, liveCube);
    }
    return {
        cube: liveCube || cube,
        outOfBounds: outOfBounds === errors.OUT_OF_BOUNDS,
        score,
    };
}


describe('cube + swiper interaction (realistic stacks)', () => {
    it('cube falling toward an uneven stack does not split when one column is shorter', async () => {
        // realistic: cube starts at top, stack at the bottom.
        // col 7 stack tops at row 7 (rows 7-9). col 8 stack tops at row 5 (rows 5-9).
        // when cube reaches the stack, col 8 has support sooner than col 7.
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
            // The cube must never become split mid-fall.
            expect(cube.bottomLeft.y).toBe(cube.bottomRight.y);
            prevSwiperCol = swiperCol;
            if (lastResult.outOfBounds) break;
        }
        // when the cube lands, it should land sitting on the SHORTER stack
        // (right side, col 8 at row 5). Bottom of cube at row 4.
        expect(cube.bottomLeft.y).toBe(4);
        expect(cube.bottomRight.y).toBe(4);
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

    it('reproduces the user-reported behavior: floating cube cell after asymmetric land + later gravity sweep', async () => {
        // setup: cube above an uneven stack
        // col 7 stack: rows 5-9 (top row 5)
        // col 8 stack: rows 8-9 (top row 8)
        // col 7 has a matched 2x2 with col 6 at rows 4-5 — will be swept
        const grid = g([
            '|||||||AB|||||||',  // 0 cube
            '|||||||AB|||||||',  // 1 cube
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||A|||||||||',  // 5 col 6 top
            '||||||AA||||||||',  // 6 paired with col 7 row 6 for sweep
            '||||||AA||||||||',  // 7 the 2x2 AA AA = match (cols 6-7, rows 6-7)
            '||||||AAA|||||||',  // 8
            '|||||||BB|||||||',  // 9 col 8 ends here
        ]);
        let cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };

        let prevSwiperCol = null;
        const trace = [];
        let lastResult = null;
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            lastResult = await gameTick(grid, cube, swiperCol, prevSwiperCol);
            cube = lastResult.cube;
            trace.push({
                swiperCol,
                cubeY: [cube.bottomLeft.y, cube.bottomRight.y],
                outOfBounds: lastResult.outOfBounds,
                grid7: grid[7].join(''),
                grid8: grid[8].join(''),
            });
            // CRITICAL: cube must stay level (no split)
            if (cube.bottomLeft.y !== cube.bottomRight.y) {
                console.log('SPLIT DETECTED at swiperCol=', swiperCol, trace);
                throw new Error(`cube split: ${JSON.stringify(cube)}`);
            }
            prevSwiperCol = swiperCol;
        }
    });
});
