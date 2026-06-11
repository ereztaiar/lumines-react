import "babel-polyfill";
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearAllSweptCells,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';
import { moveDown } from '../swap/moveDown.js';
import { OUT_OF_BOUNDS } from '../swap/constants.js';


// One full game tick: the cube drops first (as in useGameLoop), then the
// swiper step runs. After the cube lands it is no longer anchored — its
// blocks belong to the stack and fall with gravity like any other block.
async function gameTick(grid, cube, swiperCol, prevSwiperCol, landed) {
    let liveCube = null;
    let nowLanded = landed;
    if (!landed) {
        const [, dest, outOfBounds] = await moveDown(grid, cube);
        if (outOfBounds === OUT_OF_BOUNDS) {
            nowLanded = true;
        } else {
            liveCube = dest;
        }
    }

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
    return { cube: liveCube || cube, landed: nowLanded, score };
}


describe('full board sweep 4 — swiper passing under a falling cube (split regression)', () => {
    it('cube resting on a group stays whole: committed columns are solid, and the group clears under both cube columns at once', async () => {
        // The recurring bug: cube falls onto a matched 2x2 directly beneath it.
        // Committed (SWEEPING) cells used to be passable, so the cube sank into
        // whichever column was committed first; the per-column clear then
        // dropped one cube column before the other. Both halves of the fix are
        // asserted here: the cube never splits while the group is being swept,
        // and after the single-shot clear both cube columns land together.
        const grid = g([
            '|||||||AB|||||||',  // 0 cube
            '|||||||AB|||||||',  // 1 cube
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||||||||||||',  // 5
            '||||||||||||||||',  // 6
            '||||||||||||||||',  // 7
            '|||||||AA|||||||',  // 8 matched 2x2
            '|||||||AA|||||||',  // 9 matched 2x2
        ]);
        let cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };

        let prevSwiperCol = null;
        let landed = false;
        const stepScores = [];
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            const result = await gameTick(grid, cube, swiperCol, prevSwiperCol, landed);
            cube = result.cube;
            landed = result.landed;
            stepScores.push(result.score);
            prevSwiperCol = swiperCol;

            // The cube must never split — not while falling, not while resting
            // on the committed group.
            expect(cube.bottomLeft.y).toBe(cube.bottomRight.y);
        }

        // Group committed at cols 7-8, erased in one piece entering col 9.
        expect(stepScores[9]).toBe(4);
        expect(stepScores.reduce((a, b) => a + b, 0)).toBe(4);

        // The landed cube fell into the freed space with both columns level.
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
        ]);
    });

    it('flood-filled special group keeps its tail: cleared only after the swiper passes the rightmost flooded column', async () => {
        // Special 2x2 at cols 4-5 with a flood tail at cols 6-7. Once both 2x2
        // columns are committed, the sweeping special ('$') must keep the flood
        // re-marking the tail so cols 6-7 are committed too — the whole region
        // is erased together after col 7, not truncated at the 2x2.
        const grid = g([
            '||||||||||||||||',  // 0
            '||||||||||||||||',  // 1
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||||||||||||',  // 5
            '||||||||||||||||',  // 6
            '||||||||||||||||',  // 7
            '||||BB||||||||||',  // 8
            '||||B%BB||||||||',  // 9
        ]);

        let prevSwiperCol = null;
        const stepScores = [];
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            const score = await sweepOnly(grid, swiperCol, prevSwiperCol);
            stepScores.push(score);
            prevSwiperCol = swiperCol;

            if (swiperCol === 7) {
                // Whole region committed, nothing erased yet.
                expect(s(grid)).toStrictEqual([
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||ss||||||||||',
                    '||||s$ss||||||||',
                ]);
            }
        }

        // All 6 cells (2x2 + 2-cell tail) scored in one step, entering col 8.
        expect(stepScores[8]).toBe(6);
        expect(stepScores.reduce((a, b) => a + b, 0)).toBe(6);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });
});


async function sweepOnly(grid, swiperCol, prevSwiperCol) {
    const { score } = await gameTick(grid, {}, swiperCol, prevSwiperCol, true);
    return score;
}
