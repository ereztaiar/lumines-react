import "babel-polyfill";
import {
    markCurrentAsSweeping,
} from './index.js';

describe('markCurrentAsSweeping', () => {
    const makeGrid = (cols, rows) =>
        Array.from({ length: cols }, () => new Array(rows).fill(0));

    it('converts a deletion group whose maxX equals swiperCol to sweep types', async () => {
        const array = makeGrid(8, 10);
        array[2][8] = 5; array[2][9] = 5;
        array[3][8] = 5; array[3][9] = 5;

        await markCurrentAsSweeping(array, 3);

        expect(array[2][8]).toBe(9);
        expect(array[2][9]).toBe(9);
        expect(array[3][8]).toBe(9);
        expect(array[3][9]).toBe(9);
    });

    it('converts TYPE_B deletion group correctly', async () => {
        const array = makeGrid(8, 10);
        array[4][7] = 6; array[4][8] = 6;
        array[5][7] = 6; array[5][8] = 6;

        await markCurrentAsSweeping(array, 5);

        expect(array[4][7]).toBe(10);
        expect(array[5][8]).toBe(10);
    });

    it('converts special deletion types to their sweep counterparts', async () => {
        const array = makeGrid(8, 10);
        array[3][8] = 7; array[3][9] = 5;
        array[4][8] = 5; array[4][9] = 8;

        await markCurrentAsSweeping(array, 4);

        expect(array[3][8]).toBe(11); // SWEEP_TYPE_A_SPECIAL
        expect(array[3][9]).toBe(9);  // SWEEP_TYPE_A
        expect(array[4][8]).toBe(9);  // SWEEP_TYPE_A
        expect(array[4][9]).toBe(12); // SWEEP_TYPE_B_SPECIAL
    });

    it('does not touch a group whose maxX is ahead of the swiper', async () => {
        const array = makeGrid(8, 10);
        array[2][8] = 5; array[2][9] = 5;
        array[3][8] = 5; array[3][9] = 5;

        await markCurrentAsSweeping(array, 2); // swiperCol=2, maxX=3

        expect(array[2][8]).toBe(5);
        expect(array[3][8]).toBe(5);
    });

    it('does not touch a group already behind the swiper', async () => {
        const array = makeGrid(8, 10);
        array[1][8] = 5; array[1][9] = 5;
        array[2][8] = 5; array[2][9] = 5;

        await markCurrentAsSweeping(array, 5); // swiperCol=5, maxX=2

        expect(array[1][8]).toBe(5);
        expect(array[2][8]).toBe(5);
    });

    it('handles a multi-column group and converts all cells', async () => {
        const array = makeGrid(8, 10);
        for (let x = 1; x <= 4; x++) {
            array[x][8] = 5;
            array[x][9] = 5;
        }

        await markCurrentAsSweeping(array, 4);

        for (let x = 1; x <= 4; x++) {
            expect(array[x][8]).toBe(9);
            expect(array[x][9]).toBe(9);
        }
    });

    it('is a no-op on an empty grid', async () => {
        const array = makeGrid(6, 6);
        const snapshot = JSON.parse(JSON.stringify(array));

        await markCurrentAsSweeping(array, 3);

        expect(array).toStrictEqual(snapshot);
    });

    it('converts only the matching group when multiple groups exist', async () => {
        const array = makeGrid(8, 10);
        // Group A: maxX=3
        array[2][8] = 5; array[2][9] = 5;
        array[3][8] = 5; array[3][9] = 5;
        // Group B: maxX=6
        array[5][8] = 6; array[5][9] = 6;
        array[6][8] = 6; array[6][9] = 6;

        await markCurrentAsSweeping(array, 3);

        expect(array[2][8]).toBe(9); // group A converted
        expect(array[5][8]).toBe(6); // group B untouched
    });
});
