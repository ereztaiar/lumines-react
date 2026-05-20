import "babel-polyfill";
import {
    prepareForDeletion,
    clearAllMarked,
} from './index.js';


describe('clearAllMarked', () => {
    it('removes deletion-marked blocks across all columns with gravity and returns total count', async () => {
        let array = [
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', 'a', 'A', 'a'],
            ['|', '|', '|', '|', '|', '|', '|', '|', 'b', 'B'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '*', 'A'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
        ];

        const total = await clearAllMarked(array);

        expect(total).toEqual(4);
        expect(array).toStrictEqual([
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', 'A'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', 'B'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', 'A'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
        ]);
    });

    it('clears an entire special flood-fill chain in one shot', async () => {
        let array = [
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'], // col 0
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'], // col 1
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'], // col 2
            ['|', '|', '|', '|', '|', '|', '|', '|', '@', 'A'], // col 3: special A + regular A (anchors 2x2)
            ['|', '|', '|', '|', '|', '|', '|', '|', 'A', 'A'], // col 4: regulars completing 2x2
            ['|', '|', '|', '|', '|', '|', '|', '|', 'A', '|'], // col 5: chain
            ['|', '|', '|', '|', '|', '|', '|', '|', 'A', '|'], // col 6: chain
            ['|', '|', '|', '|', '|', '|', '|', '|', 'A', '|'], // col 7: chain end
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'], // col 8
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
            ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
        ];

        await prepareForDeletion(array);

        expect(array[3][8]).toBe('*');
        expect(array[3][9]).toBe('a');
        expect(array[4][8]).toBe('a');
        expect(array[4][9]).toBe('a');
        expect(array[5][8]).toBe('a');
        expect(array[6][8]).toBe('a');
        expect(array[7][8]).toBe('a');

        const total = await clearAllMarked(array);

        expect(total).toEqual(7);
        expect(array[3][8]).toBe('|');
        expect(array[3][9]).toBe('|');
        expect(array[4][8]).toBe('|');
        expect(array[4][9]).toBe('|');
        expect(array[5][8]).toBe('|');
        expect(array[6][8]).toBe('|');
        expect(array[7][8]).toBe('|');
    });
});
