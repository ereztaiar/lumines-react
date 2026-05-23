import { OUT_OF_BOUNDS, DROP_DEFAULT, downOrder } from './constants.js';
import { isBeingSwept } from '../clear-blocks/predicates.js';
import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const { EMPTY } = BLOCKS_TYPES;

// When the cube is one row from the bottom a 2-step drop would overshoot; clamp
// to 1. Returns null only when both sides are past the last row (truly OOB).
// Must check both sides: a split cube can have one side at the floor while the
// other is still in the air.
function clampRateAtBottom(array, cube, rate) {
    const leftCol  = array[cube.bottomLeft.x];
    const rightCol = array[cube.bottomRight.x];
    const leftOOB  = !leftCol  || typeof leftCol[cube.bottomLeft.y   + 1] === 'undefined';
    const rightOOB = !rightCol || typeof rightCol[cube.bottomRight.y + 1] === 'undefined';
    if (leftOOB && rightOOB) return null;
    const leftNeedsClamp  = !leftCol  || typeof leftCol[cube.bottomLeft.y   + 2] === 'undefined';
    const rightNeedsClamp = !rightCol || typeof rightCol[cube.bottomRight.y + 2] === 'undefined';
    if (leftNeedsClamp || rightNeedsClamp) return DROP_DEFAULT;
    return rate;
}

// Sweeping marks are cells committed for deletion; the cube can pass through
// them as a game rule. Only solid, non-swept cells block movement.
function detectObstacles(array, cube, rate) {
    const rightVal = array[cube.bottomRight.x][cube.bottomRight.y + rate];
    const leftVal  = array[cube.bottomLeft.x][cube.bottomLeft.y + rate];
    return {
        leftBlocked:  leftVal  !== EMPTY && !isBeingSwept(leftVal),
        rightBlocked: rightVal !== EMPTY && !isBeingSwept(rightVal),
    };
}

// A blocked side stays at its current position; a free side advances by rate.
function computeDest(cube, leftBlocked, rightBlocked, rate) {
    const dest = {};
    if (rightBlocked) {
        dest.topRight    = { x: cube.topRight.x,    y: cube.topRight.y };
        dest.bottomRight = { x: cube.bottomRight.x, y: cube.bottomRight.y };
    } else {
        dest.topRight    = { x: cube.topRight.x,    y: cube.topRight.y    + rate };
        dest.bottomRight = { x: cube.bottomRight.x, y: cube.bottomRight.y + rate };
    }
    if (leftBlocked) {
        dest.topLeft    = { x: cube.topLeft.x,   y: cube.topLeft.y };
        dest.bottomLeft = { x: cube.bottomLeft.x, y: cube.bottomLeft.y };
    } else {
        dest.topLeft    = { x: cube.topLeft.x,   y: cube.topLeft.y    + rate };
        dest.bottomLeft = { x: cube.bottomLeft.x, y: cube.bottomLeft.y + rate };
    }
    return dest;
}

// Swept marks are absorbed rather than swapped: clear the source cell and write
// the cube block into the destination so the swept mark doesn't bubble upward.
function applyMoveToGrid(array, src, dest) {
    for (const block of downOrder) {
        const srcX = src[block].x, srcY = src[block].y;
        const dstX = dest[block].x, dstY = dest[block].y;
        const tmp = array[srcX][srcY];
        if (isBeingSwept(array[dstX][dstY])) {
            array[srcX][srcY] = EMPTY;
            array[dstX][dstY] = tmp;
        } else {
            array[srcX][srcY] = array[dstX][dstY];
            array[dstX][dstY] = tmp;
        }
    }
}

function moveDown(array, cube, rate = DROP_DEFAULT) {
    const src = { ...cube };
    return new Promise((resolve, reject) => {
        const clampedRate = clampRateAtBottom(array, cube, rate);
        if (clampedRate === null) {
            resolve([array, {}, OUT_OF_BOUNDS]);
            return;
        }
        rate = clampedRate;

        let dest;
        try {
            const { leftBlocked, rightBlocked } = detectObstacles(array, cube, rate);

            // Land the whole cube as a rigid unit only when both sides are level
            // and BOTH hit a solid block simultaneously. One blocked side means
            // the other is free to keep falling — that produces the split.
            if (src.bottomLeft.y === src.bottomRight.y && leftBlocked && rightBlocked) {
                resolve([array, {}, OUT_OF_BOUNDS]);
                return;
            }

            dest = computeDest(cube, leftBlocked, rightBlocked, rate);
        } catch (ex) {
            reject(ex);
            return;
        }

        applyMoveToGrid(array, src, dest);

        // Neither side actually moved — cube is fully landed.
        if (src.bottomLeft.y === dest.bottomLeft.y && src.bottomRight.y === dest.bottomRight.y) {
            resolve([array, dest, OUT_OF_BOUNDS]);
            return;
        }

        resolve([array, dest]);
    });
}

export { moveDown };
