import "babel-polyfill";
import {
    prepareForDeletion,
    commitColumnAsSweeping,
    revertUncommittedMarks,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('prepareForDeletion', () => {
    it('marks only valid 2x2 same-color squares resting on the bottom', async () => {
        const array = g([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||BB|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||ABAA',
            '||||||||||||BBAA',
        ]);
        await prepareForDeletion(array);

        expect(s(array)).toStrictEqual([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||||BB|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||ABaa',
            '||||||||||||BBaa',
        ]);
    });

    it('special block does not trigger when 2x2 is mixed color', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||@AA|||||',
            '||||||||ABA|||||',
        ]);
        await prepareForDeletion(array);
        expect(array[8][8]).toBe('@');
        expect(array[8][9]).toBe('A');
        expect(array[9][8]).toBe('A');
        expect(array[9][9]).toBe('B');
        expect(array[10][8]).toBe('A');
        expect(array[10][9]).toBe('A');
    });

    it('special block flood fill stops at adjacent different-color block', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||@AA|||||',
            '||||||||AAB|||||',
        ]);
        await prepareForDeletion(array);
        expect(array[8][8]).toBe('*');
        expect(array[8][9]).toBe('a');
        expect(array[9][8]).toBe('a');
        expect(array[9][9]).toBe('a');
        expect(array[10][8]).toBe('a');
        expect(array[10][9]).toBe('B');
    });

    it('special block triggers chain deletion of adjacent same-color blocks', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||@AA|||||',
            '||||||||AAA|||||',
        ]);
        await prepareForDeletion(array);
        expect(array[8][8]).toBe('*');
        expect(array[8][9]).toBe('a');
        expect(array[9][8]).toBe('a');
        expect(array[9][9]).toBe('a');
        expect(array[10][8]).toBe('a');
        expect(array[10][9]).toBe('a');
    });

    it('group formed mid-swiper: cols behind swiper revert, cols ahead are swept', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||@AA|||||',
            '||||||||AAA|||||',
        ]);
        await prepareForDeletion(array);
        await commitColumnAsSweeping(array, 9);
        await commitColumnAsSweeping(array, 10);
        await revertUncommittedMarks(array);

        expect(array[8][8]).toBe('@');
        expect(array[8][9]).toBe('A');

        expect(array[9][8]).toBe('S');
        expect(array[9][9]).toBe('S');
        expect(array[10][8]).toBe('S');
        expect(array[10][9]).toBe('S');
    });

    it('mixed 1+3 square is detected as color A deletion', async () => {
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
            '||||||||A@||||||',
        ]);
        await prepareForDeletion(array);
        expect(array[8][8]).toBe('*');
        expect(array[9][8]).toBe('a');
        expect(array[8][9]).toBe('a');
        expect(array[9][9]).toBe('*');
    });

    it('special block chains across multiple columns and marks all via flood fill', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||@AAAA||||||||',
            '|||AA|||||||||||',
        ]);

        await prepareForDeletion(array);

        expect(array[3][8]).toBe('*');
        expect(array[3][9]).toBe('a');
        expect(array[4][8]).toBe('a');
        expect(array[4][9]).toBe('a');
        expect(array[5][8]).toBe('a');
        expect(array[6][8]).toBe('a');
        expect(array[7][8]).toBe('a');
    });
});
