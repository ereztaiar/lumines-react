import React from "react";
import Block from "../Board/block";
import GridItem from "../Board/GridItem";
import {BLOCKS_TYPES} from "../Board";


const BLOCKS = {
    EMPTY: "",
    GREY: "grey",
    ORANGE: "orange",
    DELETION_GRAY: "dark-grey",
    DELETION_ORANGE: "dark-orange"
};

const BLOCK_ASSOCIATION = {// todo:merge constants
    0: BLOCKS.EMPTY,
    1: BLOCKS.GREY,
    2: BLOCKS.ORANGE,
    5: BLOCKS.DELETION_GRAY,
    6: BLOCKS.DELETION_ORANGE

}

const CUBE_WIDTH = 2;
const CUBE_HEIGHT = CUBE_WIDTH;

const dispenseOrder = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const types = [BLOCKS_TYPES.TYPE_A, BLOCKS_TYPES.TYPE_B]; // todo: add support for spical

const randomBlock = () => {
    return Math.floor(Math.random() * types.length + 1);
}

function* generateCube() {
    const keys = Object.keys(BLOCKS);
    const initialPosition = 16 / 2 - 1;

    while (true) {
        let topLeftType = randomBlock();
        let topRightType = randomBlock();
        let bottomLeftType = randomBlock();
        let bottomRightType = randomBlock();
        let cube = {
            topLeft: {
                x: initialPosition,
                y: 0,
                Block: topLeftType
            },
            topRight: {
                x: initialPosition + 1,
                y: 0,
                Block: topRightType
            },
            bottomLeft: {
                x: initialPosition,
                y: 1,
                Block: bottomLeftType
            },
            bottomRight: {
                x: initialPosition + 1,
                y: 1,
                Block: bottomRightType
            },
        }
        yield cube;
    }
}

export default generateCube;

export {
    Block,
    dispenseOrder,
    CUBE_WIDTH,
    CUBE_HEIGHT,
    BLOCKS,
    BLOCK_ASSOCIATION
}