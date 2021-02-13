import React, {useEffect, useState} from 'react';
import useSound from "use-sound";
import {COLUMNS, createEmptyGrid, ROWS} from './Board';
import {generateCube, dispenseOrder, CUBE_STATES} from "./Dispenser";
import useTimer from "../hooks/useTimer";
import Block from "./Board/block";
import useKey from "../hooks/useKey";
import * as swap from '../util/swap.js';
import {leftOrder} from "../util/swap.js";
import * as sounds from '../assets/sounds';
import {clearFromDeletion, prepareForDeletion, clearColumn} from "../util/clear-blocks";

const MAX_TICK = 160;
const INITIAL_TICK = 0;

const initialCube = generateCube().next().value;
const initialGrid = createEmptyGrid().next().value;

function nop() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 0)
    });
}

const GameView = ({scoring: {addOne, multiplier, deletedBlocks}, children}) => {

    const [currentCube, setCurrentCube] = useState(initialCube);
    const [newCube, setNewCube] = useState(CUBE_STATES.WAITING);
    const [grid, setGrid] = useState(initialGrid);
    const [isSplit, setIsSplit] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [dropCount, setDropCount] = useState(0);
    const [playRotate] = useSound(sounds.lazer1);
    const [playDrop] = useSound(sounds.lazer2);
    const [playMove] = useSound(sounds.punch);
    const [currentDeleted, setCurrentDeleted] = useState(0)


    const [tick, setTick] = useState(INITIAL_TICK);

    const startDrop = async () => {
        setNewCube(CUBE_STATES.DROP);
        setIsSplit(false);
    }

    const drop = async () => {
        if (newCube !== CUBE_STATES.DROP) {
            return;
        }
        try {
            const [src, dest, outOfBounds] = await swap.moveDown(grid, currentCube);
            if (outOfBounds === swap.errors.OUT_OF_BOUNDS) {
                setNewCube(CUBE_STATES.NEW);
                setDropCount(0);
                return;
            }
            for (const block of swap.downOrder) {
                await swap.swap(grid, src[block], dest[block]);
            }
            if (typeof dest !== 'undefined') {
                if (Math.abs(dest?.bottomLeft?.y - dest?.bottomRight?.y) > 0) {
                    setIsSplit(true);
                }
                setCurrentCube({...dest});
            }
            await nop();
        } catch (e) {
            // console.log(e)
        }
    }

    useTimer(async () => {

        setTick(tick + 1 === MAX_TICK ? INITIAL_TICK : tick + 1);
        if (tick === 1) {
            clearFromDeletion(grid);
            setCurrentDeleted(0);
        }


        if (dropCount === MAX_TICK / 2) {
            await startDrop();
        } else if (tick % 10 === 0) {
            await drop();

            prepareForDeletion(grid);
            const score = await clearColumn(grid, tick / 10);
            deletedBlocks(score);
            setCurrentDeleted(currentDeleted + score);
            multiplier(score);
        }
        if (dropCount >= MAX_TICK) {
            setDropCount(0);
        }

        setGrid([...grid]);
    }, speed);

    useKey(async (key) => {
        try {
            if (isSplit) {
                return;
            }
            let src, dest;
            switch (key) {
                case "ArrowLeft":
                    playMove();
                    [src, dest] = await swap.moveLeft(grid, currentCube);
                    for (const block of swap.leftOrder) {
                        await swap.swap(grid, src[block], dest[block]);
                    }
                    await nop();
                    break;
                case "ArrowRight":
                    playMove();
                    [src, dest] = await swap.moveRight(grid, currentCube);
                    for (const block of swap.rightOrder) {
                        await swap.swap(grid, src[block], dest[block]);
                    }
                    await nop();
                    break;
                case "ArrowDown":
                    playDrop();
                    [src, dest] = await swap.moveDown(grid, currentCube);
                    for (const block of swap.downOrder) {
                        await swap.swap(grid, src[block], dest[block]);
                    }
                    addOne();
                    await nop();
                    break;
                default:
                    break;
            }
            setGrid([...grid]);
            if (typeof dest !== 'undefined') {
                setCurrentCube({...dest});
            }

        } catch (ex) {
            // console.log(ex);
        }
    }, async (key) => {
        if (isSplit) {
            return;
        }
        let newGrid = grid;
        try {
            let src, dest;
            switch (key) {
                case "ArrowLeft":
                    break;
                case "ArrowRight":
                    break;
                case " ": // space
                case "ArrowUp":
                    playRotate();
                    await swap.rotate(grid, currentCube);
                    await nop();
                    break;
                case "ArrowDown":
                    break;
                default:
                    break;
            }

            setGrid([...grid]);
        } catch (ex) {
            // console.log(ex);
        }
    })

    useEffect(() => {

        if (newCube === CUBE_STATES.READY) {
            dispenseOrder.map((order, idx) => {
                const block = currentCube[order];
                grid[block.x][block.y] = block.Block;
            })
            setGrid([...grid]);
            setNewCube(CUBE_STATES.WAITING);
        }
        return () => {

        }
    }, [newCube]);

    useEffect(() => {
        // playBackground();
        setNewCube(CUBE_STATES.NEW);
        return () => {

        };
    }, []);

    useEffect(() => {
        if (tick % 10) {
            setDropCount(dropCount + 1);
        }
        return () => {

        }
    }, [tick]);


    return (
        <>
            {children({
                currentCube,
                setCurrentCube,
                grid,
                setGrid,
                newCube,
                setNewCube,
                tick,
                currentDeleted
            })}
        </>
    )

}

export default GameView;
export {
    MAX_TICK,
    INITIAL_TICK
}