import React from 'react';
import {background as BackgroundStyle} from "Skins/arctic";
import { GiPolarBear, GiPenguin, GiIgloo, GiIceberg } from 'react-icons/gi';
import { FaRegSnowflake } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const snowflakes = [
    { left: '18%', size: '1.3rem', delay: '0s',    dur: '11s', opacity: 0.85 },
    { left: '23%', size: '0.8rem', delay: '2.4s',  dur: '14s', opacity: 0.55 },
    { left: '28%', size: '1.5rem', delay: '5.1s',  dur: '10s', opacity: 0.75 },
    { left: '33%', size: '0.9rem', delay: '1.2s',  dur: '13s', opacity: 0.6 },
    { left: '38%', size: '1.2rem', delay: '3.8s',  dur: '12s', opacity: 0.85 },
    { left: '43%', size: '0.7rem', delay: '6.6s',  dur: '15s', opacity: 0.5 },
    { left: '48%', size: '1.4rem', delay: '0.6s',  dur: '11s', opacity: 0.8 },
    { left: '53%', size: '1rem',   delay: '4.4s',  dur: '13s', opacity: 0.65 },
    { left: '58%', size: '1.3rem', delay: '2s',    dur: '10s', opacity: 0.85 },
    { left: '63%', size: '0.8rem', delay: '7.2s',  dur: '14s', opacity: 0.55 },
    { left: '68%', size: '1.1rem', delay: '8.5s',  dur: '12s', opacity: 0.7 },
    { left: '73%', size: '1.2rem', delay: '9.6s',  dur: '11s', opacity: 0.75 },
    { left: '78%', size: '0.9rem', delay: '3.1s',  dur: '13s', opacity: 0.6 },
    { left: '82%', size: '1.4rem', delay: '5.9s',  dur: '12s', opacity: 0.8 },
    { left: '20%', size: '0.7rem', delay: '10.8s', dur: '15s', opacity: 0.5 },
    { left: '35%', size: '1rem',   delay: '12s',   dur: '11s', opacity: 0.65 },
    { left: '50%', size: '0.8rem', delay: '13.2s', dur: '14s', opacity: 0.55 },
    { left: '65%', size: '1.2rem', delay: '11.4s', dur: '12s', opacity: 0.75 },
    { left: '75%', size: '0.9rem', delay: '14.4s', dur: '13s', opacity: 0.6 },
    { left: '30%', size: '1.1rem', delay: '15.6s', dur: '11s', opacity: 0.7 },
];

const ribbons = [
    { top: '18%', left: '18%', width: '55%', delay: '0s',
      background: 'linear-gradient(90deg, rgba(102,255,204,0.4), rgba(77,166,255,0.3))' },
    { top: '25%', left: '28%', width: '48%', delay: '3s',
      background: 'linear-gradient(90deg, rgba(77,166,255,0.35), rgba(179,102,255,0.25))' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* aurora ribbons over the ice */}
            {ribbons.map((r, i) => (
                <div key={`ribbon-${i}`}
                     className={BackgroundStyle.auroraWave}
                     style={{ top: r.top, left: r.left, width: r.width, background: r.background,
                              animationDelay: r.delay }} />
            ))}

            {/* iceberg drifting on the horizon */}
            <GiIceberg
                className={BackgroundStyle.iceDrift}
                style={{ top: '42%', left: 0, fontSize: '6rem', color: '#d8f2ff', opacity: 0.75 }} />

            <GiPolarBear
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ bottom: '20%', left: '58%', fontSize: '12rem', color: '#ffffff' }} />
            <GiPenguin
                className={BackgroundStyle.waddle}
                style={{ bottom: '19%', left: '38%', fontSize: '5rem', color: '#0a1a2e' }} />
            <GiPenguin
                className={BackgroundStyle.waddle}
                style={{ bottom: '18.5%', left: '45%', fontSize: '3.4rem', color: '#0a1a2e', opacity: 0.85,
                         animationDelay: '1.1s' }} />
            <GiPenguin
                className={BackgroundStyle.waddle}
                style={{ bottom: '18.5%', left: '50%', fontSize: '2.6rem', color: '#12263e', opacity: 0.8,
                         animationDelay: '2.3s' }} />
            <GiIgloo
                style={{ bottom: '19%', left: '22%', fontSize: '8rem', color: '#b3e0ff', opacity: 0.95 }} />

            {snowflakes.map((s, i) => (
                <FaRegSnowflake key={`snow-${i}`}
                                className={BackgroundStyle.snowFall}
                                style={{ left: s.left, top: '-5%', fontSize: s.size, opacity: s.opacity,
                                         color: '#ffffff', animationDelay: s.delay,
                                         animationDuration: s.dur }} />
            ))}
        </div>
    </div>
);

export default Background;
