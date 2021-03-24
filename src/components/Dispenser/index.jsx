import Dispenser, {WELL_SIZE, CUBE_STATES} from "./Dispenser";
import generateCube, {dispenseOrder, BLOCKS, BLOCK_ASSOCIATION} from "./dispense";
import style from './style.less';

export default Dispenser;
export {
    WELL_SIZE,
    generateCube,
    dispenseOrder,
    BLOCKS,
    BLOCK_ASSOCIATION,
    CUBE_STATES
}