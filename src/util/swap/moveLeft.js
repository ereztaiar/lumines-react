import { WALL, OUT_OF_BOUNDS, leftOrder } from './constants.js';
import { isSplit } from './isSplit.js';
import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const { EMPTY } = BLOCKS_TYPES;

function moveLeft(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (isSplit(cube)) {
            resolve([array]);
            return;
        }
        if (cube.topLeft.x - 1 < 0 || cube.bottomLeft.x - 1 < 0) {
            reject(OUT_OF_BOUNDS);
            return;
        }
        if (array[cube.topLeft.x - 1][cube.topLeft.y] !== EMPTY || array[cube.bottomLeft.x - 1][cube.bottomLeft.y] !== EMPTY) {
            reject(WALL);
            return;
        }
        dest.topLeft = {x: cube.topLeft.x - 1, y: cube.topLeft.y};
        dest.bottomLeft = {x: cube.bottomLeft.x - 1, y: cube.bottomLeft.y};
        dest.topRight = {x: cube.topRight.x - 1, y: cube.topRight.y};
        dest.bottomRight = {x: cube.bottomRight.x - 1, y: cube.bottomRight.y};

        for (const block of leftOrder) {
            const tmp = array[src[block].x][src[block].y];
            array[src[block].x][src[block].y] = array[dest[block].x][dest[block].y];
            array[dest[block].x][dest[block].y] = tmp;
        }

        resolve([array, dest]);
    });
}

export { moveLeft };
