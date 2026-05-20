import "babel-polyfill";
import { clearFromDeletion } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('clearFromDeletion', () => {
    it('reverts deletion markers back to live block types', async () => {
        const array = g([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||B|||||||',
            '||||||||B|||||||',
            '||||||||||||||||',
            '||||||||||||AB|a',
            '||||||||||||BB|a',
        ]);
        await clearFromDeletion(array);
        expect(s(array)).toStrictEqual([
            '||||AA||||||||||',
            '||||AA||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||B|||||||',
            '||||||||B|||||||',
            '||||||||||||||||',
            '||||||||||||AB|A',
            '||||||||||||BB|A',
        ]);
    });

    it('reverts special deletion marks to their special block types', async () => {
        const array = g([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||*a||||||',
            '||||||||~b||||||',
        ]);
        await clearFromDeletion(array);
        expect(s(array)).toStrictEqual([
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||@A||||||',
            '||||||||%B||||||',
        ]);
    });
});
