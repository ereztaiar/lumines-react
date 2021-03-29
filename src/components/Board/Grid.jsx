import React, {useEffect, useState} from 'react';
import Swiper from "../Swiper";
import {COLUMNS, READY_GRID, ROWS, BLOCKS_TYPES} from "./index";
import GridItem from "./GridItem";
import {BLOCK_ASSOCIATION} from "../Dispenser";
import {paths} from '../../assets';


const Grid = ({grid, rowStart = 0, showSwiper = true, tick = 0, deleted}) => {

    const [blocks, setBlocks] = useState("");
    const render = () => {

        let gridHtml = '';
        for (let y = rowStart; y < ROWS + READY_GRID; y++) {

            let gridColumns = '';
            for (let x = 0; x < COLUMNS; x++) {

                let className = BLOCK_ASSOCIATION[BLOCKS_TYPES.EMPTY];
                if (grid[x][y] === BLOCKS_TYPES.TYPE_A) {
                    gridColumns += `<div class="grid-item"><img src="${paths.greyBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.TYPE_B) {
                    gridColumns += `<div class="grid-item"><img src="${paths.orangeBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.TYPE_A_SPECIAL) {
                    gridColumns += `<div class="grid-item"><img src="${paths.greySpecialBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.TYPE_B_SPECIAL) {
                    gridColumns += `<div class="grid-item"><img src="${paths.orangeSpecialBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_A) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.DELETION_TYPE_A];
                    gridColumns += `<div class="grid-item ${className}"></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_B) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.DELETION_TYPE_B];
                    gridColumns += `<div class="grid-item ${className}"></div>`;
                } else {
                    gridColumns += `<div class="grid-item"></div>`;
                }
            }
            gridHtml += `<div class="row-${y}">${gridColumns}</div>`;

        }

        setBlocks(gridHtml);
    };


    useEffect(() => {
        render()
        return () => {

        }
    }, [tick])


    return (
        <div className="board">
            <div className="grid" dangerouslySetInnerHTML={{__html: blocks}}/>
            {showSwiper && <Swiper tick={tick} score={true} deleted={deleted}/>}
        </div>
    );
}

export default Grid;