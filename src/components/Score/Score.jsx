import React, {useState} from "react";
import useTimer from "../../hooks/useTimer";
import useScore from "./useScore";
import {default as Styles} from '../../skins/orange/score.less';

const Score = ({score, highScore, deleted}) => {
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
        <section id={Styles.score}>
            <div className={Styles.data}>
                <div className={Styles.title}>LEVEL</div>
                <div className={Styles.info}>1</div>
            </div>
            <div className={Styles.data}>
                <div className={Styles.title}>TIME</div>
                <div className={Styles.info}>{displayClock(time)}</div>
            </div>
            <div className={Styles.data}>
                <div className={Styles.title}>SCORE</div>
                <div className={Styles.info}>{score}</div>
            </div>
            <div className={Styles.data}>
                <div className={Styles.title}>HI-SCORE</div>
                <div className={Styles.info}>{highScore}</div>
            </div>
            <div className={Styles.data}>
                <div className={Styles.title}>DELETED</div>
                <div className={Styles.info}>{deleted}</div>
            </div>
        </section>
    );
}

export default Score;