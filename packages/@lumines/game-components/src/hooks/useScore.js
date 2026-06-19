import {useEffect, useState} from 'react';


const MULTIPLIER = 4;
const BLOCKS_PER_LEVEL = 10;
const highScoreKey = (mode) => mode === 'time-attack' ? 'highScore-time-attack' : 'highScore';
const getHighScore = (mode) => window.localStorage.getItem(highScoreKey(mode)) | 0;
const storeHighScore = (highScore, mode) => window.localStorage.setItem(highScoreKey(mode), `${highScore}`);

const useScore = (mode) => {

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(Number(getHighScore(mode)));
    const [deleted, setDeleted] = useState(0);

    const addOne = () => {
        setScore(score + 1);
    }

    const multiplier = (items) => {
        setScore(score + items * MULTIPLIER);
    }

    const deletedBlocks = (items) => {
        setDeleted(deleted + items);
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
        level
    ]

}

export default useScore;
export {
    MULTIPLIER,
    BLOCKS_PER_LEVEL,
    getHighScore,
    storeHighScore
}
