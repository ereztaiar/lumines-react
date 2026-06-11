import "babel-polyfill";
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearAllSweptCells,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';


// One swiper step of useGameLoop: marks revert and re-detect every tick, the
// current column is committed, and the board is only cleared when the swiper
// enters a column with nothing to promote (the group has been fully passed)
// or wraps back to the left edge.
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



const BOARD = [
    '||||||||||||||||',  // row 0
    '||||||||||||||||',  // row 1
    '||||||||||||||||',  // row 2
    '||||||BA||||||||',  // row 3  ← cube top   (cols 6-7)
    '||||||AB||||||||',  // row 4  ← cube bottom (cols 6-7)
    '||||||||||||||||',  // row 5
    '||||||||A||||B||',  // row 6
    '|||||||BBB|||A||',  // row 7
    '|AA|BBAAAAB|AA||',  // row 8
    '|AA|B%BBBBA|A@||',  // row 9  ← board floor
];

const CUBE = {
    topLeft:     { x: 6, y: 3 },
    topRight:    { x: 7, y: 3 },
    bottomLeft:  { x: 6, y: 4 },
    bottomRight: { x: 7, y: 4 },
};

describe('full board sweep', () => {
    it('prepareForDeletion marks all six deletion-type scenarios at once', async () => {
        const grid = g(BOARD);
        await prepareForDeletion(grid);

        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',  // row 0
            '||||||||||||||||',  // row 1
            '||||||||||||||||',  // row 2
            '||||||BA||||||||',  // row 3
            '||||||AB||||||||',  // row 4
            '||||||||||||||||',  // row 5
            '||||||||A||||B||',  // row 6
            '|||||||BBB|||X||',  // row 7  X = RECURSIVE_TYPE_A (flood-fill from special @)
            '|aa|bbAAAAB|aa||',  // row 8
            '|aa|b~xxxxA|a*||',  // row 9  x = RECURSIVE_TYPE_B (flood-fill from special %)
        ]);
    });

    it('sweeps all 16 columns: each group is cleared in one piece after the swiper passes it', async () => {
        const grid = g(BOARD);

        let totalScore = 0;
        const stepScores = [];
        let prevSwiperCol = null;

        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            const stepScore = await sweepStep(grid, swiperCol, prevSwiperCol, CUBE);
            stepScores.push(stepScore);
            totalScore += stepScore;
            prevSwiperCol = swiperCol;
        }

        totalScore += await clearAllSweptCells(grid, CUBE);

        // Each group is erased as a whole, one tick after its last column is
        // committed:
        //   A group1 (cols 1-2, rows 8-9): 4 cells       → cleared at col 3
        //   B group  (cols 4-5, rows 8-9 + flood tail cols 6-9 row 9): 8 cells
        //     (the sweeping special '$' keeps the flood re-marking the tail
        //      each tick until the swiper commits cols 6-9)  → cleared at col 10
        //   A group2 (cols 12-13 rows 8-9 + col 13 row 7 via flood): 5 cells
        //                                                  → cleared at col 14
        expect(stepScores[3]).toBe(4);
        expect(stepScores[10]).toBe(8);
        expect(stepScores[14]).toBe(5);
        expect(totalScore).toEqual(17);

        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',  // row 0
            '||||||||||||||||',  // row 1
            '||||||||||||||||',  // row 2
            '||||||BA||||||||',  // row 3  cube preserved
            '||||||AB||||||||',  // row 4  cube preserved
            '||||||||||||||||',  // row 5
            '||||||||||||||||',  // row 6
            '||||||||A|||||||',  // row 7  col 8's survivors compacted down
            '|||||||BBBB|||||',  // row 8  rows above the flood tail fell one row
            '||||||AAAAA||B||',  // row 9  col 13's B fell to the floor
        ]);
    });
});
