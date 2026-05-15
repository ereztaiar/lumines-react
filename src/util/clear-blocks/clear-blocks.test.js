import "babel-polyfill";
import {
    clearColumn,
    clearFromDeletion,
    prepareForDeletion,
    countMarksInColumn,
    clearAllMarked,
    clearExitedGroups,
    revertUnclaimedMarks,
} from './index.js';


describe('delete set blocks', () => {
    it('proper blocks for deletion', async () => {
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

    it('remove blocks from deletion', async () => {
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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 5]

        ];
        await clearFromDeletion(array);
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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
        ]);
    });

    it('clear blocks from column', async () => {
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
            [0, 0, 0, 5, 5, 5, 2, 1, 5, 5],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 5]

        ];
        const result = await clearColumn(array, array.length - 2);
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
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 5]
        ]);
        expect(result).toEqual(5);
    });

    it('clear blocks from column', async () => {
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
            [0, 0, 0, 2, 1, 0, 2, 1, 5, 5],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 5]

        ];
        const result = await clearColumn(array, array.length - 2);
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
            [0, 0, 0, 2, 1, 0, 0, 0, 2, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 5]
        ]);
        expect(result).toEqual(2);
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
            // col 8: special block in square, col 9: regular, col 10: neighbor
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 1], // row 8: special A, regular A
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // row 9: regular A, regular A
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1], // row 9 neighbor col
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        await prepareForDeletion(array);
        // The 2x2 square at cols 8-9, rows 8-9 contains special block (type 3)
        // Special block stays type 7 (special deletion A); regular blocks become 5
        // Col 10 is adjacent → flood fill marks it too
        expect(array[8][8]).toBe(7); // was type-3 special → special deletion
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
        expect(array[8][8]).toBe(7); // was type-3 special
        expect(array[9][8]).toBe(5); // was type-1 normal
        expect(array[8][9]).toBe(5); // was type-1 normal
        expect(array[9][9]).toBe(7); // was type-3 special
    });

    it('countMarksInColumn counts 5/6/7/8 without mutating the grid', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 5, 6, 7, 8],
            [0, 0, 0, 0, 0, 0, 0, 1, 2, 3],
            [0, 0, 0, 0, 0, 0, 5, 5, 5, 5],
        ];
        const snapshot = JSON.parse(JSON.stringify(array));

        expect(await countMarksInColumn(array, 0)).toEqual(4);
        expect(await countMarksInColumn(array, 1)).toEqual(0);
        expect(await countMarksInColumn(array, 2)).toEqual(4);
        expect(array).toStrictEqual(snapshot);
    });

    it('clearAllMarked removes 5/6/7/8 across all columns with gravity, returns total count', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 5, 1, 5],
            [0, 0, 0, 0, 0, 0, 0, 0, 6, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 7, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        const total = await clearAllMarked(array);

        expect(total).toEqual(4);
        expect(array).toStrictEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]);
    });

    it('special block chains across multiple columns and clears all at once via clearAllMarked', async () => {
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

        const total = await clearAllMarked(array);

        expect(total).toEqual(7);
        // Every chain cell is now empty
        expect(array[3][8]).toBe(0);
        expect(array[3][9]).toBe(0);
        expect(array[4][8]).toBe(0);
        expect(array[4][9]).toBe(0);
        expect(array[5][8]).toBe(0);
        expect(array[6][8]).toBe(0);
        expect(array[7][8]).toBe(0);
    });

    it('clearFromDeletion reverts special deletion marks to special types', async () => {
        let array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 7, 8],
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 6],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        await clearFromDeletion(array);
        expect(array[8][8]).toBe(3); // array[8][8]=7 → type-3 special A
        expect(array[8][9]).toBe(4); // array[8][9]=8 → type-4 special B
        expect(array[9][8]).toBe(1); // array[9][8]=5 → type-1 normal A
        expect(array[9][9]).toBe(2); // array[9][9]=6 → type-2 normal B
    });

    describe('clearExitedGroups', () => {
        const makeGrid = (cols, rows) =>
            Array.from({ length: cols }, () => new Array(rows).fill(0));

        it('clears a 2x2 component when swiper exits its rightmost column', async () => {
            const array = makeGrid(8, 10);
            // 2x2 in cols 2-3, rows 8-9, all marked
            array[2][8] = 5; array[2][9] = 5;
            array[3][8] = 5; array[3][9] = 5;

            const cleared = await clearExitedGroups(array, 3);
            expect(cleared).toBe(4);
            expect(array[2][8]).toBe(0); expect(array[2][9]).toBe(0);
            expect(array[3][8]).toBe(0); expect(array[3][9]).toBe(0);
        });

        it('does not clear a component whose maxX does not match exitedCol', async () => {
            const array = makeGrid(8, 10);
            array[2][8] = 5; array[2][9] = 5;
            array[3][8] = 5; array[3][9] = 5; // maxX = 3

            const cleared = await clearExitedGroups(array, 2); // swiper exiting col 2
            expect(cleared).toBe(0);
            expect(array[3][8]).toBe(5); // group still intact
        });

        it('does not clear a late-arrival group behind the swiper', async () => {
            // group with maxX=1; swiper has moved to col 5, just exited col 4
            const array = makeGrid(8, 10);
            array[0][8] = 5; array[0][9] = 5;
            array[1][8] = 5; array[1][9] = 5;

            const cleared = await clearExitedGroups(array, 4);
            expect(cleared).toBe(0);
            expect(array[0][8]).toBe(5);
        });

        it('clears a multi-column component spanning across swiper when right edge exits', async () => {
            // chain across cols 3..6 (e.g. from a special flood-fill), all marked
            const array = makeGrid(8, 10);
            for (let x = 3; x <= 6; x++) {
                array[x][8] = 5;
                array[x][9] = 5;
            }
            // First, exiting col 5 should NOT clear (group's maxX = 6)
            let cleared = await clearExitedGroups(array, 5);
            expect(cleared).toBe(0);
            expect(array[3][8]).toBe(5);

            // Exiting col 6 (the rightmost) clears everything in one shot
            cleared = await clearExitedGroups(array, 6);
            expect(cleared).toBe(8);
            for (let x = 3; x <= 6; x++) {
                expect(array[x][8]).toBe(0);
                expect(array[x][9]).toBe(0);
            }
        });

        it('applies gravity to affected columns after clearing', async () => {
            const array = makeGrid(4, 6);
            // col 1: regular block sits on top of a marked 2x2 row
            array[1][4] = 1; // unmarked block above
            array[1][5] = 5; // marked
            array[2][4] = 1; // unmarked block above
            array[2][5] = 5; // marked
            // Form a 2x2 of marks (single component, maxX=2)
            array[1][5] = 5; array[2][5] = 5;
            array[1][4] = 1; array[2][4] = 1;
            // To make it a real 2x2 component of marks, include row 4 marks instead:
            array[1][4] = 5; array[2][4] = 5;

            const cleared = await clearExitedGroups(array, 2);
            expect(cleared).toBe(4);
            // After gravity, marked cells are gone and any remaining blocks fall to the bottom
            expect(array[1][5]).toBe(0);
            expect(array[2][5]).toBe(0);
        });

        it('clears only the matching component when multiple exist', async () => {
            const array = makeGrid(8, 10);
            // Component A: cols 1-2, maxX=2
            array[1][8] = 5; array[1][9] = 5;
            array[2][8] = 5; array[2][9] = 5;
            // Component B: cols 5-6, maxX=6
            array[5][8] = 6; array[5][9] = 6;
            array[6][8] = 6; array[6][9] = 6;

            const cleared = await clearExitedGroups(array, 2);
            expect(cleared).toBe(4);
            expect(array[1][8]).toBe(0);
            expect(array[5][8]).toBe(6); // untouched
        });

        it('treats normal and special deletion types as part of the same component', async () => {
            const array = makeGrid(8, 10);
            array[2][8] = 5; array[2][9] = 7; // special deletion mixed in
            array[3][8] = 5; array[3][9] = 5;

            const cleared = await clearExitedGroups(array, 3);
            expect(cleared).toBe(4);
            expect(array[2][9]).toBe(0);
        });
    });

    describe('revertUnclaimedMarks', () => {
        const makeGrid = (cols, rows) =>
            Array.from({ length: cols }, () => new Array(rows).fill(0));

        it('reverts all four deletion types in unvisited columns', async () => {
            const array = makeGrid(6, 4);
            array[3] = [5, 6, 7, 8];

            await revertUnclaimedMarks(array, 3);
            expect(array[3]).toEqual([1, 2, 3, 4]);
        });

        it('does not touch columns the swiper has already passed', async () => {
            const array = makeGrid(6, 4);
            array[0] = [5, 6, 7, 8];
            array[5] = [5, 6, 7, 8];

            await revertUnclaimedMarks(array, 3);
            expect(array[0]).toEqual([5, 6, 7, 8]); // locked-in
            expect(array[5]).toEqual([1, 2, 3, 4]); // reverted
        });

        it('leaves non-deletion values untouched', async () => {
            const array = makeGrid(4, 5);
            array[2] = [0, 1, 2, 3, 4];

            await revertUnclaimedMarks(array, 0);
            expect(array[2]).toEqual([0, 1, 2, 3, 4]);
        });

        it('is a no-op when swiperCol is at or beyond the grid width', async () => {
            const array = makeGrid(4, 3);
            array[3] = [5, 6, 7];
            const snapshot = JSON.parse(JSON.stringify(array));

            await revertUnclaimedMarks(array, 4);
            expect(array).toStrictEqual(snapshot);
        });
    });
});
