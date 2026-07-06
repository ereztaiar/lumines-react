import React from 'react';
import {background as BackgroundStyle} from "Skins/coral-reef";
import {
    GiCoral,
    GiTropicalFish,
    GiJellyfish,
    GiSeahorse,
    GiSeaTurtle,
    GiSchoolOfFish,
    GiSeaStar,
    GiCrab,
} from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const reefBed = [
    { left: '18%', size: '8rem',   color: '#ff6f61' },
    { left: '26%', size: '5rem',   color: '#1fc2c2' },
    { left: '34%', size: '9rem',   color: '#ffd34d' },
    { left: '46%', size: '5.5rem', color: '#ff6f61' },
    { left: '56%', size: '8.5rem', color: '#1fc2c2' },
    { left: '68%', size: '5rem',   color: '#ff6f61' },
    { left: '76%', size: '7rem',   color: '#ffd34d' },
];

const fish = [
    { top: '30%', size: '2.6rem', color: '#ffd34d', duration: '22s', delay: '0s',  reverse: false },
    { top: '22%', size: '2rem',   color: '#ff6f61', duration: '28s', delay: '6s',  reverse: true },
    { top: '40%', size: '2.4rem', color: '#ffd34d', duration: '25s', delay: '12s', reverse: false },
    { top: '48%', size: '1.8rem', color: '#ff8a75', duration: '20s', delay: '3s',  reverse: true },
    { top: '35%', size: '2.2rem', color: '#5eead4', duration: '30s', delay: '17s', reverse: false },
];

const bubbles = [
    { left: '20%', size: '0.9rem', delay: '0s' },
    { left: '28%', size: '1.2rem', delay: '1.5s' },
    { left: '38%', size: '0.7rem', delay: '3s' },
    { left: '46%', size: '1rem',   delay: '0.6s' },
    { left: '56%', size: '1.4rem', delay: '2.4s' },
    { left: '64%', size: '0.8rem', delay: '4.2s' },
    { left: '72%', size: '1.1rem', delay: '1s' },
    { left: '80%', size: '0.9rem', delay: '5.4s' },
];

const rays = [
    { left: '26%', delay: '0s' },
    { left: '44%', delay: '2.2s' },
    { left: '62%', delay: '4.4s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* sunlight shafts from the surface */}
            {rays.map((r, i) => (
                <div key={`ray-${i}`}
                     className={BackgroundStyle.lightRay}
                     style={{ left: r.left, animationDelay: r.delay }} />
            ))}

            <GiJellyfish
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '20%', right: '24%', fontSize: '8rem', color: '#ffffff', opacity: 0.7 }} />
            <GiJellyfish
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '34%', right: '18%', fontSize: '4.5rem', color: '#5eead4', opacity: 0.55,
                         animationDelay: '2.4s' }} />
            <GiSeahorse
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '24%', left: '21%', fontSize: '6rem', color: '#ffd34d', opacity: 0.85,
                         animationDelay: '1.2s' }} />

            {/* sea turtle gliding across */}
            <GiSeaTurtle
                className={BackgroundStyle.swimAcross}
                style={{ top: '55%', left: 0, fontSize: '7rem', color: '#2da88a', opacity: 0.85,
                         animationDuration: '48s' }} />
            {/* school of fish darting the other way */}
            <GiSchoolOfFish
                className={BackgroundStyle.swimAcrossReverse}
                style={{ top: '28%', left: 0, fontSize: '5rem', color: '#9be8e0', opacity: 0.6,
                         animationDuration: '34s' }} />

            {fish.map((f, i) => (
                <GiTropicalFish key={`fish-${i}`}
                                 className={f.reverse ? BackgroundStyle.swimAcrossReverse : BackgroundStyle.swimAcross}
                                 style={{ top: f.top, left: 0, fontSize: f.size, color: f.color,
                                          animationDuration: f.duration, animationDelay: f.delay }} />
            ))}

            {bubbles.map((b, i) => (
                <div key={`bubble-${i}`}
                     className={BackgroundStyle.riseUp}
                     style={{ position: 'absolute', left: b.left, bottom: '0%', width: b.size, height: b.size,
                              borderRadius: '50%', background: 'rgba(255,255,255,0.5)',
                              animationDelay: b.delay }} />
            ))}

            {/* reef bed along the ground line */}
            {reefBed.map((r, i) => (
                <GiCoral key={`coral-${i}`}
                         className={BackgroundStyle.swayCoral}
                         style={{ left: r.left, bottom: '18%', fontSize: r.size, color: r.color,
                                  opacity: 0.9, animationDelay: `${i * 0.9}s` }} />
            ))}
            <GiSeaStar
                style={{ left: '41%', bottom: '18%', fontSize: '2.6rem', color: '#ff8a75', opacity: 0.9 }} />
            <GiCrab
                className={BackgroundStyle.scuttle}
                style={{ left: '52%', bottom: '18%', fontSize: '2.8rem', color: '#ff6f61', opacity: 0.9 }} />
        </div>
    </div>
);

export default Background;
