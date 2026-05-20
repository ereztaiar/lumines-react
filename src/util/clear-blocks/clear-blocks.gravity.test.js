import "babel-polyfill";
import { getCubeAnchors, applyGravity } from './gravity.js';
import { g } from '../grid-test-helpers.js';

describe('getCubeAnchors', () => {
    it('returns empty map when cube is null', () => {
        const array = g(['||||||', '||||||', '||||||', '||||||']);
        const anchors = getCubeAnchors(null, array);
        expect(anchors.size).toBe(0);
    });

    it('returns anchor rows for each cube cell column', () => {
        const array = g([
            '||||',
            '||||',
            '|AB|',
            '|AB|',
            '||||',
            '||||',
        ]);
        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };
        const anchors = getCubeAnchors(cube, array);
        expect(anchors.get(1)).toEqual(new Set([2, 3]));
        expect(anchors.get(2)).toEqual(new Set([2, 3]));
    });

    it('skips cube cells whose grid position is EMPTY', () => {
        const array = g([
            '||||',
            '||||',
            '|A||',
            '||||',
            '||||',
            '||||',
        ]);
        const cube = {
            topLeft:    { x: 1, y: 2 },
            topRight:   { x: 2, y: 2 },
            bottomLeft: { x: 1, y: 3 },
            bottomRight:{ x: 2, y: 3 },
        };
        const anchors = getCubeAnchors(cube, array);
        expect(anchors.get(1)).toEqual(new Set([2]));
    });

    it('does not include a column entry when all its cells are EMPTY', () => {
        const array = g([
            '||||',
            '||||',
            '|A||',
            '|A||',
            '||||',
            '||||',
        ]);
        const cube = {
            topLeft:     { x: 1, y: 2 },
            topRight:    { x: 2, y: 2 },
            bottomLeft:  { x: 1, y: 3 },
            bottomRight: { x: 2, y: 3 },
        };
        const anchors = getCubeAnchors(cube, array);
        expect(anchors.has(2)).toBe(false);
    });
});

describe('applyGravity', () => {
    it('compacts non-EMPTY cells to the bottom when no anchors', () => {
        const array = g([
            '||||',
            '|A||',
            '||||',
            '|B||',
            '||||',
            '||||',
        ]);
        applyGravity(array, new Set([1]));
        expect(array[1]).toEqual(['|', '|', '|', '|', 'A', 'B']);
    });

    it('leaves a fully packed column unchanged', () => {
        const array = g([
            '||A|',
            '||B|',
            '||A|',
            '||B|',
        ]);
        applyGravity(array, new Set([2]));
        expect(array[2]).toEqual(['A', 'B', 'A', 'B']);
    });

    it('leaves an all-EMPTY column as all-EMPTY', () => {
        const array = g([
            '||||',
            '||||',
            '||||',
            '||||',
        ]);
        applyGravity(array, new Set([3]));
        expect(array[3]).toEqual(['|', '|', '|', '|']);
    });

    it('does not touch columns not in affectedCols', () => {
        const array = g([
            'A|||',
            '||A|',
            '||||',
            '||||',
        ]);
        applyGravity(array, new Set([2]));
        expect(array[0]).toEqual(['A', '|', '|', '|']);
        expect(array[2]).toEqual(['|', '|', '|', 'A']);
    });

    it('pins an anchor row and compacts above-anchor blocks toward it', () => {
        const array = g([
            '|A||',
            '||||',
            '|B||',
            '||||',
            '||||',
            '||||',
        ]);
        const anchors = new Map([[1, new Set([2])]]);
        applyGravity(array, new Set([1]), anchors);
        expect(array[1][2]).toBe('B');
        expect(array[1][1]).toBe('A');
        expect(array[1][0]).toBe('|');
        expect(array[1][3]).toBe('|');
        expect(array[1][4]).toBe('|');
        expect(array[1][5]).toBe('|');
    });

    it('compacts sub-anchor blocks to the bottom', () => {
        const array = g([
            '||||',
            '||||',
            '|B||',
            '|A||',
            '||||',
            '||||',
        ]);
        const anchors = new Map([[1, new Set([2])]]);
        applyGravity(array, new Set([1]), anchors);
        expect(array[1][2]).toBe('B');
        expect(array[1][5]).toBe('A');
        expect(array[1][3]).toBe('|');
        expect(array[1][4]).toBe('|');
    });

    it('handles two anchors: each segment compacts independently', () => {
        const array = g([
            'A|||',
            '||||',
            'S|||',
            'B|||',
            '||||',
            's|||',
            '@|||',
            '||||',
        ]);
        const anchors = new Map([[0, new Set([2, 5])]]);
        applyGravity(array, new Set([0]), anchors);
        expect(array[0][2]).toBe('S');
        expect(array[0][5]).toBe('s');
        expect(array[0][1]).toBe('A');
        expect(array[0][0]).toBe('|');
        expect(array[0][4]).toBe('B');
        expect(array[0][3]).toBe('|');
        expect(array[0][7]).toBe('@');
        expect(array[0][6]).toBe('|');
    });
});
