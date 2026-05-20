import "babel-polyfill";
import { getCubeAnchors, applyGravity } from './gravity.js';

const makeGrid = (cols, rows) =>
    Array.from({ length: cols }, () => new Array(rows).fill('|'));

describe('getCubeAnchors', () => {
    it('returns empty map when cube is null', () => {
        const array = makeGrid(4, 6);
        const anchors = getCubeAnchors(null, array);
        expect(anchors.size).toBe(0);
    });

    it('returns anchor rows for each cube cell column', () => {
        const array = makeGrid(4, 6);
        array[1][2] = 'A';
        array[2][2] = 'B';
        array[1][3] = 'A';
        array[2][3] = 'B';
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
        // getCubeAnchors skips cells where array value is '|' (EMPTY)
        const array = makeGrid(4, 6);
        array[1][2] = 'A';
        // array[1][3] intentionally left EMPTY — bottomLeft position vacant
        const cube = {
            topLeft:    { x: 1, y: 2 },
            topRight:   { x: 2, y: 2 },
            bottomLeft: { x: 1, y: 3 },
            bottomRight:{ x: 2, y: 3 },
        };
        const anchors = getCubeAnchors(cube, array);
        // col 1: only row 2 has a block; row 3 is EMPTY so skipped
        expect(anchors.get(1)).toEqual(new Set([2]));
    });

    it('does not include a column entry when all its cells are EMPTY', () => {
        const array = makeGrid(4, 6);
        // col 2 cells are all EMPTY
        array[1][2] = 'A';
        array[1][3] = 'A';
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
        const array = makeGrid(4, 6);
        array[1] = ['|', 'A', '|', 'B', '|', '|'];
        applyGravity(array, new Set([1]));
        expect(array[1]).toEqual(['|', '|', '|', '|', 'A', 'B']);
    });

    it('leaves a fully packed column unchanged', () => {
        const array = makeGrid(4, 4);
        array[2] = ['A', 'B', 'A', 'B'];
        applyGravity(array, new Set([2]));
        expect(array[2]).toEqual(['A', 'B', 'A', 'B']);
    });

    it('leaves an all-EMPTY column as all-EMPTY', () => {
        const array = makeGrid(4, 4);
        applyGravity(array, new Set([3]));
        expect(array[3]).toEqual(['|', '|', '|', '|']);
    });

    it('does not touch columns not in affectedCols', () => {
        const array = makeGrid(4, 4);
        array[0] = ['A', '|', '|', '|'];
        array[2] = ['|', 'A', '|', '|'];
        applyGravity(array, new Set([2]));
        expect(array[0]).toEqual(['A', '|', '|', '|']); // untouched
        expect(array[2]).toEqual(['|', '|', '|', 'A']); // compacted
    });

    it('pins an anchor row and compacts above-anchor blocks toward it', () => {
        // col: ['A', '|', anchor, '|', '|', '|']  anchor at row 2
        // blocks above anchor (rows 0-1) compact toward row 1 (the slot above anchor)
        // blocks below anchor (rows 3-5) compact to bottom
        const array = makeGrid(4, 6);
        array[1] = ['A', '|', 'B', '|', '|', '|']; // row 2 is anchor
        const anchors = new Map([[1, new Set([2])]]);
        applyGravity(array, new Set([1]), anchors);
        // anchor stays at row 2
        expect(array[1][2]).toBe('B');
        // the block from row 0 falls to row 1 (fills the slot just above the anchor)
        expect(array[1][1]).toBe('A');
        expect(array[1][0]).toBe('|');
        // nothing below anchor
        expect(array[1][3]).toBe('|');
        expect(array[1][4]).toBe('|');
        expect(array[1][5]).toBe('|');
    });

    it('compacts sub-anchor blocks to the bottom', () => {
        // col: ['|', '|', anchor, 'A', '|', '|']  anchor at row 2, block at row 3
        const array = makeGrid(4, 6);
        array[1] = ['|', '|', 'B', 'A', '|', '|'];
        const anchors = new Map([[1, new Set([2])]]);
        applyGravity(array, new Set([1]), anchors);
        expect(array[1][2]).toBe('B'); // anchor stays
        expect(array[1][5]).toBe('A'); // sub-anchor block falls to bottom
        expect(array[1][3]).toBe('|');
        expect(array[1][4]).toBe('|');
    });

    it('handles two anchors: each segment compacts independently', () => {
        // col: ['A', '|', anchor1, 'B', '|', anchor2, '@', '|']
        // seg 0-1 → compact toward row 1 (above anchor1 at row 2)
        // seg 3-4 → compact toward row 4 (above anchor2 at row 5)
        // seg 6-7 → compact to bottom
        const array = makeGrid(4, 8);
        array[0] = ['A', '|', 'S', 'B', '|', 's', '@', '|'];
        const anchors = new Map([[0, new Set([2, 5])]]);
        applyGravity(array, new Set([0]), anchors);
        expect(array[0][2]).toBe('S');  // first anchor
        expect(array[0][5]).toBe('s'); // second anchor
        expect(array[0][1]).toBe('A');  // block from row 0 falls to row 1 (just above anchor)
        expect(array[0][0]).toBe('|');
        expect(array[0][4]).toBe('B');  // block from row 3 falls to row 4 (just above anchor)
        expect(array[0][3]).toBe('|');
        expect(array[0][7]).toBe('@');  // sub-last-anchor block falls to bottom
        expect(array[0][6]).toBe('|');
    });
});
