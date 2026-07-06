import React from 'react';
import {background as BackgroundStyle} from "Skins/honeycomb";
import { GiBeehive, GiBee, GiHoneycomb, GiDrippingHoney } from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const bees = [
    { left: '24%', top: '24%', size: '2.4rem', delay: '0s' },
    { left: '38%', top: '18%', size: '1.7rem', delay: '0.8s' },
    { left: '54%', top: '28%', size: '2.2rem', delay: '1.6s' },
    { left: '66%', top: '20%', size: '1.5rem', delay: '0.3s' },
    { left: '76%', top: '32%', size: '2rem',   delay: '2.2s' },
];

/* faint hex lattice cells tiling the backdrop */
const lattice = [
    { left: '20%', top: '20%', size: '4.5rem', opacity: 0.14, delay: '0s' },
    { left: '28%', top: '34%', size: '4.5rem', opacity: 0.1,  delay: '1.2s' },
    { left: '36%', top: '18%', size: '4.5rem', opacity: 0.12, delay: '2.4s' },
    { left: '44%', top: '32%', size: '4.5rem', opacity: 0.1,  delay: '3.6s' },
    { left: '52%', top: '16%', size: '4.5rem', opacity: 0.14, delay: '4.8s' },
    { left: '60%', top: '30%', size: '4.5rem', opacity: 0.1,  delay: '0.6s' },
    { left: '68%', top: '18%', size: '4.5rem', opacity: 0.12, delay: '1.8s' },
    { left: '76%', top: '34%', size: '4.5rem', opacity: 0.1,  delay: '3s' },
    { left: '24%', top: '52%', size: '4.5rem', opacity: 0.1,  delay: '4.2s' },
    { left: '72%', top: '52%', size: '4.5rem', opacity: 0.1,  delay: '5.4s' },
];

const combPatches = [
    { left: '19%', size: '8rem',   opacity: 0.6 },
    { left: '32%', size: '5.5rem', opacity: 0.45 },
    { left: '58%', size: '9rem',   opacity: 0.55 },
    { left: '74%', size: '6rem',   opacity: 0.4 },
];

const drips = [
    { left: '24%', size: '3.4rem', delay: '0s' },
    { left: '40%', size: '2.6rem', delay: '1.3s' },
    { left: '56%', size: '3.6rem', delay: '0.6s' },
    { left: '70%', size: '2.8rem', delay: '2s' },
    { left: '80%', size: '2.4rem', delay: '2.8s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {lattice.map((c, i) => (
                <GiHoneycomb key={`lattice-${i}`}
                             className={BackgroundStyle.latticePulse}
                             style={{ left: c.left, top: c.top, fontSize: c.size, color: '#f5a623',
                                      opacity: c.opacity, animationDelay: c.delay }} />
            ))}
            {combPatches.map((c, i) => (
                <GiHoneycomb key={`comb-${i}`}
                             style={{ left: c.left, bottom: '18%', fontSize: c.size, color: '#7a4a14',
                                      opacity: c.opacity }} />
            ))}
            <GiBeehive
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '20%', right: '22%', fontSize: '11rem', color: '#7a4a14' }} />
            {drips.map((d, i) => (
                <GiDrippingHoney key={`drip-${i}`}
                                  className={BackgroundStyle.drip}
                                  style={{ left: d.left, top: '-2%', fontSize: d.size, color: '#f5a623',
                                           opacity: 0.85, animationDelay: d.delay }} />
            ))}
            {/* honey droplets falling from the drips */}
            {drips.map((d, i) => (
                <div key={`droplet-${i}`}
                     className={BackgroundStyle.dropletFall}
                     style={{ left: `calc(${d.left} + 0.6rem)`, top: '4%', width: '0.55rem', height: '0.8rem',
                              animationDelay: `${1.2 + i * 2.1}s` }} />
            ))}
            {bees.map((b, i) => (
                <GiBee key={`bee-${i}`}
                       className={`${BackgroundStyle.glow} ${BackgroundStyle.buzz}`}
                       style={{ left: b.left, top: b.top, fontSize: b.size, color: '#ffc107',
                                animationDelay: b.delay }} />
            ))}
            {/* worker bee commuting across the comb */}
            <GiBee
                className={BackgroundStyle.beeCross}
                style={{ left: 0, top: '44%', fontSize: '2.6rem', color: '#ffc107', opacity: 0.9 }} />
        </div>
    </div>
);

export default Background;
