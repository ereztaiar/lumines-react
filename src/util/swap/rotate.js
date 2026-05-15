import { isSplit } from './isSplit.js';

function rotate(array, cube) {
    return new Promise(async (resolve, reject) => {
        if (isSplit(cube)) {
            resolve([array]);
            return;
        }

        const tmp = array[cube.topLeft.x][cube.topLeft.y];
        array[cube.topLeft.x][cube.topLeft.y] =
            array[cube.topRight.x][cube.topRight.y];
        array[cube.topRight.x][cube.topRight.y] =
            array[cube.bottomRight.x][cube.bottomRight.y];
        array[cube.bottomRight.x][cube.bottomRight.y] =
            array[cube.bottomLeft.x][cube.bottomLeft.y];
        array[cube.bottomLeft.x][cube.bottomLeft.y] =
            tmp;

        resolve([array]);
    });
}

export { rotate };
