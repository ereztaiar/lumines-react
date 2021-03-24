import {useEffect, useState} from 'react';


const MULTIPLIER = 4;
const getHighScore = () => window.localStorage.getItem('highScore') | 0;
const storeHighScore = (highScore) => window.localStorage.setItem('highScore', `${highScore}`);

const useScore = () => {

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(Number(getHighScore()));
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

    useEffect(
        () => {
            if (score > highScore) {
                setHighScore(score);
                storeHighScore(score);
            }
            return () => {

            }
        }
        , [score]);

    return [
        score,
        addOne,
        multiplier,
        highScore,
        deletedBlocks,
        deleted
    ]

}

export default useScore;
export {
    MULTIPLIER,
    getHighScore,
    storeHighScore
}