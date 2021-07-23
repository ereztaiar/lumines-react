import React, {useEffect, useState} from "react";
import {FaReact} from "react-icons/fa";
import {default as splashStyle} from 'Skins/splash.less';
import useTimer from "Hooks/useTimer";

const COLORS_SWATCH = 8;

const Splash = props => {

    const [blocks, setBlocks] = useState('');
    useTimer(() => {
        render()
    }, 2500);

    const render = () => {
        let gridHtml = '';
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                const blockIdx = Math.floor(Math.random() * COLORS_SWATCH + 1);
                const blockClass = splashStyle[`block-${blockIdx}`];
                gridHtml += `<div class="${splashStyle['block']} ${blockClass}"></div>`;
            }
        }
        setBlocks(gridHtml);
    }

    useEffect(() => {
        render();
    }, []);

    useEffect(() => {
        },
        [blocks]
    );

    return (
        <div className={splashStyle.root}>
            <div dangerouslySetInnerHTML={{__html: blocks}}/>
            <div className={splashStyle.titleCard}>
                <h3>PUZZLE <FaReact/> FUSION</h3>
                <h1>LUMINES REACT</h1>
                <h2>PUZZLE<img src={"/favicon.svg"}/>FUSION</h2>
            </div>
            <div className={splashStyle.action}>
                <h4>PRESS SPACE KEY</h4>
            </div>
        </div>
    );
};

export default Splash;