import "babel-polyfill";
import {
    prepareForDeletion,
    commitColumnAsSweeping,
    revertUncommittedMarks,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';

// These tests cover the case where the swiper has already committed one column
// of a matched group to SWEEPING and then revert+prepareForDeletion runs on
// the next tick. prepareForDeletion must re-detect the group using the SWEEPING
// column as a valid same-color participant so the remaining column gets
// re-marked DELETION instead of being left as a live block.

describe('prepareForDeletion re-detects groups with a partially-swept column', () => {
    it('left column SWEEPING_TYPE_A + right column TYPE_A → right column re-marked DELETION', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||SA||||||',
            '||||||||SA||||||',
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
            '||||||||Sa||||||',
            '||||||||Sa||||||',
        ]);
    });

    it('right column SWEEPING_TYPE_A + left column TYPE_A → left column re-marked DELETION', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||AS||||||',
            '||||||||AS||||||',
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
            '||||||||aS||||||',
            '||||||||aS||||||',
        ]);
    });

    it('left column SWEEPING_TYPE_B + right column TYPE_B → right column re-marked DELETION', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||sB||||||',
            '||||||||sB||||||',
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
            '||||||||sb||||||',
            '||||||||sb||||||',
        ]);
    });

    it('SWEEPING cells are not re-marked — they stay SWEEPING after prepareForDeletion', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||SA||||||',
            '||||||||SA||||||',
        ]);
        await prepareForDeletion(array);
        // col 8 was SWEEPING — must remain S, not demoted back to a
        expect(array[8][8]).toBe('S');
        expect(array[8][9]).toBe('S');
    });

    it('full cycle: mark → commit left col → revert → prepareForDeletion re-marks right col', async () => {
        // Simulate one game-loop tick: prepareForDeletion detects a 2x2, the
        // swiper commits col 8, then the next tick reverts col 9's mark and
        // runs prepareForDeletion again — col 9 must be re-marked as DELETION.
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||AA||||||',
            '||||||||AA||||||',
        ]);
        await prepareForDeletion(array);    // marks both cols as 'a'
        await commitColumnAsSweeping(array, 8); // col 8 → 'S'
        await revertUncommittedMarks(array);    // col 9 reverted 'a' → 'A'
        await prepareForDeletion(array);    // must re-mark col 9 as 'a'

        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||Sa||||||',
            '||||||||Sa||||||',
        ]);
    });
});
