import "babel-polyfill";
import { prepareForDeletion } from './index.js';
import { g, s } from '../grid-test-helpers.js';

describe('floodFill (via prepareForDeletion)', () => {
    it('does not reach a diagonally adjacent same-color block', async () => {
        // A at (col 8, row 7) is diagonal from the 2×2 corner at (col 9, row 8).
        // Flood fill is 4-directional only — diagonal neighbors must stay unmarked.
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||A|||||||',
            '||||||||B@A|||||',
            '||||||||BAA|||||',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||A|||||||',
            '||||||||B*a|||||',
            '||||||||Baa|||||',
        ]);
    });

    it('marks an adjacent TYPE_A_SPECIAL block as RECURSIVE_TYPE_A_SPECIAL', async () => {
        // The @ at col 6, row 8 is adjacent to the 2×2 but outside it.
        // Flood fill should reach it via the marked cells and convert it to `+`.
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||@A@|||||||||',
            '||||AAB|||||||||',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||*a+|||||||||',
            '||||aaB|||||||||',
        ]);
    });

    it('marks only the 2×2 when no same-color blocks are adjacent', async () => {
        // Special block in a 2×2 surrounded by empty cells triggers flood fill,
        // but with nothing reachable the result is just the four DELETION marks.
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||@A||||||',
            '||||||||AA||||||',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||*a||||||',
            '||||||||aa||||||',
        ]);
    });

    it('full board scenario', async () => {
        // A more realistic scenario with a full board and a special block in the middle of a 2×2.
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||BA||||B||B||||',
            '||BBB|||@ABAB|||',
            '|@ABB%||AAAAAB||',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||BA||||B||B||||',
            '||Bbb|||*aBXB|||',
            '|@Abb%||aaXXXB||',
        ]);
    });
});
