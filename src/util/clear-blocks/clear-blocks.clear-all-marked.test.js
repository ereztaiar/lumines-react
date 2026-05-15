import "babel-polyfill";
import {
    prepareForDeletion,
    clearAllMarked,
} from './index.js';


describe('clearAllMarked', () => {
    it('removes deletion-marked blocks across all columns with gravity and returns total count', async () => {
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

    it('clears an entire special flood-fill chain in one shot', async () => {
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

        expect(array[3][8]).toBe(7);
        expect(array[3][9]).toBe(5);
        expect(array[4][8]).toBe(5);
        expect(array[4][9]).toBe(5);
        expect(array[5][8]).toBe(5);
        expect(array[6][8]).toBe(5);
        expect(array[7][8]).toBe(5);

        const total = await clearAllMarked(array);

        expect(total).toEqual(7);
        expect(array[3][8]).toBe(0);
        expect(array[3][9]).toBe(0);
        expect(array[4][8]).toBe(0);
        expect(array[4][9]).toBe(0);
        expect(array[5][8]).toBe(0);
        expect(array[6][8]).toBe(0);
        expect(array[7][8]).toBe(0);
    });
});
