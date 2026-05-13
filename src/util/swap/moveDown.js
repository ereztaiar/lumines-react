import { OUT_OF_BOUNDS, DROP_DEFAULT, downOrder } from './constants.js';

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
            const right = array[cube.bottomRight.x][cube.bottomRight.y + rate] !== 0;
            const left = array[cube.bottomLeft.x][cube.bottomLeft.y + rate] !== 0;
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
            const tmp = array[src[block].x][src[block].y];
            array[src[block].x][src[block].y] = array[dest[block].x][dest[block].y];
            array[dest[block].x][dest[block].y] = tmp;
        }

        if (src.bottomLeft.y === dest.bottomLeft.y && src.bottomRight.y === dest.bottomRight.y) {
            resolve([array, dest, OUT_OF_BOUNDS]);
            return;
        }

        resolve([array, dest]);
    });
}

export { moveDown };
