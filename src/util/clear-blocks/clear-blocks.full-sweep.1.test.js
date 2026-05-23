import "babel-polyfill";
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearSweptColumn,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';
import { moveDown } from '../swap/moveDown.js';
import { OUT_OF_BOUNDS } from '../swap/constants.js';


async function sweepStep(grid, swiperCol, prevSwiperCol, cube) {
    await revertUncommittedMarks(grid);
    await prepareForDeletion(grid);
    await commitColumnAsSweeping(grid, swiperCol);
    if (prevSwiperCol !== null) {
        return clearSweptColumn(grid, prevSwiperCol, cube);
    }
    return 0;
}


// ABBA cube at top-middle (cols 7–8, rows 0–1). Mixed colors — no deletions triggered.
const BOARD = [
    '|||||||AB|||||||',  // row 0  ← cube top    (A col 7, B col 8)
    '|||||||BA|||||||',  // row 1  ← cube bottom (B col 7, A col 8)
    '||||||||||||||||',  // row 2
    '||||||||||||||||',  // row 3
    '||||||||||||||||',  // row 4
    '||||||||||||||||',  // row 5
    '||||||||||||||||',  // row 6
    '||||||||||||||||',  // row 7
    '||||||||||||||||',  // row 8
    '||||||||||||||||',  // row 9
];

const CUBE_INITIAL = {
    topLeft:     { x: 7, y: 0 },
    topRight:    { x: 8, y: 0 },
    bottomLeft:  { x: 7, y: 1 },
    bottomRight: { x: 8, y: 1 },
};

const START_COL = 7;
const NUM_COLS = 16;

// Runs sweep steps 0..step, dropping the cube once after each sweep tick.
// Returns { grid, cube } where cube is the final position (landed at rows 8–9 from step 8 onward).
async function sweepAndDrop(step) {
    const grid = g(BOARD);
    let cube = { ...CUBE_INITIAL };
    let landed = false;
    for (let i = 0; i <= step; i++) {
        const col = (START_COL + i) % NUM_COLS;
        const prevCol = i > 0 ? (START_COL + i - 1) % NUM_COLS : null;
        await sweepStep(grid, col, prevCol, cube);
        if (!landed) {
            const [, newCube, result] = await moveDown(grid, cube);
            if (result !== OUT_OF_BOUNDS) {
                cube = newCube;
            } else {
                landed = true;
            }
        }
    }
    return { grid, cube };
}


describe('full board sweep 1 — ABBA cube at top-middle, sweep starts at column 7', () => {
    it('step 1: commit col 7, cube drops to rows 1–2', async () => {
        const { grid } = await sweepAndDrop(0);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||BA|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('step 2: commit col 8, clear col 7, cube drops to rows 2–3', async () => {
        const { grid } = await sweepAndDrop(1);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||BA|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('step 3: commit col 9, clear col 8, cube drops to rows 3–4', async () => {
        const { grid } = await sweepAndDrop(2);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||BA|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('step 4: commit col 10, clear col 9, cube drops to rows 4–5', async () => {
        const { grid } = await sweepAndDrop(3);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||BA|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('step 5: commit col 11, clear col 10, cube drops to rows 5–6', async () => {
        const { grid } = await sweepAndDrop(4);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||BA|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('step 6: commit col 12, clear col 11, cube drops to rows 6–7', async () => {
        const { grid } = await sweepAndDrop(5);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||BA|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('step 7: commit col 13, clear col 12, cube drops to rows 7–8', async () => {
        const { grid } = await sweepAndDrop(6);
        expect(s(grid)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||BA|||||||',
            '||||||||||||||||',
        ]);
    });

    it('step 8: commit col 14, clear col 13, cube lands at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(7);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 9: commit col 15, clear col 14, cube rests at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(8);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 10: commit col 0, clear col 15, cube rests at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(9);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 11: commit col 1, clear col 0, cube rests at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(10);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 12: commit col 2, clear col 1, cube rests at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(11);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 13: commit col 3, clear col 2, cube rests at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(12);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 14: commit col 4, clear col 3, cube rests at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(13);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 15: commit col 5, clear col 4, cube rests at rows 8–9', async () => {
        const { grid } = await sweepAndDrop(14);
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
            '|||||||BA|||||||',
        ]);
    });

    it('step 16: commit col 6, clear col 5, final clear col 6, cube rests at rows 8–9', async () => {
        const { grid, cube } = await sweepAndDrop(15);
        await clearSweptColumn(grid, 6, cube);
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
            '|||||||BA|||||||',
        ]);
    });
});
