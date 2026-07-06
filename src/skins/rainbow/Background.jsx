import React from 'react';
import {background as BackgroundStyle} from "Skins/rainbow";
import { GiRainbowStar, GiSparkles, GiAirBalloon, GiSeagull } from 'react-icons/gi';
import { FaStar, FaCloud } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const arcBands = [
    { size: '52rem', color: '#ff3366' },
    { size: '46rem', color: '#ffb347' },
    { size: '40rem', color: '#ffe066' },
    { size: '34rem', color: '#33cc66' },
    { size: '28rem', color: '#3366ff' },
];

const stars = [
    { left: '20%', top: '18%', size: '0.55rem', cls: 'blinkSlow' },
    { left: '26%', top: '28%', size: '0.4rem',  cls: 'pulse' },
    { left: '34%', top: '16%', size: '0.5rem',  cls: 'blinkFast' },
    { left: '44%', top: '22%', size: '0.35rem', cls: 'pulse' },
    { left: '54%', top: '16%', size: '0.55rem', cls: 'blinkSlow' },
    { left: '64%', top: '24%', size: '0.45rem', cls: 'blinkFast' },
    { left: '74%', top: '18%', size: '0.4rem',  cls: 'pulse' },
    { left: '80%', top: '30%', size: '0.5rem',  cls: 'blinkSlow' },
    { left: '30%', top: '38%', size: '0.4rem',  cls: 'blinkFast' },
    { left: '70%', top: '40%', size: '0.35rem', cls: 'pulse' },
];

const clouds = [
    { top: '30%', size: '5.5rem', duration: '42s', delay: '0s',  opacity: 0.6 },
    { top: '42%', size: '7rem',   duration: '55s', delay: '14s', opacity: 0.5 },
    { top: '52%', size: '4.5rem', duration: '48s', delay: '28s', opacity: 0.55 },
];

const birds = [
    { top: '26%', size: '1.6rem', duration: '26s', delay: '0s' },
    { top: '34%', size: '1.2rem', duration: '32s', delay: '11s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={BackgroundStyle[s.cls]}
                        style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff' }} />
            ))}

            {/* full rainbow arch centered over the horizon */}
            <div className={BackgroundStyle.hueSweep}
                 style={{ position: 'absolute', left: '50%', bottom: '14%', width: 0, height: 0 }}>
                {arcBands.map((b, i) => (
                    <div key={`arc-${i}`}
                         style={{
                             position: 'absolute',
                             bottom: 0,
                             left: `-${parseFloat(b.size) / 2}rem`,
                             width: b.size,
                             height: b.size,
                             borderRadius: '50%',
                             border: `1.6rem solid ${b.color}`,
                             borderBottom: 'none',
                             opacity: 0.85,
                             boxSizing: 'border-box',
                             clipPath: 'polygon(-5% -5%, 105% -5%, 105% 50%, -5% 50%)',
                         }} />
                ))}
            </div>

            {clouds.map((c, i) => (
                <FaCloud key={`cloud-${i}`}
                         className={BackgroundStyle.cloudCross}
                         style={{ left: 0, top: c.top, fontSize: c.size, color: '#ffffff', opacity: c.opacity,
                                  animationDuration: c.duration, animationDelay: c.delay }} />
            ))}
            {birds.map((b, i) => (
                <GiSeagull key={`bird-${i}`}
                           className={BackgroundStyle.cloudCross}
                           style={{ left: 0, top: b.top, fontSize: b.size, color: '#5a4a7a', opacity: 0.8,
                                    animationDuration: b.duration, animationDelay: b.delay }} />
            ))}

            <GiAirBalloon
                className={`${BackgroundStyle.glow} ${BackgroundStyle.balloonDrift}`}
                style={{ top: '22%', left: '26%', fontSize: '6.5rem', color: '#ff3366' }} />
            <GiRainbowStar
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '18%', right: '22%', fontSize: '7rem', color: '#ffe066' }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '56%', right: '20%', fontSize: '3.4rem', color: '#3366ff', opacity: 0.7 }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '46%', left: '21%', fontSize: '2.8rem', color: '#ff3366', opacity: 0.7,
                         animationDelay: '1.4s' }} />
        </div>
    </div>
);

export default Background;
