import "babel-polyfill";
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearSweptColumn,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';


async function sweepStep(grid, swiperCol, prevSwiperCol, cube) {
    await revertUncommittedMarks(grid);
    await prepareForDeletion(grid);
    await commitColumnAsSweeping(grid, swiperCol);
    if (prevSwiperCol !== null) {
        return clearSweptColumn(grid, prevSwiperCol, cube);
    }
    return 0;
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

    it('sweeps all 16 columns: all columns of each matched group are committed and cleared', async () => {
        const grid = g(BOARD);

        let totalScore = 0;
        let prevSwiperCol = null;

        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            totalScore += await sweepStep(grid, swiperCol, prevSwiperCol, CUBE);
            prevSwiperCol = swiperCol;
        }

        totalScore += await clearSweptColumn(grid, 15, CUBE);

        // Each group is fully cleared:
        //   A group1 (cols 1-2, rows 8-9): 4 cells
        //   B group  (cols 4-5, rows 8-9): 4 cells
        //     (cols 6-9 row 9 were recursive B but cannot re-detect because
        //      row 8 of those cols is TYPE_A — they survive as live blocks)
        //   A group2 (cols 12-13 rows 8-9, plus col 13 row 7 via flood fill): 5 cells
        // Total: 13
        expect(totalScore).toEqual(13);

        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',  // row 0
            '||||||||||||||||',  // row 1
            '||||||||||||||||',  // row 2
            '||||||BA||||||||',  // row 3  cube preserved
            '||||||AB||||||||',  // row 4  cube preserved
            '||||||||||||||||',  // row 5
            '||||||||A|||||||',  // row 6  col 13's B fell to row 9 via gravity
            '|||||||BBB||||||',  // row 7  col 13's A was swept
            '||||||AAAAB|||||',  // row 8  cols 1,2,4,5,12 swept; 6-10 survive
            '||||||BBBBA||B||',  // row 9  cols 1,2,4,5,12 swept; B survivors 6-9, A at 10, fallen B at 13
        ]);
    });
});
