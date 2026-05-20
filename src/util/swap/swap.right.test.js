import "babel-polyfill";
import { errors, moveRight } from './index.js';
import { g, s } from '../grid-test-helpers.js';


describe('move block right', () => {
    it('move block from center', async () => {
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
        await moveRight(array, cube);

        expect(s(array)).toStrictEqual([
            '||||||||AA||||||',
            '||||||||BB||||||',
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

    it('move block next to left wall', async () => {
        const array = g([
            'AA||||||||||||||',
            'BB||||||||||||||',
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
            topLeft:     { x: 0, y: 0 },
            topRight:    { x: 1, y: 0 },
            bottomLeft:  { x: 0, y: 1 },
            bottomRight: { x: 1, y: 1 },
        };
        await moveRight(array, cube);

        expect(s(array)).toStrictEqual([
            '|AA|||||||||||||',
            '|BB|||||||||||||',
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

    it('fail move block next to right wall', async () => {
        const input = [
            '||||||||||||||AA',
            '||||||||||||||BB',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
        ];
        const array = g(input);
        const cube = {
            topLeft:     { x: 14, y: 0 },
            topRight:    { x: 15, y: 0 },
            bottomLeft:  { x: 14, y: 1 },
            bottomRight: { x: 15, y: 1 },
        };

        await moveRight(array, cube).catch(e => {
            expect(e).toEqual(errors.OUT_OF_BOUNDS);
            expect(s(array)).toStrictEqual(input);
        });
    });

    it('fail move block next to right column', async () => {
        const input = [
            '||||||||||||||||',
            '||||||||||||||||',
            '||AA||||||||||||',
            '||BB@|||||||||||',
            '||||@%||||||||||',
            '||||@@||||||||||',
            '||||@@||||||||||',
            '||||%%||||||||||',
            '||||%%||||||||||',
            '||||%%||||||||||',
        ];
        const array = g(input);
        const cube = {
            topLeft:     { x: 2, y: 2 },
            topRight:    { x: 3, y: 2 },
            bottomLeft:  { x: 2, y: 3 },
            bottomRight: { x: 3, y: 3 },
        };

        await moveRight(array, cube).catch(e => {
            expect(e).toEqual(errors.WALL);
            expect(s(array)).toStrictEqual(input);
        });
    });

    it('fail move block next to right column 2', async () => {
        const input = [
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||||||||||||',
            '||AB@|||||||||||',
            '||AB@%||||||||||',
            '||||@@||||||||||',
            '||||@@||||||||||',
            '||||%%||||||||||',
            '||||%%||||||||||',
            '||||%%||||||||||',
        ];
        const array = g(input);
        const cube = {
            topLeft:     { x: 2, y: 3 },
            topRight:    { x: 3, y: 3 },
            bottomLeft:  { x: 2, y: 4 },
            bottomRight: { x: 3, y: 4 },
        };

        await moveRight(array, cube).catch(e => {
            expect(e).toEqual(errors.WALL);
            expect(s(array)).toStrictEqual(input);
        });
    });

    // NOTE: layout mirrors the "fail rotate block right broken" case in swap.rotate.test.js.
    it('no-op when cube is split', async () => {
        const input = [
            '||||||||||||||||',
            '||||||||||||||||',
            '||||||A|||||||||',
            '||||||A|||||||||',
            '||||||@B||||||||',
            '||||||@B||||||||',
            '||||||@|||||||||',
            '||||||@|||||||||',
            '||||||@|||||||||',
            '||||||@|||||||||',
        ];
        const array = g(input);
        const cube = {
            topLeft:     { x: 6, y: 2 },
            topRight:    { x: 7, y: 4 },
            bottomLeft:  { x: 6, y: 3 },
            bottomRight: { x: 7, y: 5 },
        };

        await moveRight(array, cube);

        expect(s(array)).toStrictEqual(input);
    });
});
