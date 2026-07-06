import React from 'react';
import {background as BackgroundStyle} from "Skins/arcade";
import { GiRetroController, GiJoystick, GiAlienBug } from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const pixelColors = ['#39ff14', '#ff00ff', '#00eaff', '#ffe600'];

const pixels = [
    { left: '20%', top: '18%', cls: 'blinkFast' },
    { left: '26%', top: '38%', cls: 'blinkSlow' },
    { left: '32%', top: '16%', cls: 'blinkFast' },
    { left: '38%', top: '48%', cls: 'blinkSlow' },
    { left: '44%', top: '22%', cls: 'blinkFast' },
    { left: '50%', top: '40%', cls: 'blinkSlow' },
    { left: '56%', top: '16%', cls: 'blinkFast' },
    { left: '62%', top: '44%', cls: 'blinkSlow' },
    { left: '68%', top: '24%', cls: 'blinkFast' },
    { left: '74%', top: '42%', cls: 'blinkSlow' },
    { left: '80%', top: '18%', cls: 'blinkFast' },
    { left: '23%', top: '58%', cls: 'blinkSlow' },
    { left: '47%', top: '62%', cls: 'blinkFast' },
    { left: '71%', top: '60%', cls: 'blinkSlow' },
];

const invaders = [
    { left: '0rem',  color: '#39ff14' },
    { left: '3.5rem', color: '#ff00ff' },
    { left: '7rem',  color: '#00eaff' },
    { left: '10.5rem', color: '#39ff14' },
    { left: '14rem', color: '#ffe600' },
];

const scorePops = [
    { left: '28%', top: '46%', text: '+100', color: '#39ff14', delay: '0s' },
    { left: '58%', top: '52%', text: '+300', color: '#ffe600', delay: '2.7s' },
    { left: '42%', top: '58%', text: '+500', color: '#ff00ff', delay: '5.4s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* CRT scanline sweeping down */}
            <div className={BackgroundStyle.scanSweep} />

            {pixels.map((p, i) => (
                <div key={`pixel-${i}`}
                     className={BackgroundStyle[p.cls]}
                     style={{ position: 'absolute', left: p.left, top: p.top,
                              width: '1rem', height: '1rem',
                              background: pixelColors[i % pixelColors.length] }} />
            ))}

            {/* marching invader squadron */}
            <div className={BackgroundStyle.invaderMarch}
                 style={{ position: 'absolute', left: '24%', top: '22%' }}>
                {invaders.map((inv, i) => (
                    <GiAlienBug key={`invader-${i}`}
                                className={BackgroundStyle.invaderWiggle}
                                style={{ position: 'absolute', left: inv.left, fontSize: '2.6rem',
                                         color: inv.color, animationDelay: `${i * 0.2}s` }} />
                ))}
            </div>

            {/* floating score pops */}
            {scorePops.map((s, i) => (
                <div key={`pop-${i}`}
                     className={BackgroundStyle.scorePop}
                     style={{ position: 'absolute', left: s.left, top: s.top, color: s.color,
                              animationDelay: s.delay }}>
                    {s.text}
                </div>
            ))}

            <GiJoystick
                className={`${BackgroundStyle.glow} ${BackgroundStyle.driftSlow}`}
                style={{ top: '48%', left: '25%', fontSize: '8rem', color: '#ff00ff', opacity: 0.9 }} />
            <GiRetroController
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '46%', right: '27%', fontSize: '13rem', color: '#39ff14' }} />
        </div>
    </div>
);

export default Background;
