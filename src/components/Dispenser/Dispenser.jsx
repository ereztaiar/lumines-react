import React, {useEffect, useState, useContext} from 'react';
import generateCube, {BLOCK_ASSOCIATION, dispenseOrder} from "./dispense";
import GridItem from "../Board/GridItem";

import context from "../../context";
import {BLOCKS_TYPES} from "../Board";

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

    return (
        <div className={"dispenser grid"}>
            {cubes.map((BlockItems, idx) => {

                return <div key={idx} className={"cube"}>
                    {
                        dispenseOrder.map((position, idx) => {
                            const Block = BlockItems[position].Block;
                            const key = `${position}+${idx}`;
                            let className = BLOCK_ASSOCIATION[BLOCKS_TYPES.EMPTY];
                            if (Block === BLOCKS_TYPES.TYPE_A) {
                                className = BLOCK_ASSOCIATION[BLOCKS_TYPES.TYPE_A];
                                return <GridItem key={key} className={className}/>
                            } else if (Block === BLOCKS_TYPES.TYPE_B) {
                                className = BLOCK_ASSOCIATION[BLOCKS_TYPES.TYPE_B];
                                return <GridItem key={key} className={className}/>
                            }
                            return <GridItem key={key} className={className}/>

                        })

                    }
                </div>
            })}
        </div>
    );
};

export default Dispenser;
export {
    WELL_SIZE,
    CUBE_STATES
}