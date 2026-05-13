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

export {
    WALL,
    OUT_OF_BOUNDS,
    DROP_DEFAULT,
    DROP_FAST,
    errors,
    DROP_RATE,
    leftOrder,
    rightOrder,
    downOrder
};
