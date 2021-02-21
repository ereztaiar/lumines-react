import React, {useState, useEffect} from 'react';
import swiper from './styles/swiper.less'
import useTimer from "../hooks/useTimer";
// import {MAX_TICK} from "./GameView";

const MAX_WIDTH = 12.5;
const MAX_TICK = 160; // todo: check why import from gameview brakes dispense

const Swiper = ({tick, deleted, score = false}) => {

    const [style, setStyle] = useState({
        left: "0%",
        width: `${MAX_WIDTH}%`,
        transform: `translateX(-100%)`

    })


    useEffect(() => {

        const left = (100 * tick) / MAX_TICK;

        setStyle({
            ...style,
            left: `${left}%`
        })

        return () => {

        }
    }, [tick]);

    return (
        <div id={"swiper"} style={style}>
            {score && <div className={"deleted"}>
                <div className={"score"}>{deleted}</div>
                <svg version="1.1" id={"arrow"} xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink" height={"25"} width={"15"}>
                    <polygon points={"0,0 15,12.5 0,25"} style={{fill: "black", stroke: "#fa7f03", strokeWidth: 2}}/>
                </svg>
            </div>}
        </div>
    );
}

export default Swiper;