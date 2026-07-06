import React from 'react';
import {background as BackgroundStyle} from "Skins/yellow";
import {
    GiSun,
    GiBeehive,
    GiBee,
    GiSunflower,
    GiHoneycomb,
    GiPollenDust,
} from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const hives = [
    { left: '22%', size: '8rem',   color: '#5a4318', opacity: 0.7 },
    { left: '34%', size: '5rem',   color: '#8d6e2f', opacity: 0.6 },
    { left: '62%', size: '9.5rem', color: '#4a3614', opacity: 0.75 },
    { left: '76%', size: '6rem',   color: '#8d6e2f', opacity: 0.6 },
];

const sunflowers = [
    { left: '19%', size: '4.5rem', opacity: 0.85 },
    { left: '29%', size: '3.2rem', opacity: 0.7 },
    { left: '42%', size: '5rem',   opacity: 0.8 },
    { left: '52%', size: '3.4rem', opacity: 0.65 },
    { left: '58%', size: '4.4rem', opacity: 0.75 },
    { left: '72%', size: '3.6rem', opacity: 0.7 },
    { left: '80%', size: '4.2rem', opacity: 0.75 },
];

const honeycombs = [
    { left: '20%', top: '16%', size: '2.2rem', opacity: 0.4 },
    { left: '30%', top: '20%', size: '1.5rem', opacity: 0.3 },
    { left: '42%', top: '15%', size: '2.4rem', opacity: 0.35 },
    { left: '54%', top: '19%', size: '1.7rem', opacity: 0.3 },
    { left: '64%', top: '15%', size: '2.3rem', opacity: 0.35 },
    { left: '74%', top: '18%', size: '1.6rem', opacity: 0.3 },
];

const pollen = [
    { left: '22%', top: '50%', size: '0.7rem', opacity: 0.7 },
    { left: '32%', top: '62%', size: '0.6rem', opacity: 0.5 },
    { left: '46%', top: '54%', size: '0.8rem', opacity: 0.65 },
    { left: '58%', top: '66%', size: '0.6rem', opacity: 0.55 },
    { left: '70%', top: '56%', size: '0.7rem', opacity: 0.6 },
    { left: '80%', top: '64%', size: '0.65rem', opacity: 0.5 },
];

/* bees commuting between the hives and the flowers */
const flightBees = [
    { top: '30%', size: '2.4rem', duration: '17s', delay: '0s',  opacity: 0.9 },
    { top: '40%', size: '1.8rem', duration: '23s', delay: '5s',  opacity: 0.7 },
    { top: '24%', size: '2.1rem', duration: '20s', delay: '10s', opacity: 0.8 },
];

const hoverBees = [
    { left: '26%', top: '36%', size: '2rem',   opacity: 0.85 },
    { left: '48%', top: '26%', size: '2.3rem', opacity: 0.8 },
    { left: '66%', top: '38%', size: '1.8rem', opacity: 0.7 },
    { left: '76%', top: '28%', size: '2.1rem', opacity: 0.75 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <div className={BackgroundStyle.title}>Hive</div>
            <GiSun
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '16%', right: '20%', fontSize: '9rem', color: '#fff59d' }}
            />
            {honeycombs.map((h, i) => (
                <GiHoneycomb key={`comb-${i}`}
                             style={{ left: h.left, top: h.top, fontSize: h.size, color: '#ffc107', opacity: h.opacity }} />
            ))}
            {hives.map((h, i) => (
                <GiBeehive key={`hive-${i}`}
                           style={{ left: h.left, bottom: '18%', fontSize: h.size, color: h.color, opacity: h.opacity }} />
            ))}
            {sunflowers.map((s, i) => (
                <GiSunflower key={`flower-${i}`}
                             className={BackgroundStyle.floatSlow}
                             style={{ left: s.left, bottom: '18%', fontSize: s.size, color: '#ffc107',
                                      opacity: s.opacity, animationDelay: `${i * 0.8}s` }} />
            ))}
            {pollen.map((p, i) => (
                <GiPollenDust key={`pollen-${i}`}
                              className={BackgroundStyle.blinkSlow}
                              style={{ left: p.left, top: p.top, fontSize: p.size, color: '#fff3c4', opacity: p.opacity }} />
            ))}
            {hoverBees.map((b, i) => (
                <GiBee key={`bee-${i}`}
                       className={BackgroundStyle.buzz}
                       style={{ left: b.left, top: b.top, fontSize: b.size, color: '#ffd54f',
                                opacity: b.opacity, animationDelay: `${i * 0.5}s` }} />
            ))}
            {flightBees.map((b, i) => (
                <GiBee key={`flight-bee-${i}`}
                       className={BackgroundStyle.beeFlight}
                       style={{ left: 0, top: b.top, fontSize: b.size, color: '#ffd54f',
                                opacity: b.opacity, animationDuration: b.duration, animationDelay: b.delay }} />
            ))}
        </div>
    </div>
);

export default Background;
