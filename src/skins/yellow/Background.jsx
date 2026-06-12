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

const hives = [
    { left: '4%',  size: '6rem',  color: '#5a4318', opacity: 0.55 },
    { left: '16%', size: '4rem',  color: '#8d6e2f', opacity: 0.5 },
    { left: '30%', size: '7.5rem', color: '#4a3614', opacity: 0.6 },
    { left: '46%', size: '4.5rem', color: '#8d6e2f', opacity: 0.45 },
    { left: '60%', size: '6.5rem', color: '#5a4318', opacity: 0.55 },
    { left: '75%', size: '5rem',  color: '#8d6e2f', opacity: 0.5 },
    { left: '88%', size: '7rem',  color: '#4a3614', opacity: 0.6 },
];

const sunflowers = [
    { left: '10%', size: '3.5rem', opacity: 0.7 },
    { left: '24%', size: '2.6rem', opacity: 0.55 },
    { left: '40%', size: '4rem',  opacity: 0.65 },
    { left: '54%', size: '2.8rem', opacity: 0.5 },
    { left: '68%', size: '3.6rem', opacity: 0.6 },
    { left: '82%', size: '2.9rem', opacity: 0.55 },
    { left: '94%', size: '3.2rem', opacity: 0.5 },
];

const bees = [
    { left: '8%',  top: '14%', size: '2.2rem', opacity: 0.85 },
    { left: '22%', top: '32%', size: '1.6rem', opacity: 0.6 },
    { left: '38%', top: '18%', size: '2rem',   opacity: 0.75 },
    { left: '52%', top: '40%', size: '1.7rem', opacity: 0.55 },
    { left: '66%', top: '22%', size: '2.4rem', opacity: 0.8 },
    { left: '80%', top: '34%', size: '1.8rem', opacity: 0.6 },
    { left: '90%', top: '12%', size: '2.1rem', opacity: 0.7 },
];

const honeycombs = [
    { left: '5%',  top: '6%',  size: '1.6rem', opacity: 0.35 },
    { left: '18%', top: '10%', size: '1.1rem', opacity: 0.25 },
    { left: '33%', top: '4%',  size: '1.8rem', opacity: 0.3 },
    { left: '48%', top: '9%',  size: '1.3rem', opacity: 0.25 },
    { left: '63%', top: '5%',  size: '1.7rem', opacity: 0.3 },
    { left: '78%', top: '8%',  size: '1.2rem', opacity: 0.25 },
    { left: '92%', top: '6%',  size: '1.5rem', opacity: 0.3 },
];

const pollen = [
    { left: '12%', top: '50%', size: '0.6rem', opacity: 0.7 },
    { left: '28%', top: '65%', size: '0.5rem', opacity: 0.5 },
    { left: '44%', top: '55%', size: '0.7rem', opacity: 0.65 },
    { left: '58%', top: '70%', size: '0.5rem', opacity: 0.55 },
    { left: '72%', top: '58%', size: '0.6rem', opacity: 0.6 },
    { left: '85%', top: '68%', size: '0.55rem', opacity: 0.5 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <div className={BackgroundStyle.title}>Hive</div>
            <GiSun
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '6%', right: '8%', fontSize: '7rem', color: '#fff59d' }}
            />
            {honeycombs.map((h, i) => (
                <GiHoneycomb key={`comb-${i}`}
                             style={{ left: h.left, top: h.top, fontSize: h.size, color: '#ffc107', opacity: h.opacity }} />
            ))}
            {hives.map((h, i) => (
                <GiBeehive key={`hive-${i}`}
                           style={{ left: h.left, bottom: 0, fontSize: h.size, color: h.color, opacity: h.opacity }} />
            ))}
            {sunflowers.map((s, i) => (
                <GiSunflower key={`flower-${i}`}
                             className={BackgroundStyle.floatSlow}
                             style={{ left: s.left, bottom: '2%', fontSize: s.size, color: '#ffc107', opacity: s.opacity }} />
            ))}
            {pollen.map((p, i) => (
                <GiPollenDust key={`pollen-${i}`}
                              className={BackgroundStyle.blinkSlow}
                              style={{ left: p.left, top: p.top, fontSize: p.size, color: '#fff3c4', opacity: p.opacity }} />
            ))}
            {bees.map((b, i) => (
                <GiBee key={`bee-${i}`}
                       className={`${BackgroundStyle.buzz} ${i % 2 ? BackgroundStyle.driftSlow : BackgroundStyle.floatSlow}`}
                       style={{ left: b.left, top: b.top, fontSize: b.size, color: '#ffd54f', opacity: b.opacity }} />
            ))}
        </div>
    </div>
);

export default Background;
