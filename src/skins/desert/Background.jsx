import React from 'react';
import {background as BackgroundStyle} from "Skins/desert";
import { GiPalmTree, GiCactus, GiCamel } from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const palms = [
    { left: '20%', size: '8rem',   color: '#3fae5a' },
    { left: '27%', size: '5rem',   color: '#2e8a44' },
    { left: '74%', size: '7rem',   color: '#3fae5a' },
    { left: '80%', size: '4.6rem', color: '#2e8a44' },
];

const cacti = [
    { left: '33%', size: '4.5rem', opacity: 0.9 },
    { left: '44%', size: '3rem',   opacity: 0.75 },
    { left: '58%', size: '5rem',   opacity: 0.85 },
    { left: '67%', size: '3.4rem', opacity: 0.7 },
];

/* wide flattened ellipses peeking above the ground line read as dunes */
const dunes = [
    { left: '8%',  bottom: '12%', width: '34rem', height: '9rem',  color: '#8a4a16', opacity: 0.5 },
    { left: '36%', bottom: '11%', width: '44rem', height: '11rem', color: '#7a3a14', opacity: 0.45 },
    { left: '62%', bottom: '12%', width: '30rem', height: '8rem',  color: '#8a4a16', opacity: 0.5 },
];

/* small camel caravan trailing the lead camel */
const caravan = [
    { size: '5.5rem', delay: '0s',   bottom: '21%' },
    { size: '4.2rem', delay: '2.2s', bottom: '20.5%' },
    { size: '4.8rem', delay: '4.1s', bottom: '21%' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <div className={`${BackgroundStyle.sunGlow} ${BackgroundStyle.glow}`}
                 style={{ position: 'absolute', top: '18%', right: '22%', width: '11rem', height: '11rem' }} />

            {/* rolling dune silhouettes behind the ground line */}
            {dunes.map((d, i) => (
                <div key={`dune-${i}`}
                     style={{ position: 'absolute', left: d.left, bottom: d.bottom,
                              width: d.width, height: d.height, background: d.color,
                              opacity: d.opacity, borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }} />
            ))}

            {/* camel caravan walking the dunes */}
            {caravan.map((c, i) => (
                <GiCamel key={`camel-${i}`}
                         className={BackgroundStyle.walkAcross}
                         style={{ bottom: c.bottom, left: 0, fontSize: c.size, color: '#e0a85c',
                                  opacity: 0.95, animationDelay: c.delay }} />
            ))}

            {/* tumbleweed rolling the other way */}
            <GiCactus
                className={BackgroundStyle.tumbleweed}
                style={{ bottom: '20%', left: 0, fontSize: '2.4rem', color: '#a8862c', opacity: 0.8 }} />

            {palms.map((p, i) => (
                <GiPalmTree key={`palm-${i}`}
                            className={BackgroundStyle.sway}
                            style={{ left: p.left, bottom: '19%', fontSize: p.size, color: p.color,
                                     animationDelay: `${i * 1.1}s` }} />
            ))}
            {cacti.map((c, i) => (
                <GiCactus key={`cactus-${i}`}
                          className={BackgroundStyle.heatShimmer}
                          style={{ left: c.left, bottom: '19%', fontSize: c.size, color: '#3fae5a',
                                   opacity: c.opacity, animationDelay: `${i * 0.8}s` }} />
            ))}
        </div>
    </div>
);

export default Background;
