import "babel-polyfill";
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearAllSweptCells,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';


async function sweepStep(grid, swiperCol, prevSwiperCol, cube) {
    await revertUncommittedMarks(grid);
    await prepareForDeletion(grid);

    let score = 0;
    const advanced = prevSwiperCol !== swiperCol;
    if (advanced && prevSwiperCol !== null && swiperCol < prevSwiperCol) {
        score += await clearAllSweptCells(grid, cube);
    }
    const committed = await commitColumnAsSweeping(grid, swiperCol);
    if (advanced && committed === 0) {
        score += await clearAllSweptCells(grid, cube);
    }
    return score;
}


describe('full board sweep 3 — separate groups and the wrap flush', () => {
    it('clears two gap-separated groups independently, each after its own right edge', async () => {
        const grid = g([
            '||||||||||||||||',  // 0
            '||||||||||||||||',  // 1
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||||||||||||',  // 5
            '||||||||||||||||',  // 6
            '||||||||||||||||',  // 7
            '||AA||BB||||||||',  // 8
            '||AA||BB||||||||',  // 9
        ]);

        let prevSwiperCol = null;
        const stepScores = [];
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            stepScores.push(await sweepStep(grid, swiperCol, prevSwiperCol));
            prevSwiperCol = swiperCol;

            if (swiperCol === 4) {
                // A group (cols 2-3) gone; B group (cols 6-7) still marked,
                // not yet committed — it must survive the A group's clear.
                expect(s(grid)).toStrictEqual([
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||||||||||||',
                    '||||||bb||||||||',
                    '||||||bb||||||||',
                ]);
            }
        }

        // A group cleared entering col 4, B group cleared entering col 8.
        expect(stepScores[4]).toBe(4);
        expect(stepScores[8]).toBe(4);
        expect(stepScores.reduce((a, b) => a + b, 0)).toBe(8);
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

    it('a group touching the right edge survives the end of the pass and is flushed on wrap', async () => {
        const grid = g([
            '||||||||||||||||',  // 0
            '||||||||||||||||',  // 1
            '||||||||||||||||',  // 2
            '||||||||||||||||',  // 3
            '||||||||||||||||',  // 4
            '||||||||||||||||',  // 5
            '||||||||||||||||',  // 6
            '||||||||||||||||',  // 7
            '||||||||||||||BB',  // 8
            '||||||||||||||BB',  // 9
        ]);

        let prevSwiperCol = null;
        let score = 0;
        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            score += await sweepStep(grid, swiperCol, prevSwiperCol);
            prevSwiperCol = swiperCol;
        }

        // Pass over: both columns committed, nothing erased yet.
        expect(score).toBe(0);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||ss',
            '||||||||||||||ss',
        ]);

        // Swiper wraps to col 0: the leftover group is flushed before any new
        // commits of the next pass.
        score += await sweepStep(grid, 0, prevSwiperCol);
        expect(score).toBe(4);
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
