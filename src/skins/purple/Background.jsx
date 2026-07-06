import React from 'react';

import {background as BackgroundStyle} from "Skins/purple";

/* Unlike the newer skins, purple's .background is NOT scaled 1.5x, so the
   full 0–100% range is visible — positions read as-is. */

/* big translucent glow orbs echoing the circles of the svg collage */
const orbs = [
    { left: '6%',  top: '12%', size: '16rem', color: '#a855f7', opacity: 0.28, cls: 'floatSlow' },
    { left: '68%', top: '55%', size: '20rem', color: '#d946ef', opacity: 0.22, cls: 'driftSlow' },
    { left: '38%', top: '4%',  size: '11rem', color: '#7c3aed', opacity: 0.3,  cls: 'floatSlow', delay: '2.5s' },
    { left: '14%', top: '58%', size: '13rem', color: '#6366f1', opacity: 0.25, cls: 'driftSlow', delay: '4s' },
    { left: '82%', top: '8%',  size: '9rem',  color: '#d946ef', opacity: 0.3,  cls: 'breathe' },
    { left: '48%', top: '66%', size: '8rem',  color: '#a855f7', opacity: 0.26, cls: 'breathe', delay: '3s' },
];

/* rounded squares echoing the block tiles of the svg collage */
const tiles = [
    { left: '24%', top: '20%', size: '7rem',   color: '#d946ef', opacity: 0.35, cls: 'spinDrift' },
    { left: '58%', top: '14%', size: '4.5rem', color: '#a855f7', opacity: 0.4,  cls: 'spinDriftReverse' },
    { left: '78%', top: '38%', size: '6rem',   color: '#7c3aed', opacity: 0.35, cls: 'spinDrift', delay: '5s' },
    { left: '8%',  top: '38%', size: '3.6rem', color: '#6366f1', opacity: 0.4,  cls: 'spinDriftReverse', delay: '8s' },
    { left: '40%', top: '78%', size: '5rem',   color: '#d946ef', opacity: 0.3,  cls: 'spinDrift', delay: '11s' },
    { left: '88%', top: '70%', size: '4rem',   color: '#a855f7', opacity: 0.35, cls: 'spinDriftReverse', delay: '3s' },
];

/* small blinking sparks scattered between the blobs */
const sparks = [
    { left: '12%', top: '8%',  size: '0.5rem', cls: 'blinkSlow' },
    { left: '30%', top: '48%', size: '0.4rem', cls: 'blinkFast' },
    { left: '46%', top: '26%', size: '0.55rem', cls: 'blinkSlow' },
    { left: '60%', top: '70%', size: '0.4rem', cls: 'blinkFast' },
    { left: '72%', top: '24%', size: '0.5rem', cls: 'blinkSlow' },
    { left: '86%', top: '52%', size: '0.45rem', cls: 'blinkFast' },
    { left: '20%', top: '76%', size: '0.5rem', cls: 'blinkSlow' },
    { left: '52%', top: '52%', size: '0.35rem', cls: 'blinkFast' },
    { left: '94%', top: '30%', size: '0.4rem', cls: 'blinkSlow' },
    { left: '4%',  top: '86%', size: '0.45rem', cls: 'blinkFast' },
];

const Background = () => {
    return (
        <div className={BackgroundStyle.background}>
            <div className={BackgroundStyle.scene}>
                <div className={BackgroundStyle.hueShimmer} />
                {orbs.map((o, i) => (
                    <div key={`orb-${i}`}
                         className={`${BackgroundStyle.orb} ${BackgroundStyle[o.cls]}`}
                         style={{ left: o.left, top: o.top, width: o.size, height: o.size,
                                  background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
                                  opacity: o.opacity, animationDelay: o.delay }} />
                ))}
                {tiles.map((t, i) => (
                    <div key={`tile-${i}`}
                         className={`${BackgroundStyle.tile} ${BackgroundStyle[t.cls]}`}
                         style={{ left: t.left, top: t.top, width: t.size, height: t.size,
                                  background: `linear-gradient(135deg, ${t.color} 0%, transparent 130%)`,
                                  opacity: t.opacity, animationDelay: t.delay }} />
                ))}
                {sparks.map((s, i) => (
                    <div key={`spark-${i}`}
                         className={`${BackgroundStyle.spark} ${BackgroundStyle[s.cls]}`}
                         style={{ left: s.left, top: s.top, width: s.size, height: s.size }} />
                ))}
            </div>
        </div>
    )
}

export default Background;
