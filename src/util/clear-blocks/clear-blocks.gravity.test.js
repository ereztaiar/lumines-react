import "babel-polyfill";
import { getCubeAnchors, applyGravity } from './gravity.js';

const makeGrid = (cols, rows) =>
    Array.from({ length: cols }, () => new Array(rows).fill(0));

describe('getCubeAnchors', () => {
    it('returns empty map when cube is null', () => {
        const array = makeGrid(4, 6);
        const anchors = getCubeAnchors(null, array);
        expect(anchors.size).toBe(0);
    });

    it('returns anchor rows for each cube cell column', () => {
        const array = makeGrid(4, 6);
        array[1][2] = 1;
        array[2][2] = 2;
        array[1][3] = 1;
        array[2][3] = 2;
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
        // getCubeAnchors skips cells where array value is 0 (EMPTY)
        const array = makeGrid(4, 6);
        array[1][2] = 1;
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
        array[1][2] = 1;
        array[1][3] = 1;
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
        array[1] = [0, 1, 0, 2, 0, 0];
        applyGravity(array, new Set([1]));
        expect(array[1]).toEqual([0, 0, 0, 0, 1, 2]);
    });

    it('leaves a fully packed column unchanged', () => {
        const array = makeGrid(4, 4);
        array[2] = [1, 2, 1, 2];
        applyGravity(array, new Set([2]));
        expect(array[2]).toEqual([1, 2, 1, 2]);
    });

    it('leaves an all-EMPTY column as all-EMPTY', () => {
        const array = makeGrid(4, 4);
        applyGravity(array, new Set([3]));
        expect(array[3]).toEqual([0, 0, 0, 0]);
    });

    it('does not touch columns not in affectedCols', () => {
        const array = makeGrid(4, 4);
        array[0] = [1, 0, 0, 0];
        array[2] = [0, 1, 0, 0];
        applyGravity(array, new Set([2]));
        expect(array[0]).toEqual([1, 0, 0, 0]); // untouched
        expect(array[2]).toEqual([0, 0, 0, 1]); // compacted
    });

    it('pins an anchor row and compacts above-anchor blocks toward it', () => {
        // col: [1, 0, A, 0, 0, 0]  anchor at row 2 (A)
        // blocks above anchor (rows 0-1) compact toward row 1 (the slot above anchor)
        // blocks below anchor (rows 3-5) compact to bottom
        const array = makeGrid(4, 6);
        array[1] = [1, 0, 2, 0, 0, 0]; // row 2 is anchor
        const anchors = new Map([[1, new Set([2])]]);
        applyGravity(array, new Set([1]), anchors);
        // anchor stays at row 2
        expect(array[1][2]).toBe(2);
        // the block from row 0 falls to row 1 (fills the slot just above the anchor)
        expect(array[1][1]).toBe(1);
        expect(array[1][0]).toBe(0);
        // nothing below anchor
        expect(array[1][3]).toBe(0);
        expect(array[1][4]).toBe(0);
        expect(array[1][5]).toBe(0);
    });

    it('compacts sub-anchor blocks to the bottom', () => {
        // col: [0, 0, A, 1, 0, 0]  anchor at row 2, block at row 3
        const array = makeGrid(4, 6);
        array[1] = [0, 0, 2, 1, 0, 0];
        const anchors = new Map([[1, new Set([2])]]);
        applyGravity(array, new Set([1]), anchors);
        expect(array[1][2]).toBe(2); // anchor stays
        expect(array[1][5]).toBe(1); // sub-anchor block falls to bottom
        expect(array[1][3]).toBe(0);
        expect(array[1][4]).toBe(0);
    });

    it('handles two anchors: each segment compacts independently', () => {
        // col: [1, 0, A1, 2, 0, A2, 3, 0]
        // seg 0-1 → compact toward row 1 (above A1 at row 2)
        // seg 3-4 → compact toward row 4 (above A2 at row 5)
        // seg 6-7 → compact to bottom
        const array = makeGrid(4, 8);
        array[0] = [1, 0, 9, 2, 0, 10, 3, 0];
        const anchors = new Map([[0, new Set([2, 5])]]);
        applyGravity(array, new Set([0]), anchors);
        expect(array[0][2]).toBe(9);  // first anchor
        expect(array[0][5]).toBe(10); // second anchor
        expect(array[0][1]).toBe(1);  // block from row 0 falls to row 1 (just above anchor)
        expect(array[0][0]).toBe(0);
        expect(array[0][4]).toBe(2);  // block from row 3 falls to row 4 (just above anchor)
        expect(array[0][3]).toBe(0);
        expect(array[0][7]).toBe(3);  // sub-last-anchor block falls to bottom
        expect(array[0][6]).toBe(0);
    });
});
