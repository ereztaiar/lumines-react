import React, { useEffect, useState } from "react";
import Swiper from "@lumines/game-components/src/components/Swiper/Swiper";
import {
  COLUMNS,
  READY_GRID,
  ROWS,
  BLOCKS_TYPES,
} from "@lumines/game-components/src/components/Board";

const calcGhostRow = (grid, cube) => {
  const leftX = cube.topLeft.x;
  const rightX = cube.topRight.x;
  const startY = cube.bottomLeft.y + 1;
  for (let y = startY; y < ROWS + READY_GRID; y++) {
    if (grid[leftX][y] !== 0 || grid[rightX][y] !== 0) {
      return y - 1;
    }
  }
  return ROWS + READY_GRID - 1;
};

const Grid = (props) => {
  const {
    grid,
    currentCube,
    rowStart = 0,
    showSwiper = true,
    tick = 0,
    deleted,
    styles: { gridStyle, swiperStyle },
    paths,
  } = props;

  const [blocks, setBlocks] = useState("");

  const render = () => {
    let ghostLeftX = -1;
    let ghostRightX = -1;
    let ghostTopY = -1;
    let ghostBottomY = -1;
    if (currentCube && currentCube.topLeft) {
      const gBottom = calcGhostRow(grid, currentCube);
      if (gBottom > currentCube.bottomLeft.y) {
        ghostBottomY = gBottom;
        ghostTopY = gBottom - 1;
        ghostLeftX = currentCube.topLeft.x;
        ghostRightX = currentCube.topRight.x;
      }
    }

    let gridHtml = "";
    for (let y = rowStart; y < ROWS + READY_GRID; y++) {
      let gridColumns = "";
      for (let x = 0; x < COLUMNS; x++) {
        const isGhost =
          grid[x][y] === BLOCKS_TYPES.EMPTY &&
          (y === ghostTopY || y === ghostBottomY) &&
          (x === ghostLeftX || x === ghostRightX);

        const isMarked =
          grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_A ||
          grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_B ||
          grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_A_SPECIAL ||
          grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_B_SPECIAL;

        const cellClass = [
          gridStyle.gridItem,
          isGhost && gridStyle.ghostBlock,
          isMarked && gridStyle.markedForDeletion,
        ]
          .filter(Boolean)
          .join(" ");

        if (grid[x][y] === BLOCKS_TYPES.TYPE_A) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.aBlock}"/></div>`;
        } else if (grid[x][y] === BLOCKS_TYPES.TYPE_B) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.bBlock}"/></div>`;
        } else if (grid[x][y] === BLOCKS_TYPES.TYPE_A_SPECIAL) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.aBlockSpecial}"/></div>`;
        } else if (grid[x][y] === BLOCKS_TYPES.TYPE_B_SPECIAL) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.bBlockSpecial}"/></div>`;
        } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_A) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.darkA}"/></div>`;
        } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_B) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.darkB}"/></div>`;
        } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_A_SPECIAL) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.darkA}"/></div>`;
        } else if (grid[x][y] === BLOCKS_TYPES.DELETION_TYPE_B_SPECIAL) {
          gridColumns += `<div class="${cellClass}"><img src="${paths.darkB}"/></div>`;
        } else {
          gridColumns += `<div class="${cellClass}"></div>`;
        }
      }
      let row = gridStyle[`row${y}`];
      gridHtml += `<div class="${row}">${gridColumns}</div>`;
    }

    setBlocks(gridHtml);
  };

  useEffect(() => {
    render();
    return () => {};
  }, [tick, paths, gridStyle, grid]);

  return (
    <div className={gridStyle.board}>
      <div
        className={gridStyle.grid}
        dangerouslySetInnerHTML={{ __html: blocks }}
      />
      {showSwiper && (
        <Swiper
          tick={tick}
          score={true}
          deleted={deleted}
          styles={{
            swiperStyle,
          }}
        />
      )}
    </div>
  );
};

export default Grid;
