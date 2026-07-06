import React from 'react';
import {background as BackgroundStyle} from "Skins/halloween";
import {
    GiMoon,
    GiBat,
    GiSpiderWeb,
    GiTombstone,
    GiGhost,
    GiPumpkin,
    GiSpookyHouse,
    GiWitchFlight,
} from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const tombstones = [
    { left: '52%', size: '4rem',   color: '#1a0b2e' },
    { left: '59%', size: '2.8rem', color: '#241040' },
    { left: '66%', size: '4.6rem', color: '#241040' },
    { left: '74%', size: '3.4rem', color: '#1a0b2e' },
];

const ghosts = [
    { left: '32%', top: '24%', size: '4rem',   color: '#e8e0ff', opacity: 0.55, delay: 0 },
    { left: '62%', top: '36%', size: '3rem',   color: '#d4c8f8', opacity: 0.45, delay: 2 },
    { left: '46%', top: '50%', size: '2.4rem', color: '#e8e0ff', opacity: 0.4,  delay: 4 },
];

const bats = [
    { top: '18%', size: '2.6rem', color: '#1a0b2e', reverse: false, delay: '0s' },
    { top: '28%', size: '1.9rem', color: '#241040', reverse: true,  delay: '0s' },
    { top: '38%', size: '2.3rem', color: '#1a0b2e', reverse: false, delay: '6s' },
    { top: '48%', size: '1.6rem', color: '#2a1040', reverse: true,  delay: '10s' },
    { top: '24%', size: '1.4rem', color: '#241040', reverse: false, delay: '12s' },
];

const fog = [
    { left: '18%', bottom: '16%', width: '26rem', delay: '0s' },
    { left: '48%', bottom: '14%', width: '32rem', delay: '4s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* occasional lightning flash */}
            <div className={BackgroundStyle.lightning} />

            <GiMoon
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ top: '18%', right: '22%', fontSize: '8rem', color: '#f5f0d8' }} />
            <GiWitchFlight
                className={BackgroundStyle.witchFly}
                style={{ top: '20%', left: 0, fontSize: '4rem', color: '#0d0518', opacity: 0.9 }} />

            <GiSpiderWeb
                style={{ top: '14%', left: '15%', fontSize: '7rem', color: '#3a2050', opacity: 0.6 }} />
            <GiSpiderWeb
                className={BackgroundStyle.pulse}
                style={{ top: '13%', right: '16%', fontSize: '4.5rem', color: '#2a1540', opacity: 0.5,
                         transform: 'scaleX(-1)' }} />

            {bats.map((b, i) => (
                <GiBat key={`bat-${i}`}
                       className={b.reverse ? BackgroundStyle.driftSlowReverse : BackgroundStyle.driftSlow}
                       style={{ top: b.top, fontSize: b.size, color: b.color, animationDelay: b.delay }} />
            ))}
            {ghosts.map((g, i) => (
                <GiGhost key={`ghost-${i}`}
                         className={BackgroundStyle.floatGhost}
                         style={{ left: g.left, top: g.top, fontSize: g.size, color: g.color, opacity: g.opacity,
                                  animationDelay: `${g.delay}s` }} />
            ))}

            {/* haunted house on the hill */}
            <GiSpookyHouse
                className={BackgroundStyle.flicker}
                style={{ left: '20%', bottom: '19%', fontSize: '12rem', color: '#12071f', opacity: 0.95 }} />

            {tombstones.map((t, i) => (
                <GiTombstone key={`tomb-${i}`}
                             style={{ left: t.left, bottom: '19%', fontSize: t.size, color: t.color }} />
            ))}
            <GiPumpkin
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ left: '45%', bottom: '19%', fontSize: '5rem', color: '#ff7518' }} />
            <GiPumpkin
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ left: '79%', bottom: '19%', fontSize: '3.2rem', color: '#ff9a3c', opacity: 0.9,
                         animationDelay: '1.4s' }} />

            {/* ground fog drifting */}
            {fog.map((f, i) => (
                <div key={`fog-${i}`}
                     className={BackgroundStyle.fogDrift}
                     style={{ left: f.left, bottom: f.bottom, width: f.width, height: '4.5rem',
                              animationDelay: f.delay }} />
            ))}
        </div>
    </div>
);

export default Background;
