// todo: change to wasm component
const WALL = 'wall';
const OUT_OF_BOUNDS = 'out_of_bounds';

const errors = {
    WALL,
    OUT_OF_BOUNDS
}

const leftOrder = ['topLeft', 'bottomLeft', 'topRight', 'bottomRight'];
const rightOrder = ['topRight', 'bottomRight', 'topLeft', 'bottomLeft'];
const downOrder = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];

function swap(array, src, dest) {

    return new Promise((resolve, reject) => {
        const tmp = array[src.x][src.y];
        array[src.x][src.y] = array[dest.x][dest.y];
        array[dest.x][dest.y] = tmp;
        resolve();
    });
}

function rotate(array, cube) {
    return new Promise(async (resolve, reject) => {// todo: make single swap
        await swap(array, cube.topLeft, cube.bottomLeft);
        await swap(array, cube.topRight, cube.bottomRight);
        await swap(array, cube.topLeft, cube.bottomRight);

        resolve();
    });
}

function moveLeft(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (typeof array[cube.topLeft.x - 1] === 'undefined' || typeof array[cube.topLeft.x - 1][cube.topLeft.y] === 'undefined') {
            reject(OUT_OF_BOUNDS);
        }
        if (array[cube.topLeft.x - 1][cube.topLeft.y] !== 0) {
            reject(WALL);
        }
        dest.topLeft = {x: cube.topLeft.x - 1, y: cube.topLeft.y};
        dest.bottomLeft = {x: cube.bottomLeft.x - 1, y: cube.bottomLeft.y};
        dest.topRight = {x: cube.topRight.x - 1, y: cube.topRight.y};
        dest.bottomRight = {x: cube.bottomRight.x - 1, y: cube.bottomRight.y};

        resolve([src, dest]);
    });
}

function moveRight(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (typeof array[cube.topRight.x + 1] === 'undefined' || typeof array[cube.topRight.x + 1][cube.topRight.y] === 'undefined') {
            reject(OUT_OF_BOUNDS);
        }
        if (array[cube.topRight.x + 1][cube.topRight.y] !== 0) {
            reject(WALL);
        }
        dest.topLeft = {x: cube.topLeft.x + 1, y: cube.topLeft.y};
        dest.bottomLeft = {x: cube.bottomLeft.x + 1, y: cube.bottomLeft.y};
        dest.topRight = {x: cube.topRight.x + 1, y: cube.topRight.y};
        dest.bottomRight = {x: cube.bottomRight.x + 1, y: cube.bottomRight.y};

        resolve([src, dest]);
    });
}

function moveDown(array, cube) {
    const src = {...cube};
    const dest = {};
    return new Promise((resolve, reject) => {
        if (typeof array[cube.bottomLeft.x] === 'undefined' || typeof array[cube.bottomLeft.x][cube.bottomLeft.y + 1] === 'undefined') {
            resolve([src, dest, OUT_OF_BOUNDS]);
        }
        try {
            const right = array[cube.bottomRight.x][cube.bottomRight.y + 1] !== 0;
            const left = array[cube.bottomLeft.x][cube.bottomLeft.y + 1] !== 0;
            if (right) {
                dest.topRight = {x: cube.topRight.x, y: cube.topRight.y};
                dest.bottomRight = {x: cube.bottomRight.x, y: cube.bottomRight.y};
            } else {
                dest.topRight = {x: cube.topRight.x, y: cube.topRight.y + 1};
                dest.bottomRight = {x: cube.bottomRight.x, y: cube.bottomRight.y + 1};
            }

            if (left) {
                dest.topLeft = {x: cube.topLeft.x, y: cube.topLeft.y};
                dest.bottomLeft = {x: cube.bottomLeft.x, y: cube.bottomLeft.y};
            } else {
                dest.topLeft = {x: cube.topLeft.x, y: cube.topLeft.y + 1};
                dest.bottomLeft = {x: cube.bottomLeft.x, y: cube.bottomLeft.y + 1};
            }

        } catch (ex) {
            reject(ex);
        }

        if(src.bottomLeft.y === dest.bottomLeft.y && src.bottomRight.y === dest.bottomRight.y){
            resolve([src, dest, OUT_OF_BOUNDS]);
        }

        resolve([src, dest]);
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
    errors
};