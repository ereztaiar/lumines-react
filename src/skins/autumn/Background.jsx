import React from 'react';
import {background as BackgroundStyle} from "Skins/autumn";
import { GiOak, GiAcorn, GiMapleLeaf, GiOakLeaf, GiMushroom } from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const fallingLeaves = [
    { left: '18%', size: '1.8rem', delay: '0s',   dur: '11s', cmp: 'maple', color: '#e2572d' },
    { left: '24%', size: '1.2rem', delay: '2.4s', dur: '13s', cmp: 'oak',   color: '#d9a521' },
    { left: '30%', size: '2rem',   delay: '4.8s', dur: '10s', cmp: 'maple', color: '#e2872d' },
    { left: '36%', size: '1.1rem', delay: '1.1s', dur: '14s', cmp: 'oak',   color: '#e2572d' },
    { left: '42%', size: '1.7rem', delay: '6.2s', dur: '12s', cmp: 'maple', color: '#d9a521' },
    { left: '48%', size: '1.3rem', delay: '3.3s', dur: '11s', cmp: 'oak',   color: '#e2872d' },
    { left: '54%', size: '1.9rem', delay: '0.6s', dur: '13s', cmp: 'maple', color: '#e2572d' },
    { left: '60%', size: '1.2rem', delay: '5.5s', dur: '10s', cmp: 'oak',   color: '#d9a521' },
    { left: '66%', size: '1.8rem', delay: '2.9s', dur: '12s', cmp: 'maple', color: '#e2872d' },
    { left: '72%', size: '1.4rem', delay: '7.4s', dur: '14s', cmp: 'oak',   color: '#e2572d' },
    { left: '78%', size: '1.6rem', delay: '4.1s', dur: '11s', cmp: 'maple', color: '#d9a521' },
    { left: '21%', size: '1rem',   delay: '8.8s', dur: '13s', cmp: 'oak',   color: '#e2872d' },
    { left: '45%', size: '1.5rem', delay: '9.6s', dur: '12s', cmp: 'maple', color: '#e2572d' },
    { left: '63%', size: '1.1rem', delay: '10.4s', dur: '10s', cmp: 'oak',  color: '#d9a521' },
    { left: '81%', size: '1.7rem', delay: '6.9s', dur: '13s', cmp: 'maple', color: '#e2872d' },
    { left: '27%', size: '1.3rem', delay: '11.2s', dur: '11s', cmp: 'oak',  color: '#e2572d' },
    { left: '57%', size: '1.6rem', delay: '12.1s', dur: '14s', cmp: 'maple', color: '#d9a521' },
    { left: '75%', size: '1.2rem', delay: '13s',  dur: '12s', cmp: 'oak',   color: '#e2872d' },
];

const acorns = [
    { left: '32%', size: '1.8rem' },
    { left: '44%', size: '1.3rem' },
    { left: '54%', size: '2rem' },
    { left: '64%', size: '1.4rem' },
    { left: '72%', size: '1.7rem' },
];

const mushrooms = [
    { left: '38%', size: '2.6rem', color: '#e2572d', opacity: 0.9 },
    { left: '68%', size: '3.4rem', color: '#c23a1c', opacity: 0.85 },
    { left: '48%', size: '2rem',   color: '#e2872d', opacity: 0.8 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* two big oaks framing the scene */}
            <GiOak
                className={`${BackgroundStyle.glow} ${BackgroundStyle.swayTree}`}
                style={{ bottom: '19%', left: '19%', fontSize: '13rem', color: '#8b5a2b' }} />
            <GiOak
                className={`${BackgroundStyle.glow} ${BackgroundStyle.swayTree}`}
                style={{ bottom: '19%', left: '72%', fontSize: '10rem', color: '#7a4a20',
                         animationDelay: '2.2s' }} />

            {/* wind gust swirl of leaves sweeping through */}
            <GiMapleLeaf
                className={BackgroundStyle.gustSwirl}
                style={{ top: '45%', left: 0, fontSize: '1.6rem', color: '#e2872d' }} />
            <GiOakLeaf
                className={BackgroundStyle.gustSwirl}
                style={{ top: '52%', left: 0, fontSize: '1.2rem', color: '#d9a521',
                         animationDelay: '2.8s' }} />
            <GiMapleLeaf
                className={BackgroundStyle.gustSwirl}
                style={{ top: '38%', left: 0, fontSize: '1.4rem', color: '#e2572d',
                         animationDelay: '5.6s' }} />

            {mushrooms.map((m, i) => (
                <GiMushroom key={`mushroom-${i}`}
                            className={BackgroundStyle.floatSlow}
                            style={{ bottom: '18%', left: m.left, fontSize: m.size, color: m.color,
                                     opacity: m.opacity, animationDelay: `${i * 1.3}s` }} />
            ))}
            {acorns.map((a, i) => (
                <GiAcorn key={`acorn-${i}`}
                         style={{ left: a.left, bottom: '18%', fontSize: a.size, color: '#8b5a2b',
                                  opacity: 0.9 }} />
            ))}
            {fallingLeaves.map((l, i) => {
                const Leaf = l.cmp === 'maple' ? GiMapleLeaf : GiOakLeaf;
                return (
                    <Leaf key={`leaf-${i}`}
                          className={BackgroundStyle.leafFall}
                          style={{ left: l.left, top: '-10%', fontSize: l.size, color: l.color,
                                   animationDelay: l.delay, animationDuration: l.dur }} />
                );
            })}
        </div>
    </div>
);

export default Background;
