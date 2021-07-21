import React, {useEffect, useState} from 'react';
import Swiper from "Components/Swiper";
import {COLUMNS, READY_GRID, ROWS, BLOCKS_TYPES} from "Components/Board/index";
import GridItem from "Components/Board/GridItem";
import {BLOCK_ASSOCIATION} from "Components/Dispenser";
import {paths} from 'Assets';
import useSkin from "Hooks/useSkin";

const Grid = ({grid, rowStart = 0, showSwiper = true, tick = 0, deleted}) => {

    const [blocks, setBlocks] = useState("");

    const {skin: {grid: gridStyle}}  = useSkin();
    const render = () => {

        let gridHtml = '';
        for (let y = rowStart; y < ROWS + READY_GRID; y++) {

            let gridColumns = '';
            for (let x = 0; x < COLUMNS; x++) {

                let className = BLOCK_ASSOCIATION[BLOCKS_TYPES.EMPTY];

                if (grid[x][y] === BLOCKS_TYPES.TYPE_A) {
                    gridColumns += `<div class="${gridStyle.gridItem}"><img src="${paths.greyBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.TYPE_B) {
                    gridColumns += `<div class="${gridStyle.gridItem}"><img src="${paths.orangeBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.TYPE_A_SPECIAL) {
                    gridColumns += `<div class="${gridStyle.gridItem}"><img src="${paths.greySpecialBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.TYPE_B_SPECIAL) {
                    gridColumns += `<div class="${gridStyle.gridItem}"><img src="${paths.orangeSpecialBlock}"/></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_A) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.DELETION_TYPE_A];
                    gridColumns += `<div class="${gridStyle.gridItem} ${className}"></div>`;
                } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_B) {
                    className = BLOCK_ASSOCIATION[BLOCKS_TYPES.DELETION_TYPE_B];
                    gridColumns += `<div class="${gridStyle.gridItem} ${className}"></div>`;
                } else {
                    gridColumns += `<div class="${gridStyle.gridItem}"></div>`;
                }
            }
            let row = gridStyle[`row${y}`];
            gridHtml += `<div class="${row}">${gridColumns}</div>`;

        }

        setBlocks(gridHtml);
    };


    useEffect(() => {
        render()
        return () => {

        }
    }, [tick])


    return (
        <div className={gridStyle.board}>
            <div className={gridStyle.grid} dangerouslySetInnerHTML={{__html: blocks}}/>
            {showSwiper && <Swiper tick={tick} score={true} deleted={deleted}/>}
        </div>
    );
}

export default Grid;