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

    it('sweeps all 16 columns: only the first column of each group is committed per pass, remaining columns revert and survive', async () => {
        const grid = g(BOARD);

        let totalScore = 0;
        let prevSwiperCol = null;

        for (let swiperCol = 0; swiperCol < 16; swiperCol++) {
            totalScore += await sweepStep(grid, swiperCol, prevSwiperCol, CUBE);
            prevSwiperCol = swiperCol;
        }

        totalScore += await clearSweptColumn(grid, 15, CUBE);

        // SWEEPING_TYPE_* is excluded from colorTypes in prepareForDeletion, so once a
        // column is committed the 2x2 breaks and the remaining columns of the group are
        // not re-marked. Only col 1 (A group1), col 4 (B group), and col 12 (A group2)
        // are cleared — 2 cells each = 6 total.
        expect(totalScore).toEqual(6);

        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',  // row 0
            '||||||||||||||||',  // row 1
            '||||||||||||||||',  // row 2
            '||||||BA||||||||',  // row 3  cube preserved
            '||||||AB||||||||',  // row 4  cube preserved
            '||||||||||||||||',  // row 5
            '||||||||A||||B||',  // row 6  unchanged
            '|||||||BBB|||A||',  // row 7  unchanged
            '||A||BAAAAB||A||',  // row 8  cols 1,4,12 swept
            '||A||%BBBBA||@||',  // row 9  cols 1,4,12 swept; cols 5-9 B/% survive
        ]);
    });
});
