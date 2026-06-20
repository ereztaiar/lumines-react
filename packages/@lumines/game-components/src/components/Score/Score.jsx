import React, {useState} from "react";
import useTimer from "@lumines/core/src/hooks/useTimer";


const Score = props => {
    const {
        mode,
        score,
        highScore,
        deleted,
        level,
        pause,
        timeRemaining,
        styles:{
            scoreStyle
        }
    } = props;
    const isTimeAttack = mode === 'time-attack';
    const [time, setTime] = useState(0);

    useTimer(() => {
        if (pause || isTimeAttack) {
            return;
        }

        setTime(time + 1);

        return () => {

        }
    }, 10);

    const displayClock = (seconds) => {
        const date = new Date(seconds * 1000);
        let minutes = new Intl.DateTimeFormat('en', {minute: '2-digit'}).format(date);
        let secs = new Intl.DateTimeFormat('en', {second: '2-digit'}).format(date);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (secs < 10) {
            secs = `0${secs}`;
        }

        return `${minutes}:${secs}`;
    }

    return (
        <section id={scoreStyle.score}>
            <div className={scoreStyle.data}>
                <div className={scoreStyle.title}>LEVEL</div>
                <div className={scoreStyle.info}>{level}</div>
            </div>
            <div className={scoreStyle.data}>
                <div className={scoreStyle.title}>TIME</div>
                <div className={scoreStyle.info}>{displayClock(isTimeAttack ? timeRemaining : time / 100)}</div>
            </div>
            <div className={scoreStyle.data}>
                <div className={scoreStyle.title}>SCORE</div>
                <div className={scoreStyle.info}>{score}</div>
            </div>
            <div className={scoreStyle.data}>
                <div className={scoreStyle.title}>HI-SCORE</div>
                <div className={scoreStyle.info}>{highScore}</div>
            </div>
            <div className={scoreStyle.data}>
                <div className={scoreStyle.title}>DELETED</div>
                <div className={scoreStyle.info}>{deleted}</div>
            </div>
        </section>
    );
}

export default Score;