import { WALL, OUT_OF_BOUNDS, leftOrder } from './constants.js';

function moveLeft(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (cube.topLeft.x - 1 < 0 || cube.bottomLeft.x - 1 < 0) {
            reject(OUT_OF_BOUNDS);
            return;
        }
        if (array[cube.topLeft.x - 1][cube.topLeft.y] !== 0 || array[cube.bottomLeft.x - 1][cube.bottomLeft.y] !== 0) {
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
