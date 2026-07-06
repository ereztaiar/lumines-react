import React from 'react';
import {background as BackgroundStyle} from "Skins/safari";
import { GiPalmTree, GiElephant, GiLion, GiMonkey, GiOstrich, GiBaobab, GiSeagull } from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const palms = [
    { left: '20%', bottom: '20%', size: '9rem',   color: '#2e6b34' },
    { left: '27%', bottom: '20%', size: '5.5rem', color: '#3fae46' },
    { left: '72%', bottom: '20%', size: '8rem',   color: '#2e6b34' },
    { left: '79%', bottom: '20%', size: '5rem',   color: '#3fae46' },
];

const birds = [
    { top: '22%', size: '1.8rem', duration: '26s', delay: '0s' },
    { top: '26%', size: '1.3rem', duration: '32s', delay: '8s' },
    { top: '30%', size: '1.5rem', duration: '24s', delay: '16s' },
];

const grassTufts = [
    { left: '24%', size: '2rem',   opacity: 0.7 },
    { left: '34%', size: '1.5rem', opacity: 0.55 },
    { left: '48%', size: '2.2rem', opacity: 0.65 },
    { left: '58%', size: '1.6rem', opacity: 0.5 },
    { left: '66%', size: '2rem',   opacity: 0.6 },
    { left: '76%', size: '1.4rem', opacity: 0.5 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* blazing sun with pulsing halo */}
            <div className={`${BackgroundStyle.sunHalo} ${BackgroundStyle.pulse}`}
                 style={{ top: '18%', right: '20%', width: '13rem', height: '13rem' }} />
            <div className={BackgroundStyle.sunDisc}
                 style={{ top: '21%', right: '23%', width: '7rem', height: '7rem' }} />

            {/* birds crossing the sky */}
            {birds.map((b, i) => (
                <GiSeagull key={`bird-${i}`}
                           className={BackgroundStyle.flyAcross}
                           style={{ top: b.top, left: 0, fontSize: b.size, color: '#4a2c0a', opacity: 0.75,
                                    animationDuration: b.duration, animationDelay: b.delay }} />
            ))}

            {/* savanna ground strip */}
            <div className={BackgroundStyle.ground} />

            {/* tree clusters */}
            {palms.map((p, i) => (
                <GiPalmTree key={`palm-${i}`}
                            className={BackgroundStyle.sway}
                            style={{ left: p.left, bottom: p.bottom, fontSize: p.size, color: p.color,
                                     animationDelay: `${i * 1.4}s` }} />
            ))}
            <GiMonkey
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ left: '23%', bottom: '38%', fontSize: '3.2rem', color: '#8b5a2b' }} />

            {/* hero baobab tree */}
            <GiBaobab
                className={BackgroundStyle.sway}
                style={{ left: '60%', bottom: '20%', fontSize: '13rem', color: '#4a2c0a', opacity: 0.9 }} />

            {/* animals on the plain */}
            <GiOstrich
                className={`${BackgroundStyle.glow} ${BackgroundStyle.swayWalk}`}
                style={{ left: '55%', bottom: '20%', fontSize: '6rem', color: '#c8871e' }} />
            <GiLion
                className={`${BackgroundStyle.glow} ${BackgroundStyle.swayWalk}`}
                style={{ left: '42%', bottom: '20%', fontSize: '6.5rem', color: '#e8a23c',
                         animationDelay: '1.2s' }} />
            <GiElephant
                className={`${BackgroundStyle.glow} ${BackgroundStyle.walkAcross}`}
                style={{ left: 0, bottom: '21%', fontSize: '10rem', color: '#6b4f3a' }} />

            {/* grass tufts along the ground line */}
            {grassTufts.map((g, i) => (
                <GiPalmTree key={`grass-${i}`}
                            className={BackgroundStyle.sway}
                            style={{ left: g.left, bottom: '19%', fontSize: g.size, color: '#7a8f2c',
                                     opacity: g.opacity, animationDelay: `${i * 0.7}s` }} />
            ))}
        </div>
    </div>
);

export default Background;
