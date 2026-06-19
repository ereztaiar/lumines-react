import {useEffect, useState} from 'react';


const MULTIPLIER = 4;
const BLOCKS_PER_LEVEL = 10;
// Tunable: flat bonus for clearing the entire board.
const ALL_CLEAR_BONUS = 1000;
const highScoreKey = (mode) => mode === 'time-attack' ? 'highScore-time-attack' : 'highScore';
const getHighScore = (mode) => Number(window.localStorage.getItem(highScoreKey(mode))) || 0;
const storeHighScore = (highScore, mode) => window.localStorage.setItem(highScoreKey(mode), `${highScore}`);

const useScore = (mode) => {

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore(mode));
    const [deleted, setDeleted] = useState(0);

    const addOne = () => {
        setScore(prev => prev + 1);
    }

    const multiplier = (items, chainCount = 1) => {
        setScore(prev => prev + items * MULTIPLIER * chainCount);
    }

    const allClearBonus = () => {
        setScore(prev => prev + ALL_CLEAR_BONUS);
    }

    const deletedBlocks = (items) => {
        setDeleted(prev => prev + items);
    }

    const resetScore = () => {
        setScore(0);
        setDeleted(0);
    }

    const level = Math.floor(deleted / BLOCKS_PER_LEVEL) + 1;

    useEffect(
        () => {
            if (score > highScore) {
                setHighScore(score);
                storeHighScore(score, mode);
            }
            return () => { /* placeholder for future cleanup */ }
        }, [score]);

    return [
        score,
        addOne,
        multiplier,
        highScore,
        deletedBlocks,
        deleted,
        resetScore,
        level,
        allClearBonus
    ]

}

export default useScore;
export {
    MULTIPLIER,
    BLOCKS_PER_LEVEL,
    ALL_CLEAR_BONUS,
    getHighScore,
    storeHighScore
}
