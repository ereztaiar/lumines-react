import React from 'react';
import {background as BackgroundStyle} from "Skins/forest-zen";
import { GiPineTree, GiMountains, GiSunCloud, GiMapleLeaf, GiDeer } from 'react-icons/gi';
import { FaCircle } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const trees = [
    { left: '18%', size: '12rem', color: '#1c2b14', opacity: 0.95 },
    { left: '25%', size: '8rem',  color: '#28401e', opacity: 0.8 },
    { left: '31%', size: '10rem', color: '#1c2b14', opacity: 0.9 },
    { left: '38%', size: '6rem',  color: '#28401e', opacity: 0.75 },
    { left: '64%', size: '7rem',  color: '#28401e', opacity: 0.75 },
    { left: '70%', size: '9.5rem', color: '#28401e', opacity: 0.85 },
    { left: '77%', size: '12rem', color: '#1c2b14', opacity: 0.95 },
    { left: '83%', size: '7rem',  color: '#28401e', opacity: 0.75 },
];

const mist = [
    { left: '20%', top: '52%', size: '7rem', opacity: 0.14 },
    { left: '40%', top: '60%', size: '9rem', opacity: 0.12 },
    { left: '58%', top: '55%', size: '8rem', opacity: 0.14 },
    { left: '74%', top: '62%', size: '7rem', opacity: 0.12 },
];

const leaves = [
    { left: '20%', size: '1.1rem', color: '#a8e838', delay: 0,   opacity: 0.8 },
    { left: '30%', size: '0.9rem', color: '#e89050', delay: 2,   opacity: 0.7 },
    { left: '42%', size: '1.2rem', color: '#a8e838', delay: 5,   opacity: 0.75 },
    { left: '54%', size: '1rem',   color: '#e89050', delay: 1,   opacity: 0.65 },
    { left: '66%', size: '1.1rem', color: '#c8f040', delay: 7,   opacity: 0.7 },
    { left: '76%', size: '0.9rem', color: '#a8e838', delay: 3.5, opacity: 0.8 },
    { left: '36%', size: '1rem',   color: '#c8f040', delay: 8.6, opacity: 0.7 },
    { left: '60%', size: '0.8rem', color: '#e89050', delay: 6.2, opacity: 0.65 },
];

const fireflies = [
    { left: '26%', top: '48%', delay: '0s' },
    { left: '35%', top: '58%', delay: '1.3s' },
    { left: '47%', top: '50%', delay: '2.6s' },
    { left: '58%', top: '60%', delay: '0.7s' },
    { left: '68%', top: '46%', delay: '1.9s' },
    { left: '74%', top: '56%', delay: '3.2s' },
    { left: '41%', top: '66%', delay: '4.1s' },
    { left: '63%', top: '68%', delay: '2.2s' },
];

/* soft sunrays slanting through the canopy */
const rays = [
    { left: '30%', delay: '0s' },
    { left: '48%', delay: '2.8s' },
    { left: '64%', delay: '5.6s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiMountains
                style={{ left: '0%', bottom: '30%', width: '100%', fontSize: '16rem', color: '#2e3e29', opacity: 0.6 }} />
            <GiSunCloud
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '17%', right: '22%', fontSize: '7rem', color: '#e8e4d8' }} />

            {rays.map((r, i) => (
                <div key={`ray-${i}`}
                     className={BackgroundStyle.sunRay}
                     style={{ left: r.left, animationDelay: r.delay }} />
            ))}

            {mist.map((m, i) => (
                <FaCircle key={`mist-${i}`}
                          className={BackgroundStyle.driftSlow}
                          style={{ left: m.left, top: m.top, fontSize: m.size, opacity: m.opacity, color: '#e8e4d8',
                                   animationDelay: `${i * 2}s` }} />
            ))}

            {/* deer grazing at the treeline */}
            <GiDeer
                className={BackgroundStyle.grazeBob}
                style={{ left: '50%', bottom: '19%', fontSize: '5rem', color: '#1c2b14', opacity: 0.95 }} />

            {trees.map((t, i) => (
                <GiPineTree key={`tree-${i}`}
                            className={i % 2 ? BackgroundStyle.sway : BackgroundStyle.floatSlow}
                            style={{ left: t.left, bottom: '18%', fontSize: t.size, color: t.color, opacity: t.opacity,
                                     animationDelay: `${i * 0.8}s` }} />
            ))}
            {leaves.map((l, i) => (
                <GiMapleLeaf key={`leaf-${i}`}
                             className={BackgroundStyle.fallLeaf}
                             style={{ left: l.left, top: '-5%', fontSize: l.size, color: l.color, opacity: l.opacity,
                                      animationDelay: `${l.delay}s` }} />
            ))}
            {fireflies.map((f, i) => (
                <div key={`firefly-${i}`}
                     className={BackgroundStyle.firefly}
                     style={{ left: f.left, top: f.top, animationDelay: f.delay }} />
            ))}
        </div>
    </div>
);

export default Background;
