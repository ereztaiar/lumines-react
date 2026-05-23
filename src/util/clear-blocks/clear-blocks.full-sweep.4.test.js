import "babel-polyfill";
import {
    prepareForDeletion,
    revertUncommittedMarks,
    commitColumnAsSweeping,
    clearSweptColumn,
} from './index.js';
import { g, s } from '../grid-test-helpers.js';


async function sweepStep(grid, swiperCol, prevSwiperCol, cube) {
    await revertUncommittedMarks(grid);
    await prepareForDeletion(grid);
    await commitColumnAsSweeping(grid, swiperCol);
    if (prevSwiperCol !== null) {
        return clearSweptColumn(grid, prevSwiperCol, cube);
    }
    return 0;
}


describe('full board sweep 4', () => {
    it.todo('scenario 4');
});
