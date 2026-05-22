import { OUT_OF_BOUNDS, DROP_DEFAULT, downOrder } from './constants.js';
import { isBeingSwept } from '../clear-blocks/predicates.js';
import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const { EMPTY } = BLOCKS_TYPES;

function moveDown(array, cube, rate = DROP_DEFAULT) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (typeof array[cube.bottomLeft.x] === 'undefined' || typeof array[cube.bottomLeft.x][cube.bottomLeft.y + 2] === 'undefined') {
            if (typeof array[cube.bottomLeft.x][cube.bottomLeft.y + 1] !== 'undefined') {
                rate = DROP_DEFAULT;
            } else {
                resolve([array, dest, OUT_OF_BOUNDS]);
                return;
            }
        }
        try {
            const rightVal = array[cube.bottomRight.x][cube.bottomRight.y + rate];
            const leftVal  = array[cube.bottomLeft.x][cube.bottomLeft.y + rate];
            const right = rightVal !== EMPTY && !isBeingSwept(rightVal);
            const left  = leftVal  !== EMPTY && !isBeingSwept(leftVal);
            if (right) {
                dest.topRight = {x: cube.topRight.x, y: cube.topRight.y};
                dest.bottomRight = {x: cube.bottomRight.x, y: cube.bottomRight.y};
            } else {
                dest.topRight = {x: cube.topRight.x, y: cube.topRight.y + rate};
                dest.bottomRight = {x: cube.bottomRight.x, y: cube.bottomRight.y + rate};
            }

            if (left) {
                dest.topLeft = {x: cube.topLeft.x, y: cube.topLeft.y};
                dest.bottomLeft = {x: cube.bottomLeft.x, y: cube.bottomLeft.y};
            } else {
                dest.topLeft = {x: cube.topLeft.x, y: cube.topLeft.y + rate};
                dest.bottomLeft = {x: cube.bottomLeft.x, y: cube.bottomLeft.y + rate};
            }

        } catch (ex) {
            reject(ex);
            return;
        }

        for (const block of downOrder) {
            const srcX = src[block].x, srcY = src[block].y;
            const dstX = dest[block].x, dstY = dest[block].y;
            const tmp = array[srcX][srcY];
            if (isBeingSwept(array[dstX][dstY])) {
                // Absorb the swept block rather than swapping: the cube passes
                // through it cleanly without bubbling swept marks to a higher row.
                array[srcX][srcY] = EMPTY;
                array[dstX][dstY] = tmp;
            } else {
                array[srcX][srcY] = array[dstX][dstY];
                array[dstX][dstY] = tmp;
            }
        }

        if (src.bottomLeft.y === dest.bottomLeft.y && src.bottomRight.y === dest.bottomRight.y) {
            resolve([array, dest, OUT_OF_BOUNDS]);
            return;
        }

        resolve([array, dest]);
    });
}

export { moveDown };
