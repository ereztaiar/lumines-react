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
        expect(s(array)).toStrictEqual([
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
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||*aX|||||',
            '||||||||aaB|||||',
        ]);
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
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||*aa|||||',
            '||||||||aaa|||||',
        ]);
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

        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||@SS|||||',
            '||||||||ASS|||||',
        ]);
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
            '||||||||a*||||||',
        ]);
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

        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '|||*aXXX||||||||',
            '|||aa|||||||||||',
        ]);
    });

    it('B-color 2x2 is marked with b (dense grid)', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            'AABBAABB||||AABB',
            'AABBAABB||||AABB',
            'AABBAABB||||AABB',
            'AABBAABB||||AABB',
            'AABBBBBB||||AABB',
            'AABBBBBB||||AABB',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            'aabbaabb||||aabb',
            'aabbaabb||||aabb',
            'aabbaabb||||aabb',
            'aabbaabb||||aabb',
            'aabbbbbb||||aabb',
            'aabbbbbb||||aabb',
        ])
    });

    it('B-type special percent flood-fills connected B-color blocks (dense grid)', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            'ABBAABBA||||||||',
            'ABBAABBA||||||||',
            'ABBAABBA||||||||',
            'ABBAABBA||||||||',
            'ABBAABBA||||||||',
            'ABBA%BBB||||||||',
            'ABBABBBB||||||||',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toMatchSnapshot();
    });

    it('multiple independent A and B groups on same grid are all marked (dense grid)', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            'AABB||||BBAA||||',
            'AABB||||BBAA||||',
            'AABB||||BBAA||||',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toMatchSnapshot();
    });

    it('A-over-B stacked groups are both marked (dense grid)', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'BBAABBAABBAABBAA',
            'BBAABBAABBAABBAA',
            'BBAABBAABBAABBAA',
            'BBAABBAABBAABBAA',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toMatchSnapshot();
    });

    it('3-wide same-color column (overlapping 2x2s) marks all cells (dense grid)', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||AABB||||BBAA',
            '||||AABB||||BBAA',
            '||||AABB||||BBAA',
            'AAAABBBBAAAABBBB',
            'AAAABBBBAAAABBBB',
            'AAAABBBBAAAABBBB',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toMatchSnapshot();
    });

    it('calling prepareForDeletion twice gives the same result (dense grid)', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
        ]);
        await prepareForDeletion(array);
        const afterFirst = s(array);
        await prepareForDeletion(array);
        expect(s(array)).toStrictEqual(afterFirst);
    });

    it('special flood fill extends upward through a column of same-color blocks (dense grid)', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||ABBA||||||||',
            '||||ABBA||||||||',
            '||||ABBA||||||||',
            'ABBAABBAABBA||||',
            'ABBAABBAABBA||||',
            'ABBA@ABAABBA||||',
            'ABBAAAAABBA|||||',
            'ABBAAAAABBA|||||',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toMatchSnapshot();
    });

    it('floating 2x2 with empty below both columns is not marked (dense rest of grid)', async () => {
        const array = g([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||AABB||||',
            '||||||||AABB||||',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
            'AABBAABBAABBAABB',
        ]);
        await prepareForDeletion(array);
        expect(s(array)).toMatchSnapshot();
    });
});
