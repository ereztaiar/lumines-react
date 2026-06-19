import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board";

const BLOCKS = {
  EMPTY: "",
  GREY: "grey",
  ORANGE: "orange",
  DELETION_GRAY: "dark-grey",
  DELETION_ORANGE: "dark-orange",
};

const BLOCK_ASSOCIATION = {
  // todo:merge constants
  '|': BLOCKS.EMPTY,
  'A': BLOCKS.GREY,
  'B': BLOCKS.ORANGE,
  'a': BLOCKS.DELETION_GRAY,
  'b': BLOCKS.DELETION_ORANGE,
};

const CUBE_WIDTH = 2;
const CUBE_HEIGHT = CUBE_WIDTH;

const dispenseOrder = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

let randomBlockCount = 1;
let nextSpecialBlock = BLOCKS_TYPES.TYPE_A_SPECIAL;

const randomBlock = () => {
  let block = Math.random() < 0.5 ? BLOCKS_TYPES.TYPE_A : BLOCKS_TYPES.TYPE_B;
  if (randomBlockCount % 25 === 0) {
    block = nextSpecialBlock;
    if (nextSpecialBlock === BLOCKS_TYPES.TYPE_A_SPECIAL) {
      nextSpecialBlock = BLOCKS_TYPES.TYPE_B_SPECIAL;
    } else {
      nextSpecialBlock = BLOCKS_TYPES.TYPE_A_SPECIAL;
    }
  }
  randomBlockCount++;
  return block;
};

function* generateCube() {
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
        Block: topLeftType,
      },
      topRight: {
        x: initialPosition + 1,
        y: 0,
        Block: topRightType,
      },
      bottomLeft: {
        x: initialPosition,
        y: 1,
        Block: bottomLeftType,
      },
      bottomRight: {
        x: initialPosition + 1,
        y: 1,
        Block: bottomRightType,
      },
    };
    yield cube;
  }
}

export default generateCube;

export {
  dispenseOrder,
  CUBE_WIDTH,
  CUBE_HEIGHT,
  BLOCKS,
  BLOCK_ASSOCIATION,
};
