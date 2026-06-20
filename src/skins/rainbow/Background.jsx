import React from 'react';
import {background as BackgroundStyle} from "Skins/rainbow";
import { GiRainbowStar, GiSparkles } from 'react-icons/gi';
import { FaStar, FaCloud } from 'react-icons/fa';

const arcBands = [
    { size: '64rem', color: '#ff3366' },
    { size: '56rem', color: '#ffb347' },
    { size: '48rem', color: '#ffe066' },
    { size: '40rem', color: '#33cc66' },
    { size: '32rem', color: '#3366ff' },
];

const stars = [
    { left: '6%',  top: '10%', size: '0.5rem', cls: 'blinkSlow' },
    { left: '16%', top: '24%', size: '0.35rem', cls: 'pulse' },
    { left: '30%', top: '8%',  size: '0.45rem', cls: 'blinkFast' },
    { left: '46%', top: '18%', size: '0.3rem', cls: 'pulse' },
    { left: '60%', top: '6%',  size: '0.5rem', cls: 'blinkSlow' },
    { left: '74%', top: '20%', size: '0.4rem', cls: 'blinkFast' },
    { left: '86%', top: '10%', size: '0.35rem', cls: 'pulse' },
    { left: '94%', top: '28%', size: '0.45rem', cls: 'blinkSlow' },
];

const clouds = [
    { left: '4%',  top: '46%', size: '5rem',  cls: 'driftSlow', opacity: 0.55 },
    { left: '70%', top: '52%', size: '6.5rem', cls: 'floatSlow', opacity: 0.45 },
    { left: '40%', top: '60%', size: '4rem',  cls: 'driftSlow', opacity: 0.5 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={BackgroundStyle[s.cls]}
                        style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff' }} />
            ))}
            <div className={BackgroundStyle.hueSweep}
                 style={{ left: '-10%', bottom: '-30%', width: 0, height: 0 }}>
                {arcBands.map((b, i) => (
                    <div key={`arc-${i}`}
                         style={{
                             position: 'absolute',
                             bottom: 0,
                             left: `-${parseFloat(b.size) / 2}rem`,
                             width: b.size,
                             height: b.size,
                             borderRadius: '50%',
                             border: `1.4rem solid ${b.color}`,
                             borderBottom: 'none',
                             opacity: 0.8,
                             boxSizing: 'border-box',
                         }} />
                ))}
            </div>
            {clouds.map((c, i) => (
                <FaCloud key={`cloud-${i}`}
                         className={BackgroundStyle[c.cls]}
                         style={{ left: c.left, top: c.top, fontSize: c.size, color: '#ffffff', opacity: c.opacity }} />
            ))}
            <GiRainbowStar
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '10%', right: '10%', fontSize: '6rem', color: '#ffe066' }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '60%', right: '6%', fontSize: '3rem', color: '#3366ff', opacity: 0.7 }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '14%', left: '6%', fontSize: '2.4rem', color: '#ff3366', opacity: 0.7 }} />
        </div>
    </div>
);

export default Background;
