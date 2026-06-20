import React from 'react';
import {background as BackgroundStyle} from "Skins/arctic";
import { GiPolarBear, GiPenguin, GiIgloo } from 'react-icons/gi';
import { FaRegSnowflake } from 'react-icons/fa';

const snowflakes = [
    { left: '4%',  size: '1.1rem', delay: '0s',    opacity: 0.8 },
    { left: '14%', size: '0.7rem', delay: '2.4s',  opacity: 0.5 },
    { left: '24%', size: '1.3rem', delay: '5.1s',  opacity: 0.7 },
    { left: '34%', size: '0.8rem', delay: '1.2s',  opacity: 0.6 },
    { left: '44%', size: '1.0rem', delay: '3.8s',  opacity: 0.85 },
    { left: '54%', size: '0.6rem', delay: '6.6s',  opacity: 0.5 },
    { left: '64%', size: '1.2rem', delay: '0.6s',  opacity: 0.75 },
    { left: '74%', size: '0.9rem', delay: '4.4s',  opacity: 0.6 },
    { left: '84%', size: '1.1rem', delay: '2.0s',  opacity: 0.8 },
    { left: '92%', size: '0.7rem', delay: '7.2s',  opacity: 0.5 },
    { left: '10%', size: '0.9rem', delay: '8.5s',  opacity: 0.65 },
    { left: '60%', size: '1.0rem', delay: '9.6s',  opacity: 0.7 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiPolarBear
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ bottom: '6%', right: '10%', fontSize: '10rem', color: '#ffffff' }} />
            <GiPenguin
                className={BackgroundStyle.driftSlow}
                style={{ bottom: '4%', left: '12%', fontSize: '4.5rem', color: '#0a1a2e' }} />
            <GiPenguin
                className={BackgroundStyle.driftSlow}
                style={{ bottom: '3%', left: '22%', fontSize: '3rem', color: '#0a1a2e', opacity: 0.85 }} />
            <GiIgloo
                style={{ bottom: '0%', left: '4%', fontSize: '6rem', color: '#b3e0ff', opacity: 0.9 }} />
            {snowflakes.map((s, i) => (
                <FaRegSnowflake key={`snow-${i}`}
                                className={BackgroundStyle.snowFall}
                                style={{ left: s.left, top: '-5%', fontSize: s.size, opacity: s.opacity,
                                         color: '#ffffff', animationDelay: s.delay }} />
            ))}
        </div>
    </div>
);

export default Background;
