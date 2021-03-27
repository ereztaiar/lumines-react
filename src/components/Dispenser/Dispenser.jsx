import React, {useEffect, useState, useContext} from 'react';
import generateCube, {BLOCK_ASSOCIATION, dispenseOrder} from "./dispense";
import GridItem from "../Board/GridItem";

import context from "../../context";
import {BLOCKS_TYPES} from "../Board";
import {paths} from "../../assets";

const WELL_SIZE = 3;

const CUBE_STATES = {
    NEW: 1,
    READY: 2,
    WAITING: 3,
    DROP: 4
}

const _cubes = [];
for (let i = 0; i < WELL_SIZE; i++) {
    const cube = generateCube().next().value;
    _cubes.push(cube);
}

const Dispenser = ({newCube, setNewCube, setCurrentCube}) => {

    const [cubes, setCubes] = useState(_cubes);
    const [blocks, setBlocks] = useState("");

    const render = () => {
        let html = '';
        for (let i = 0; i < cubes.length; i++) {
            let htmlCubes = '<div class="cube">';
            for (let j = 0; j < dispenseOrder.length; j++) {
                const order = dispenseOrder[j];
                const Block = cubes[i][order].Block;
                if (Block === BLOCKS_TYPES.TYPE_A) {

                    htmlCubes += `<div class="grid-item"><img src="${paths.greyBlock}"/></div>`;
                } else if (Block === BLOCKS_TYPES.TYPE_B) {
                    htmlCubes += `<div class="grid-item"><img src="${paths.orangeBlock}"/></div>`;
                }else if (Block === BLOCKS_TYPES.TYPE_A_SPECIAL) {
                    htmlCubes += `<div class="grid-item"><img src="${paths.greySpecialBlock}"/></div>`;
                }else if (Block === BLOCKS_TYPES.TYPE_B_SPECIAL) {
                    htmlCubes += `<div class="grid-item"><img src="${paths.orangeSpecialBlock}"/></div>`;
                } else {
                    htmlCubes += `<div class="grid-item"></div>`;
                }
            }
            htmlCubes += '</div>';
            html += htmlCubes;
        }
        setBlocks(html);
    }

    useEffect(() => {
        if (newCube === CUBE_STATES.NEW) {
            const cube = generateCube().next().value;
            const nextCube = cubes.shift();
            cubes.push(cube);
            setCubes([...cubes]);
            setCurrentCube(nextCube);
            setNewCube(CUBE_STATES.READY);
        }
        return () => {

        }
    }, [newCube]);

    useEffect(() => {
        render();
        return () => {

        }
    }, [cubes]);

    return (
        <div className={"dispenser grid"} dangerouslySetInnerHTML={{__html: blocks}}/>
    );
};

export default Dispenser;
export {
    WELL_SIZE,
    CUBE_STATES
}