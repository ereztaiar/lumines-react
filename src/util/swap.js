// todo: change to wasm component
const WALL = 'wall';
const OUT_OF_BOUNDS = 'out_of_bounds';
const DROP_DEFAULT = 1;
const DROP_FAST = 2;

const errors = {
    WALL,
    OUT_OF_BOUNDS
};

const DROP_RATE = {
    DROP_DEFAULT,
    DROP_FAST
};

const leftOrder = ['topLeft', 'bottomLeft', 'topRight', 'bottomRight'];
const rightOrder = ['topRight', 'bottomRight', 'topLeft', 'bottomLeft'];
const downOrder = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];

function swap(array, src, dest) {

    return new Promise((resolve, reject) => {
        const tmp = array[src.x][src.y];
        array[src.x][src.y] = array[dest.x][dest.y];
        array[dest.x][dest.y] = tmp;
        resolve([array, dest]);
    });
}

function rotate(array, cube) {
    return new Promise(async (resolve, reject) => {// todo: make single swap

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

function moveLeft(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (typeof array[cube.topLeft.x - 1] === 'undefined' || typeof array[cube.topLeft.x - 1][cube.topLeft.y] === 'undefined') {
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

function moveRight(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (typeof array[cube.topRight.x + 1] === 'undefined' || typeof array[cube.topRight.x + 1][cube.topRight.y] === 'undefined') {
            reject(OUT_OF_BOUNDS);
            return;
        }
        if (array[cube.topRight.x + 1][cube.topRight.y] !== 0) {
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

export {
    swap,
    rotate,
    moveLeft,
    moveRight,
    moveDown,
    leftOrder,
    rightOrder,
    downOrder,
    errors,
    DROP_RATE
};