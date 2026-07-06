import React from 'react';
import {background as BackgroundStyle} from "Skins/carnival";
import {
    GiClown,
    GiAirBalloon,
    GiBalloons,
    GiPopcorn,
    GiCampingTent,
    GiShipWheel,
    GiJuggler,
} from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const balloons = [
    { left: '24%', size: '3.6rem', color: '#ff3b3b', delay: '0s' },
    { left: '38%', size: '2.8rem', color: '#2f6fed', delay: '4s' },
    { left: '52%', size: '3.2rem', color: '#ffd23f', delay: '8s' },
    { left: '66%', size: '2.6rem', color: '#3ec46a', delay: '2s' },
    { left: '78%', size: '3rem',   color: '#ff3b3b', delay: '6s' },
];

const popcorns = [
    { left: '30%', size: '3rem',   opacity: 0.9 },
    { left: '38%', size: '2.2rem', opacity: 0.75 },
    { left: '46%', size: '3.4rem', opacity: 0.9 },
    { left: '54%', size: '2.4rem', opacity: 0.8 },
    { left: '61%', size: '3rem',   opacity: 0.85 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* bunting ribbon strung across the sky */}
            <div className={`${BackgroundStyle.bunting} ${BackgroundStyle.buntingSway}`} />

            <GiClown
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '20%', left: '44%', fontSize: '8rem', color: '#ffffff' }} />
            <GiAirBalloon
                className={`${BackgroundStyle.glow} ${BackgroundStyle.bobUp}`}
                style={{ top: '16%', right: '24%', fontSize: '6rem', color: '#ff3b3b' }} />

            {/* balloons rising and respawning */}
            {balloons.map((b, i) => (
                <GiBalloons key={`balloon-${i}`}
                            className={BackgroundStyle.riseLoop}
                            style={{ left: b.left, bottom: '-12%', fontSize: b.size, color: b.color,
                                     opacity: 0.9, animationDelay: b.delay }} />
            ))}

            {/* big top tent */}
            <GiCampingTent
                className={BackgroundStyle.glow}
                style={{ left: '24%', bottom: '19%', fontSize: '12rem', color: '#d42a2a' }} />
            <GiJuggler
                className={BackgroundStyle.floatSlow}
                style={{ left: '35%', bottom: '19%', fontSize: '4.5rem', color: '#ffd23f',
                         animationDelay: '1s' }} />

            {/* ferris wheel turning on the midway */}
            <GiShipWheel
                className={`${BackgroundStyle.glow} ${BackgroundStyle.spinSlow}`}
                style={{ left: '66%', bottom: '22%', fontSize: '13rem', color: '#ffd23f', opacity: 0.95 }} />

            {popcorns.map((p, i) => (
                <GiPopcorn key={`popcorn-${i}`}
                           className={BackgroundStyle.pulse}
                           style={{ left: p.left, bottom: '18%', fontSize: p.size, color: '#ffd23f',
                                    opacity: p.opacity, animationDelay: `${i * 0.7}s` }} />
            ))}
        </div>
    </div>
);

export default Background;
