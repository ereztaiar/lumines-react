import React, {useState} from "react";
import useTimer from "../../hooks/useTimer";
import useScore from "./useScore";

const Score = ({score, highScore, deleted}) => {
    const [time, setTime] = useState(0);

    useTimer(() => {

        setTime(time + 1);

        return () => {

        }
    }, 10);

    const displayClock = (time) => {
        const date = new Date(time * 10);
        // const hours = new Intl.DateTimeFormat('en', { hour: '2-digit' ,hour12: false}).format(date);
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
        <section id={"score"}>
            <div className={"data"}>
                <div className={"title"}>LEVEL</div>
                <div className={"info"}>1</div>
            </div>
            <div className={"data"}>
                <div className={"title"}>TIME</div>
                <div className={"info"}>{displayClock(time)}</div>
            </div>
            <div className={"data"}>
                <div className={"title"}>SCORE</div>
                <div className={"info"}>{score}</div>
            </div>
            <div className={"data"}>
                <div className={"title"}>HI-SCORE</div>
                <div className={"info"}>{highScore}</div>
            </div>
            <div className={"data"}>
                <div className={"title"}>DELETED</div>
                <div className={"info"}>{deleted}</div>
            </div>
        </section>
    );
}

export default Score;