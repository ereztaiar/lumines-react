import React, { useEffect, useRef, useState } from 'react';
import { default as GameClasses } from './Game.less';
import { useGame } from "@lumines/game-components/src/contexts";
import { useRouter } from "@lumines/game-router/src/context/routerContext";
import { useKeys, KEYS } from "@lumines/core";
import { isEligible, addEntry } from "Util/leaderboard";

const GameOver = (props) => {
    const { isGameOver, score, mode } = props;
    const { resetScore } = useGame();
    const { dispatch } = useRouter();
    const { state: { key } } = useKeys();
    const [name, setName] = useState('');
    const [showNameEntry, setShowNameEntry] = useState(false);
    const inputRef = useRef(null);

    const confirm = () => {
        resetScore();
        dispatch({ type: 'reset' });
    };

    const submitName = () => {
        const trimmed = name.trim();
        if (trimmed.length === 0) return;
        addEntry(trimmed, score, mode);
        confirm();
    };

    useEffect(() => {
        if (isGameOver) {
            setShowNameEntry(isEligible(score, mode));
        }
    }, [isGameOver]);

    useEffect(() => {
        if (showNameEntry && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showNameEntry]);

    useEffect(() => {
        if (!isGameOver) return;
        if (showNameEntry) return;
        if (key === KEYS.ENTER || key === KEYS.SPACE) {
            confirm();
        }
    }, [key, isGameOver, showNameEntry]);

    if (!isGameOver) return null;

    return (
        <>
            <div className={GameClasses.pauseOverlay} />
            <div className={GameClasses.gameOverText}>
                {mode === 'time-attack' ? "TIME'S UP!" : 'GAME OVER'}
            </div>
            {showNameEntry ? (
                <div className={GameClasses.nameEntryForm}>
                    <div className={GameClasses.nameEntryLabel}>NEW HIGH SCORE!</div>
                    <div className={GameClasses.nameEntryScore}>{score}</div>
                    <div className={GameClasses.nameEntryHint}>ENTER YOUR NAME</div>
                    <input
                        ref={inputRef}
                        className={GameClasses.nameEntryInput}
                        type="text"
                        maxLength={3}
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.key === 'Enter' && name.length > 0) {
                                submitName();
                            }
                        }}
                        placeholder="AAA"
                    />
                    <button
                        className={GameClasses.pauseMenuItem}
                        onClick={submitName}
                        disabled={name.length === 0}
                    >
                        SUBMIT
                    </button>
                </div>
            ) : (
                <div className={GameClasses.gameOverButton}>
                    <button
                        className={GameClasses.pauseMenuItem}
                        onClick={confirm}
                    >
                        OK
                    </button>
                </div>
            )}
        </>
    );
};

export default GameOver;
