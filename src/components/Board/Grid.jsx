import React, {useEffect, useState} from 'react';
import Swiper from "../Swiper";
import {COLUMNS, READY_GRID, ROWS, BLOCKS_TYPES} from "./index";
import GridItem from "./GridItem";
import {BLOCK_ASSOCIATION} from "../Dispenser";


const Grid = ({grid, rowStart = 0, showSwiper = true, tick = 0, deleted}) => {


    const [blocks, setBlocks] = useState([]);
    const render = () => {


        const tickRows = [];
        for (let y = rowStart; y < ROWS + READY_GRID; y++) {
            const tickColumns = [];
            for (let x = 0; x < COLUMNS; x++) {
                const key = `${x}-${y}`;

                let className = BLOCK_ASSOCIATION[BLOCKS_TYPES.EMPTY];
                if (grid[x][y] === BLOCKS_TYPES.TYPE_A) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.TYPE_A];
                    tickColumns.push( <GridItem key={key} className={className}/>)
                } else if (grid[x][y] === BLOCKS_TYPES.TYPE_B) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.TYPE_B];
                    tickColumns.push( <GridItem key={key} className={className}/>)
                }else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_A) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.DELETION_TYPE_A];
                    tickColumns.push( <GridItem key={key} className={className}/>)
                }
                else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_B) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.DELETION_TYPE_B];
                    tickColumns.push( <GridItem key={key} className={className}/>)
                }else {
                    tickColumns.push(<GridItem key={key} className={className}/>)
                }
            }
            tickRows.push(<div key={`row-${y}`} className={`row-${y}`}>{tickColumns}</div>);

        }

        setBlocks(tickRows);
    };


    useEffect(() => {
        render()
        return () => {

        }
    }, [grid])


    return (
        <div className="board">
            <div className="grid">
                {blocks}
            </div>
                {showSwiper && <Swiper tick={tick} score={true} deleted={deleted}/>}
        </div>
    );
}

export default Grid;