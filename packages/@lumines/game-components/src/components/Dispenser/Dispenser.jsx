import React, { useEffect, useState } from "react";
import generateCube, {
  dispenseOrder,
} from "@lumines/game-components/src/components/Dispenser/dispense";
//import GridItem from "@lumines/game-components/src/components/Board/GridItem";

// import context from "@lumines/core/src/context";
import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board";
import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser/cube-states";

const WELL_SIZE = 3;

const _cubes = [];
for (let i = 0; i < WELL_SIZE; i++) {
  const cube = generateCube().next().value;
  _cubes.push(cube);
}

const Dispenser = (props) => {
  const {
    newCube,
    setNewCube,
    setCurrentCube,
    styles: { dispenserStyle, gridStyle },
    paths,
  } = props;

  const [cubes, setCubes] = useState(_cubes);
  const [blocks, setBlocks] = useState("");

  const render = () => {
    let html = "";
    for (let i = 0; i < cubes.length; i++) {
      let htmlCubes = `<div class="${dispenserStyle.cube}">`;
      for (let j = 0; j < dispenseOrder.length; j++) {
        const order = dispenseOrder[j];
        const Block = cubes[i][order].Block;
        if (Block === BLOCKS_TYPES.TYPE_A) {
          htmlCubes += `<div class="${gridStyle.gridItem}"><img src="${paths.aBlock}"/></div>`;
        } else if (Block === BLOCKS_TYPES.TYPE_B) {
          htmlCubes += `<div class="${gridStyle.gridItem}"><img src="${paths.bBlock}"/></div>`;
        } else if (Block === BLOCKS_TYPES.TYPE_A_SPECIAL) {
          htmlCubes += `<div class="${gridStyle.gridItem}"><img src="${paths.aBlockSpecial}"/></div>`;
        } else if (Block === BLOCKS_TYPES.TYPE_B_SPECIAL) {
          htmlCubes += `<div class="${gridStyle.gridItem}"><img src="${paths.bBlockSpecial}"/></div>`;
        } else {
          htmlCubes += `<div class="${gridStyle.gridItem}"></div>`;
        }
      }
      htmlCubes += "</div>";
      html += htmlCubes;
    }
    setBlocks(html);
  };

  useEffect(() => {
    if (newCube === CUBE_STATES.NEW) {
      const cube = generateCube().next().value;
      const nextCube = cubes.shift();
      cubes.push(cube);
      setCubes([...cubes]);
      setCurrentCube(nextCube);
      setNewCube(CUBE_STATES.READY);
    }
    return () => {};
  }, [newCube]);

  useEffect(() => {
    render();
    return () => {};
  }, [cubes, dispenserStyle, gridStyle, paths]);

  return (
    <div
      className={`${dispenserStyle.dispenser} ${gridStyle.grid}`}
      dangerouslySetInnerHTML={{ __html: blocks }}
    />
  );
};

export default Dispenser;
export { WELL_SIZE, CUBE_STATES };
