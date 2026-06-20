import "babel-polyfill";
import { rotate } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('rotate block', () => {
    it('rotate block right', async () => {
        const array = g([
            '|||||||AA|||||||',
            '|||||||BB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
        const cube = {
            topLeft:     { x: 7, y: 0 },
            topRight:    { x: 8, y: 0 },
            bottomLeft:  { x: 7, y: 1 },
            bottomRight: { x: 8, y: 1 },
        };
        await rotate(array, cube);

        expect(s(array)).toStrictEqual([
            '|||||||AB|||||||',
            '|||||||AB|||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ]);
    });

    it('fail rotate block right broken', async () => {
        const input = [
            '||||||||||||||||',
            '||||||||||||||||',
            '|||||%A|||||||||',
            '|||||%A|||||||||',
            '|||||%@B||||||||',
            '|||||%@B||||||||',
            '|||||%@|||||||||',
            '|||||%@|||||||||',
            '|||||%@|||||||||',
            '|||||%@|||||||||',
        ];
        const array = g(input);
        const cube = {
            topLeft:     { x: 6, y: 2 },
            topRight:    { x: 7, y: 4 },
            bottomLeft:  { x: 6, y: 3 },
            bottomRight: { x: 7, y: 5 },
        };
        await rotate(array, cube);

        expect(s(array)).toStrictEqual(input);
    });
});
