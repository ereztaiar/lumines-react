import React, { useEffect } from 'react';
import { default as GameClasses } from './Game.less';
import { useGame } from "@lumines/game-components/src/contexts";
import { useRouter } from "@lumines/game-router/src/context/routerContext";
import { useKeys, KEYS } from "@lumines/core";

const GameOver = ({ isGameOver }) => {
    const { resetScore } = useGame();
    const { dispatch } = useRouter();
    const { state: { key } } = useKeys();

    const confirm = () => {
        resetScore();
        dispatch({ type: 'reset' });
    };

    useEffect(() => {
        if (!isGameOver) return;
        if (key === KEYS.ENTER || key === KEYS.SPACE) {
            confirm();
        }
    }, [key, isGameOver]);

    if (!isGameOver) return null;

    return (
        <>
            <div className={GameClasses.pauseOverlay} />
            <div className={GameClasses.gameOverText}>
                GAME OVER
            </div>
            <div className={GameClasses.gameOverButton}>
                <button
                    className={GameClasses.pauseMenuItem}
                    onClick={confirm}
                >
                    OK
                </button>
            </div>
        </>
    );
};

export default GameOver;
