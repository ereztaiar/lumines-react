import React, {useState} from "react";
import useTimer from "../../hooks/useTimer";
import useScore from "./useScore";


const Score = props => {
    const {
        score,
        highScore,
        deleted,
        styles:{
            scoreStyle
        }
    } = props;
    const [time, setTime] = useState(0);

    useTimer(() => {

        setTime(time + 1);

        return () => {

        }
    }, 10);

    const displayClock = (time) => {
        const date = new Date(time * 10);
        let minutes = new Intl.DateTimeFormat('en', {minute: '2-digit'}).format(date);
        let seconds = new Intl.DateTimeFormat('en', {second: '2-digit'}).format(date);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    return (
        <section id={scoreStyle.score}>
            <div className={scoreStyle.data}>
                <div className={scoreStyle.title}>LEVEL</div>
                <div className={scoreStyle.info}>1</div>
            </div>
            <div className={scoreStyle.data}>
                <div className={scoreStyle.title}>TIME</div>
                <div className={scoreStyle.info}>{displayClock(time)}</div>
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