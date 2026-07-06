import React from 'react';
import {background as BackgroundStyle} from "Skins/synthwave";
import { GiSun, GiPalmTree, GiMountains } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const stars = [
    { left: '20%', top: '18%', size: '1rem',   opacity: 0.9 },
    { left: '26%', top: '28%', size: '0.6rem', opacity: 0.6 },
    { left: '33%', top: '16%', size: '0.8rem', opacity: 0.7 },
    { left: '41%', top: '24%', size: '0.5rem', opacity: 0.5 },
    { left: '60%', top: '20%', size: '0.9rem', opacity: 0.8 },
    { left: '68%', top: '28%', size: '0.6rem', opacity: 0.6 },
    { left: '76%', top: '17%', size: '1.1rem', opacity: 0.9 },
    { left: '82%', top: '26%', size: '0.5rem', opacity: 0.5 },
    { left: '50%', top: '16%', size: '0.7rem', opacity: 0.7 },
    { left: '23%', top: '40%', size: '0.5rem', opacity: 0.6 },
    { left: '79%', top: '42%', size: '0.6rem', opacity: 0.6 },
];

const palms = [
    { left: '19%', size: '11rem', color: '#ff2bd6', opacity: 0.9 },
    { left: '76%', size: '12rem', color: '#7a2bff', opacity: 0.85 },
    { left: '29%', size: '6.5rem', color: '#3d1a5e', opacity: 0.65 },
    { left: '68%', size: '7.5rem', color: '#3d1a5e', opacity: 0.65 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={i % 2 ? BackgroundStyle.pulse : BackgroundStyle.blinkSlow}
                        style={{ left: s.left, top: s.top, fontSize: s.size, opacity: s.opacity, color: '#ffffff' }} />
            ))}

            {/* shooting star streaking over the grid */}
            <div className={BackgroundStyle.shootingStar} style={{ top: '22%', left: 0 }} />

            <GiMountains
                style={{ left: '0%', bottom: '28%', width: '100%', fontSize: '14rem', color: '#2a0f44', opacity: 0.7 }} />

            {/* retro sun with horizontal slat mask */}
            <div className={BackgroundStyle.sunWrap}
                 style={{ top: '18%', left: '50%' }}>
                <GiSun
                    className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                    style={{ fontSize: '10rem', color: '#ff8a3d' }} />
            </div>

            {palms.map((p, i) => (
                <GiPalmTree key={`palm-${i}`}
                            className={BackgroundStyle.floatSlow}
                            style={{ left: p.left, bottom: '16%', fontSize: p.size, color: p.color,
                                     opacity: p.opacity, animationDelay: `${i * 1.2}s` }} />
            ))}
            <div className={BackgroundStyle.gridFloor} />
        </div>
    </div>
);

export default Background;
