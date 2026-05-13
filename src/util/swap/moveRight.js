import { WALL, OUT_OF_BOUNDS, rightOrder } from './constants.js';

function moveRight(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (cube.topRight.x + 1 >= array.length || cube.bottomRight.x + 1 >= array.length) {
            reject(OUT_OF_BOUNDS);
            return;
        }
        if (array[cube.topRight.x + 1][cube.topRight.y] !== 0 || array[cube.bottomRight.x + 1][cube.bottomRight.y] !== 0) {
            reject(WALL);
            return;
        }
        dest.topLeft = {x: cube.topLeft.x + 1, y: cube.topLeft.y};
        dest.bottomLeft = {x: cube.bottomLeft.x + 1, y: cube.bottomLeft.y};
        dest.topRight = {x: cube.topRight.x + 1, y: cube.topRight.y};
        dest.bottomRight = {x: cube.bottomRight.x + 1, y: cube.bottomRight.y};

        for (const block of rightOrder) {
            const tmp = array[src[block].x][src[block].y];
            array[src[block].x][src[block].y] = array[dest[block].x][dest[block].y];
            array[dest[block].x][dest[block].y] = tmp;
        }

        resolve([array, dest]);
    });
}

export { moveRight };
