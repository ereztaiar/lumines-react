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


// A 2x2 B group at cols 4-5. Blocks must stay on the board (as committed
// SWEEPING marks) while the swiper is inside the group, and vanish in one
// piece on the first column past it.
const BOARD = [
    '||||||||||||||||',  // 0
    '||||||||||||||||',  // 1
    '||||||||||||||||',  // 2
    '||||||||||||||||',  // 3
    '||||||||||||||||',  // 4
    '||||||||||||||||',  // 5
    '||||||||||||||||',  // 6
    '||||||||||||||||',  // 7
    '||||BB||||||||||',  // 8
    '||||BB||||||||||',  // 9
];

describe('full board sweep 2 — group is only deleted after the swiper passes all of it', () => {
    it('keeps committed columns on the board until the group ends, then clears them together', async () => {
        const grid = g(BOARD);
        let prevSwiperCol = null;
        const stepScores = [];

        for (let swiperCol = 0; swiperCol <= 4; swiperCol++) {
            stepScores.push(await sweepStep(grid, swiperCol, prevSwiperCol));
            prevSwiperCol = swiperCol;
        }
        // Swiper on col 4: left column committed (s), right column still a
        // tentative deletion mark (b). Nothing erased.
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||sb||||||||||',
            '||||sb||||||||||',
        ]);

        stepScores.push(await sweepStep(grid, 5, prevSwiperCol));
        prevSwiperCol = 5;
        // Swiper on col 5: both columns committed, still on the board.
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
            '||||ss||||||||||',
        ]);

        stepScores.push(await sweepStep(grid, 6, prevSwiperCol));
        // Swiper entered col 6 (nothing to promote): the whole group is erased
        // in this single step.
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

        // All 4 cells scored at once, on the col-6 step and nowhere else.
        expect(stepScores).toStrictEqual([0, 0, 0, 0, 0, 0, 4]);
    });
});
