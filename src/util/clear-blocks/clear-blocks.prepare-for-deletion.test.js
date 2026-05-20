import "babel-polyfill";
import {
    prepareForDeletion,
    commitColumnAsSweeping,
    revertUncommittedMarks,
} from './index.js';


describe('prepareForDeletion', () => {
    it('marks only valid 2x2 same-color squares resting on the bottom', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0, 0, 0],

            [0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]

        ];
        await prepareForDeletion(array);

        expect(array).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0, 0, 0],

            [0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 5]
        ]);
    });

    it('special block does not trigger when 2x2 is mixed color', async () => {
        // col 9 r9 = B breaks the 2x2 — no valid square, nothing gets marked
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 1], // col 8: special A (3), regular A (1)
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2], // col 9: r8=A, r9=B ← breaks the 2x2
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // col 10
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        await prepareForDeletion(array);
        expect(array[8][8]).toBe(3); // special A — unchanged
        expect(array[8][9]).toBe(1);
        expect(array[9][8]).toBe(1);
        expect(array[9][9]).toBe(2); // B — unchanged
        expect(array[10][8]).toBe(1);
        expect(array[10][9]).toBe(1);
    });

    it('special block flood fill stops at adjacent different-color block', async () => {
        // col 10 r9 = B — valid 2x2 at cols 8-9, flood fill reaches col 10 r8 (A) but not r9 (B)
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 1], // col 8: special A (3), regular A (1)
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // col 9: A pair completing 2x2
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 2], // col 10: r8=A (in flood fill), r9=B ← stops here
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        await prepareForDeletion(array);
        expect(array[8][8]).toBe(7);  // special A → deletion-special-A
        expect(array[8][9]).toBe(5);
        expect(array[9][8]).toBe(5);
        expect(array[9][9]).toBe(5);
        expect(array[10][8]).toBe(5); // flood fill reached the A
        expect(array[10][9]).toBe(2); // B survives — flood fill stopped here
    });

    it('special block triggers chain deletion of adjacent same-color blocks', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 1], // col 8: special A (3), regular A (1)
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // col 9: regular A pair completing 2x2
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // col 10: adjacent same-color neighbor
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        await prepareForDeletion(array);
        expect(array[8][8]).toBe(7);
        expect(array[8][9]).toBe(5);
        expect(array[9][8]).toBe(5);
        expect(array[9][9]).toBe(5);
        expect(array[10][8]).toBe(5);
        expect(array[10][9]).toBe(5);
    });

    it('group formed mid-swiper: cols behind swiper revert, cols ahead are swept', async () => {
        // Swiper is at col 9 when the 2x2 forms at cols 8-9 (flood fill reaches col 10).
        // Col 8 was already passed — its marks revert when swiper exits.
        // Cols 9 and 10 are at/ahead of swiper — they get committed as SWEEP.
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 1], // col 8: special A (3), regular A (1)
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // col 9: regular A pair completing 2x2
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // col 10: adjacent same-color neighbor
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        await prepareForDeletion(array);
        await commitColumnAsSweeping(array, 9);
        await commitColumnAsSweeping(array, 10);
        await revertUncommittedMarks(array);

        // col 8 was behind the swiper — reverts to original blocks
        expect(array[8][8]).toBe(3); // back to special A
        expect(array[8][9]).toBe(1); // back to regular A

        // cols 9 and 10 were swept — SWEEP_TYPE_A (9)
        expect(array[9][8]).toBe(9);
        expect(array[9][9]).toBe(9);
        expect(array[10][8]).toBe(9);
        expect(array[10][9]).toBe(9);
    });

    it('mixed 1+3 square is detected as color A deletion', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 3],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        await prepareForDeletion(array);
        // Special blocks (3) become 7; normal blocks (1) become 5
        expect(array[8][8]).toBe(7);
        expect(array[9][8]).toBe(5);
        expect(array[8][9]).toBe(5);
        expect(array[9][9]).toBe(7);
    });

    it('special block chains across multiple columns and marks all via flood fill', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 2
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 1], // col 3: special A + regular A (anchors 2x2)
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // col 4: regulars completing 2x2
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // col 5: chain
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // col 6: chain
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // col 7: chain end
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        await prepareForDeletion(array);

        // All chain cells get marked (special as 7, regulars as 5)
        expect(array[3][8]).toBe(7);
        expect(array[3][9]).toBe(5);
        expect(array[4][8]).toBe(5);
        expect(array[4][9]).toBe(5);
        expect(array[5][8]).toBe(5);
        expect(array[6][8]).toBe(5);
        expect(array[7][8]).toBe(5);
    });
});
