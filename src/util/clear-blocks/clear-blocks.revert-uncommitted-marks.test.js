import "babel-polyfill";
import { revertUncommittedMarks } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('revertUncommittedMarks', () => {
    it('reverts all four deletion types back to their plain type', async () => {
        const array = g([
            '|||a||',
            '|||b||',
            '|||*||',
            '|||~||',
        ]);

        await revertUncommittedMarks(array);
        expect(s(array)).toStrictEqual([
            '|||A||',
            '|||B||',
            '|||@||',
            '|||%||',
        ]);
    });

    it('reverts deletion marks in every column regardless of position', async () => {
        const array = g([
            'a||||a',
            'b||||b',
            '*||||*',
            '~||||~',
        ]);

        await revertUncommittedMarks(array);
        expect(s(array)).toStrictEqual([
            'A||||A',
            'B||||B',
            '@||||@',
            '%||||%',
        ]);
    });

    it('does not touch SWEEP cells', async () => {
        const array = g([
            '||S|',
            '||s|',
            '||#|',
            '||$|',
        ]);

        await revertUncommittedMarks(array);
        expect(s(array)).toStrictEqual([
            '||S|',
            '||s|',
            '||#|',
            '||$|',
        ]);
    });

    it('leaves non-deletion values untouched', async () => {
        const array = g([
            '||||',
            '||A|',
            '||B|',
            '||@|',
            '||%|',
        ]);

        await revertUncommittedMarks(array);
        expect(s(array)).toStrictEqual([
            '||||',
            '||A|',
            '||B|',
            '||@|',
            '||%|',
        ]);
    });

    it('reverts a mixed column of DELETION and SWEEP correctly', async () => {
        const array = g([
            '|a||',
            '|S||',
            '|b||',
            '|s||',
        ]);

        await revertUncommittedMarks(array);
        expect(s(array)).toStrictEqual([
            '|A||',
            '|S||',
            '|B||',
            '|s||',
        ]);
    });
});
