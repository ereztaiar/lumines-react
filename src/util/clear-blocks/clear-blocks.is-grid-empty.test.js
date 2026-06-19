import "babel-polyfill";
import { isGridEmpty } from './index.js';
import { g } from '../grid-test-helpers.js';


describe('isGridEmpty', () => {
    it('returns true for a fully empty grid', () => {
        const array = g([
            '||||',
            '||||',
            '||||',
        ]);

        expect(isGridEmpty(array)).toBe(true);
    });

    it('returns false when a stray block remains', () => {
        const array = g([
            '||||',
            '|A||',
            '||||',
        ]);

        expect(isGridEmpty(array)).toBe(false);
    });

    it('treats the live falling cube as transparent when checking for an all-clear', () => {
        const array = g([
            '||||',
            '|AA|',
            '|AA|',
        ]);

        const cube = {
            topLeft:     { x: 1, y: 1 },
            topRight:    { x: 2, y: 1 },
            bottomLeft:  { x: 1, y: 2 },
            bottomRight: { x: 2, y: 2 },
        };

        expect(isGridEmpty(array, cube)).toBe(true);
    });

    it('still returns false when a non-cube block remains alongside the live cube', () => {
        const array = g([
            '||||',
            '|AA|',
            '|AAB',
        ]);

        const cube = {
            topLeft:     { x: 1, y: 1 },
            topRight:    { x: 2, y: 1 },
            bottomLeft:  { x: 1, y: 2 },
            bottomRight: { x: 2, y: 2 },
        };

        expect(isGridEmpty(array, cube)).toBe(false);
    });

    it('defaults to no cube when the argument is omitted', () => {
        const empty = g([
            '||||',
            '||||',
        ]);
        const occupied = g([
            '||||',
            '|A||',
        ]);

        expect(isGridEmpty(empty)).toBe(true);
        expect(isGridEmpty(occupied)).toBe(false);
    });
});
