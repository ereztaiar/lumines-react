import React from 'react';
import {background as BackgroundStyle} from "Skins/galaxy";
import { GiRingedPlanet, GiPlanetCore, GiSparkles, GiRocketFlight } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const stars = [
    { left: '18%', top: '18%', size: '0.6rem',  cls: 'blinkSlow' },
    { left: '22%', top: '32%', size: '0.4rem',  cls: 'pulse' },
    { left: '26%', top: '20%', size: '0.55rem', cls: 'blinkFast' },
    { left: '30%', top: '44%', size: '0.35rem', cls: 'pulse' },
    { left: '34%', top: '26%', size: '0.5rem',  cls: 'blinkSlow' },
    { left: '38%', top: '52%', size: '0.6rem',  cls: 'blinkFast' },
    { left: '42%', top: '18%', size: '0.4rem',  cls: 'pulse' },
    { left: '46%', top: '38%', size: '0.55rem', cls: 'blinkSlow' },
    { left: '50%', top: '24%', size: '0.5rem',  cls: 'blinkFast' },
    { left: '54%', top: '58%', size: '0.35rem', cls: 'pulse' },
    { left: '58%', top: '30%', size: '0.45rem', cls: 'blinkSlow' },
    { left: '62%', top: '46%', size: '0.6rem',  cls: 'blinkFast' },
    { left: '66%', top: '20%', size: '0.4rem',  cls: 'pulse' },
    { left: '70%', top: '38%', size: '0.55rem', cls: 'blinkSlow' },
    { left: '74%', top: '26%', size: '0.45rem', cls: 'blinkFast' },
    { left: '78%', top: '52%', size: '0.35rem', cls: 'pulse' },
    { left: '82%', top: '32%', size: '0.5rem',  cls: 'blinkSlow' },
    { left: '20%', top: '58%', size: '0.4rem',  cls: 'blinkFast' },
    { left: '28%', top: '68%', size: '0.5rem',  cls: 'pulse' },
    { left: '40%', top: '72%', size: '0.35rem', cls: 'blinkSlow' },
    { left: '52%', top: '76%', size: '0.45rem', cls: 'blinkFast' },
    { left: '64%', top: '66%', size: '0.4rem',  cls: 'pulse' },
    { left: '76%', top: '72%', size: '0.55rem', cls: 'blinkSlow' },
    { left: '80%', top: '62%', size: '0.35rem', cls: 'blinkFast' },
    { left: '24%', top: '48%', size: '0.3rem',  cls: 'pulse' },
    { left: '36%', top: '62%', size: '0.4rem',  cls: 'blinkSlow' },
    { left: '48%', top: '66%', size: '0.3rem',  cls: 'blinkFast' },
    { left: '60%', top: '54%', size: '0.35rem', cls: 'pulse' },
    { left: '72%', top: '58%', size: '0.3rem',  cls: 'blinkSlow' },
    { left: '44%', top: '48%', size: '0.4rem',  cls: 'blinkFast' },
];

/* soft nebula clouds with drifting hue */
const nebulae = [
    { left: '20%', top: '22%', width: '18rem', height: '10rem', color: 'rgba(236, 72, 153, 0.25)', delay: '0s' },
    { left: '52%', top: '48%', width: '22rem', height: '12rem', color: 'rgba(124, 58, 237, 0.28)', delay: '4s' },
    { left: '64%', top: '18%', width: '14rem', height: '8rem',  color: 'rgba(103, 232, 249, 0.18)', delay: '8s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {nebulae.map((n, i) => (
                <div key={`nebula-${i}`}
                     className={BackgroundStyle.nebulaDrift}
                     style={{ left: n.left, top: n.top, width: n.width, height: n.height,
                              background: `radial-gradient(ellipse, ${n.color} 0%, transparent 70%)`,
                              animationDelay: n.delay }} />
            ))}
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={BackgroundStyle[s.cls]}
                        style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff' }} />
            ))}

            {/* comet streaking across */}
            <div className={BackgroundStyle.comet}
                 style={{ top: '26%', left: 0 }} />

            <GiPlanetCore
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '22%', left: '22%', fontSize: '5rem', color: '#ec4899', opacity: 0.6 }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '58%', right: '20%', fontSize: '3.5rem', color: '#67e8f9', opacity: 0.7 }} />
            <GiRingedPlanet
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '24%', right: '24%', fontSize: '12rem', color: '#a78bfa' }} />
            <GiRingedPlanet
                className={BackgroundStyle.spinSlow}
                style={{ bottom: '20%', left: '24%', fontSize: '7rem', color: '#fbbf24', opacity: 0.6 }} />
            <GiRocketFlight
                className={BackgroundStyle.rocketDrift}
                style={{ top: '64%', left: 0, fontSize: '3rem', color: '#e8e0ff', opacity: 0.8 }} />
        </div>
    </div>
);

export default Background;
