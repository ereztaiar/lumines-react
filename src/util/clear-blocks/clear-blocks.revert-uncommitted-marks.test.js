import "babel-polyfill";
import { revertUncommittedMarks } from './index.js';
import { g } from '../grid-test-helpers.js';


describe('revertUncommittedMarks', () => {
    it('reverts all four deletion types back to their plain type', async () => {
        const array = g([
            '|||a||',
            '|||b||',
            '|||*||',
            '|||~||',
        ]);

        await revertUncommittedMarks(array);
        expect(array[3]).toEqual(['A', 'B', '@', '%']);
    });

    it('reverts deletion marks in every column regardless of position', async () => {
        const array = g([
            'a||||a',
            'b||||b',
            '*||||*',
            '~||||~',
        ]);

        await revertUncommittedMarks(array);
        expect(array[0]).toEqual(['A', 'B', '@', '%']);
        expect(array[5]).toEqual(['A', 'B', '@', '%']);
    });

    it('does not touch SWEEP cells', async () => {
        const array = g([
            '||S|',
            '||s|',
            '||#|',
            '||$|',
        ]);

        await revertUncommittedMarks(array);
        expect(array[2]).toEqual(['S', 's', '#', '$']);
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
        expect(array[2]).toEqual(['|', 'A', 'B', '@', '%']);
    });

    it('reverts a mixed column of DELETION and SWEEP correctly', async () => {
        const array = g([
            '|a||',
            '|S||',
            '|b||',
            '|s||',
        ]);

        await revertUncommittedMarks(array);
        expect(array[1]).toEqual(['A', 'S', 'B', 's']);
    });
});
