import React from 'react';
import {background as BackgroundStyle} from "Skins/aurora";
import { GiPolarStar, GiPineTree, GiWolfHowl, GiDeer } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const stars = [
    { left: '20%', top: '18%', size: '0.55rem', cls: 'blinkSlow' },
    { left: '25%', top: '28%', size: '0.4rem',  cls: 'pulse' },
    { left: '30%', top: '16%', size: '0.5rem',  cls: 'blinkFast' },
    { left: '36%', top: '24%', size: '0.35rem', cls: 'pulse' },
    { left: '42%', top: '17%', size: '0.45rem', cls: 'blinkSlow' },
    { left: '48%', top: '26%', size: '0.55rem', cls: 'blinkFast' },
    { left: '54%', top: '18%', size: '0.4rem',  cls: 'pulse' },
    { left: '60%', top: '28%', size: '0.5rem',  cls: 'blinkSlow' },
    { left: '66%', top: '17%', size: '0.45rem', cls: 'blinkFast' },
    { left: '72%', top: '26%', size: '0.35rem', cls: 'pulse' },
    { left: '78%', top: '20%', size: '0.5rem',  cls: 'blinkSlow' },
    { left: '82%', top: '30%', size: '0.4rem',  cls: 'pulse' },
    { left: '22%', top: '40%', size: '0.4rem',  cls: 'blinkFast' },
    { left: '46%', top: '38%', size: '0.35rem', cls: 'blinkSlow' },
    { left: '70%', top: '42%', size: '0.45rem', cls: 'pulse' },
    { left: '34%', top: '46%', size: '0.3rem',  cls: 'blinkFast' },
    { left: '58%', top: '48%', size: '0.4rem',  cls: 'blinkSlow' },
    { left: '80%', top: '50%', size: '0.35rem', cls: 'pulse' },
];

const trees = [
    { left: '19%', size: '7rem',   color: '#0a1626' },
    { left: '25%', size: '5rem',   color: '#0c1a2e' },
    { left: '31%', size: '8.5rem', color: '#0a1626' },
    { left: '38%', size: '4.5rem', color: '#0c1a2e' },
    { left: '62%', size: '5.5rem', color: '#0c1a2e' },
    { left: '69%', size: '8rem',   color: '#0a1626' },
    { left: '76%', size: '5rem',   color: '#0c1a2e' },
    { left: '81%', size: '6.5rem', color: '#0a1626' },
];

const ribbons = [
    { top: '20%', left: '14%', width: '70%', delay: '0s',
      background: 'linear-gradient(90deg, rgba(57,255,157,0.5), rgba(157,77,255,0.4))' },
    { top: '30%', left: '22%', width: '60%', delay: '2.5s',
      background: 'linear-gradient(90deg, rgba(77,200,255,0.42), rgba(57,255,157,0.35))' },
    { top: '40%', left: '17%', width: '55%', delay: '5s',
      background: 'linear-gradient(90deg, rgba(157,77,255,0.36), rgba(77,200,255,0.36))' },
    { top: '26%', left: '34%', width: '48%', delay: '7.5s',
      background: 'linear-gradient(90deg, rgba(255,110,199,0.3), rgba(157,77,255,0.3))' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {ribbons.map((r, i) => (
                <div key={`ribbon-${i}`}
                     className={BackgroundStyle.ribbon}
                     style={{ top: r.top, left: r.left, width: r.width, background: r.background,
                              animationDelay: r.delay }} />
            ))}
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={BackgroundStyle[s.cls]}
                        style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff' }} />
            ))}

            {/* shooting star */}
            <div className={BackgroundStyle.shootingStar} style={{ top: '20%', left: 0 }} />

            <GiPolarStar
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '18%', right: '20%', fontSize: '6.5rem', color: '#4dc8ff', opacity: 0.85 }} />

            {/* wildlife on the ridge */}
            <GiWolfHowl
                className={BackgroundStyle.glow}
                style={{ left: '52%', bottom: '19%', fontSize: '5.5rem', color: '#0a1626' }} />
            <GiDeer
                style={{ left: '44%', bottom: '19%', fontSize: '4rem', color: '#0c1a2e', opacity: 0.95 }} />

            {trees.map((t, i) => (
                <GiPineTree key={`tree-${i}`}
                            style={{ left: t.left, bottom: '18%', fontSize: t.size, color: t.color }} />
            ))}
        </div>
    </div>
);

export default Background;
