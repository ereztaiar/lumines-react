import "babel-polyfill";
import {
    clearSweptColumn,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearSweptColumn — partner column equalization', () => {
    it('equalizes block positions in both cube columns when partner also has SWEEP cells', async () => {
        // Cube at cols 5-6, rows 1-2. SWEEP in both columns below the cube (rows
        // 3, 5, 6, 7). Block B at row 4 sits above the lower sweep zone.
        //
        // Without the fix: clearing col 5 moves B to row 7 while col 6's B stays
        // at row 4 (sitting on its sweep cells). On the next moveDown tick the
        // right side lands first → unexpected split.
        //
        // With the fix: both B's settle to row 7 in the same pass.
        const array = g([
            '||||||||||||||||',
            '|||||AB|||||||||',
            '|||||AB|||||||||',
            '|||||SS|||||||||',
            '|||||BB|||||||||',
            '|||||SS|||||||||',
            '|||||SS|||||||||',
            '|||||SS|||||||||',
        ]);

        const cube = {
            topLeft:     { x: 5, y: 1 },
            topRight:    { x: 6, y: 1 },
            bottomLeft:  { x: 5, y: 2 },
            bottomRight: { x: 6, y: 2 },
        };

        const count = await clearSweptColumn(array, 5, cube);

        expect(count).toBe(8);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '|||||AB|||||||||',
            '|||||AB|||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||BB|||||||||',
        ]);
    });

    it('does not apply partner equalization when the cube is not in the swept column', async () => {
        // Cube at cols 7-8, swept column is 5. Partner logic must be skipped:
        // only col 5 should be compacted; cols 6-8 remain untouched.
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '|||||A||||||||||',
            '|||||S||||||||||',
            '|||||S||||||||||',
        ]);

        const cube = {
            topLeft:     { x: 7, y: 3 },
            topRight:    { x: 8, y: 3 },
            bottomLeft:  { x: 7, y: 4 },
            bottomRight: { x: 8, y: 4 },
        };

        const count = await clearSweptColumn(array, 5, cube);

        expect(count).toBe(2);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||A||||||||||',
        ]);
    });
});
