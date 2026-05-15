import "babel-polyfill";
import {
    prepareForDeletion,
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
        // The 2x2 at cols 8-9, rows 8-9 contains special block (type 3)
        // Special block becomes type 7; regular blocks become 5
        // Col 10 is adjacent → flood fill marks it too
        expect(array[8][8]).toBe(7);
        expect(array[9][8]).toBe(5);
        expect(array[8][9]).toBe(5);
        expect(array[9][9]).toBe(5);
        expect(array[10][8]).toBe(5);
        expect(array[10][9]).toBe(5);
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
