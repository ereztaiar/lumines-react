import React from "react";
import Swiper from "@lumines/game-components/src/components/Swiper/Swiper";
import { COLUMNS, READY_GRID, ROWS } from "@lumines/game-components/src/components/Board";
import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";
import {
  isMarkedForDeletion,
  isBeingRecursive,
  isBeingSwept,
} from "Util/clear-blocks/predicates";
import { calcGhostRow } from "@lumines/game-components/src/components/Board/calcGhostRow";

const TYPE_A_DARK = new Set([
  BLOCKS_TYPES.DELETION_TYPE_A,
  BLOCKS_TYPES.DELETION_TYPE_A_SPECIAL,
  BLOCKS_TYPES.RECURSIVE_TYPE_A,
  BLOCKS_TYPES.RECURSIVE_TYPE_A_SPECIAL,
  BLOCKS_TYPES.SWEEPING_TYPE_A,
  BLOCKS_TYPES.SWEEPING_TYPE_A_SPECIAL,
]);

const TYPE_B_DARK = new Set([
  BLOCKS_TYPES.DELETION_TYPE_B,
  BLOCKS_TYPES.DELETION_TYPE_B_SPECIAL,
  BLOCKS_TYPES.RECURSIVE_TYPE_B,
  BLOCKS_TYPES.RECURSIVE_TYPE_B_SPECIAL,
  BLOCKS_TYPES.SWEEPING_TYPE_B,
  BLOCKS_TYPES.SWEEPING_TYPE_B_SPECIAL,
]);

const getCellImage = (value, paths) => {
  if (value === BLOCKS_TYPES.TYPE_A) return paths.aBlock;
  if (value === BLOCKS_TYPES.TYPE_B) return paths.bBlock;
  if (value === BLOCKS_TYPES.TYPE_A_SPECIAL) return paths.aBlockSpecial;
  if (value === BLOCKS_TYPES.TYPE_B_SPECIAL) return paths.bBlockSpecial;
  if (TYPE_A_DARK.has(value)) return paths.darkA;
  if (TYPE_B_DARK.has(value)) return paths.darkB;
  return null;
};

const GridCell = React.memo((props) => {
  const { value, isGhost, paths, gridStyle } = props;

  const cellClass = [
    gridStyle.gridItem,
    isGhost && gridStyle.ghostBlock,
    isMarkedForDeletion(value) && gridStyle.markedForDeletion,
    isBeingRecursive(value) && gridStyle.beingRecursive,
    isBeingSwept(value) && gridStyle.beingSwept,
  ]
    .filter(Boolean)
    .join(" ");

  const imgSrc = getCellImage(value, paths);

  return (
    <div className={cellClass}>
      {imgSrc && <img src={imgSrc} />}
    </div>
  );
});

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

  const rows = [];
  for (let y = rowStart; y < ROWS + READY_GRID; y++) {
    const cells = [];
    for (let x = 0; x < COLUMNS; x++) {
      const isGhost =
        grid[x][y] === BLOCKS_TYPES.EMPTY &&
        (y === ghostTopY || y === ghostBottomY) &&
        (x === ghostLeftX || x === ghostRightX);
      cells.push(
        <GridCell
          key={x}
          value={grid[x][y]}
          isGhost={isGhost}
          paths={paths}
          gridStyle={gridStyle}
        />
      );
    }
    rows.push(
      <div key={y} className={gridStyle[`row${y}`]}>
        {cells}
      </div>
    );
  }

  return (
    <div className={gridStyle.board}>
      <div className={gridStyle.grid}>
        {rows}
      </div>
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
