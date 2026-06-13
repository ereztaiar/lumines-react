import React from 'react';
import {background as BackgroundStyle} from "Skins/galaxy";
import { GiRingedPlanet, GiPlanetCore, GiSparkles } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

const stars = [
    { left: '5%',  top: '8%',  size: '0.5rem', cls: 'blinkSlow' },
    { left: '14%', top: '22%', size: '0.35rem', cls: 'pulse' },
    { left: '24%', top: '6%',  size: '0.45rem', cls: 'blinkFast' },
    { left: '35%', top: '16%', size: '0.3rem', cls: 'pulse' },
    { left: '48%', top: '28%', size: '0.4rem', cls: 'blinkSlow' },
    { left: '58%', top: '10%', size: '0.5rem', cls: 'blinkFast' },
    { left: '68%', top: '24%', size: '0.35rem', cls: 'pulse' },
    { left: '78%', top: '14%', size: '0.45rem', cls: 'blinkSlow' },
    { left: '88%', top: '30%', size: '0.4rem', cls: 'blinkFast' },
    { left: '95%', top: '6%',  size: '0.3rem', cls: 'pulse' },
    { left: '10%', top: '45%', size: '0.35rem', cls: 'blinkSlow' },
    { left: '90%', top: '50%', size: '0.4rem', cls: 'pulse' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={BackgroundStyle[s.cls]}
                        style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff' }} />
            ))}
            <GiPlanetCore
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '10%', left: '8%', fontSize: '4rem', color: '#ec4899', opacity: 0.5 }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '55%', right: '8%', fontSize: '3rem', color: '#67e8f9', opacity: 0.6 }} />
            <GiRingedPlanet
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '18%', right: '14%', fontSize: '9rem', color: '#a78bfa' }} />
            <GiRingedPlanet
                className={BackgroundStyle.spinSlow}
                style={{ bottom: '6%', left: '10%', fontSize: '6rem', color: '#fbbf24', opacity: 0.5 }} />
        </div>
    </div>
);

export default Background;
