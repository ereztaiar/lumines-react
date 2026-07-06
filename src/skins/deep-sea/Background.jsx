import React from 'react';
import {background as BackgroundStyle} from "Skins/deep-sea";
import { GiJellyfish, GiOctopus, GiSeahorse, GiAnglerFish, GiSpermWhale } from 'react-icons/gi';
import { FaCircle } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const bubbles = [
    { left: '20%', size: '0.7rem',  opacity: 0.4,  delay: 0 },
    { left: '27%', size: '0.5rem',  opacity: 0.3,  delay: 2 },
    { left: '34%', size: '0.8rem',  opacity: 0.35, delay: 4 },
    { left: '42%', size: '0.6rem',  opacity: 0.3,  delay: 1 },
    { left: '50%', size: '0.55rem', opacity: 0.4,  delay: 6 },
    { left: '58%', size: '0.7rem',  opacity: 0.3,  delay: 3 },
    { left: '66%', size: '0.6rem',  opacity: 0.35, delay: 5 },
    { left: '74%', size: '0.5rem',  opacity: 0.3,  delay: 7 },
    { left: '80%', size: '0.65rem', opacity: 0.35, delay: 8.5 },
];

/* tiny motes of "marine snow" sinking slowly */
const marineSnow = [
    { left: '22%', size: '0.25rem', delay: '0s',   dur: '18s' },
    { left: '31%', size: '0.2rem',  delay: '4s',   dur: '22s' },
    { left: '40%', size: '0.3rem',  delay: '8s',   dur: '16s' },
    { left: '49%', size: '0.2rem',  delay: '2s',   dur: '20s' },
    { left: '58%', size: '0.25rem', delay: '10s',  dur: '19s' },
    { left: '67%', size: '0.2rem',  delay: '6s',   dur: '23s' },
    { left: '76%', size: '0.3rem',  delay: '12s',  dur: '17s' },
    { left: '82%', size: '0.2rem',  delay: '14s',  dur: '21s' },
];

const jellyfish = [
    { left: '24%', top: '18%', size: '5.5rem', color: '#c4f1ff', opacity: 0.75 },
    { left: '70%', top: '16%', size: '4rem',   color: '#5eead4', opacity: 0.65 },
    { left: '44%', top: '26%', size: '3.2rem', color: '#9be8e0', opacity: 0.55 },
    { left: '60%', top: '38%', size: '2.6rem', color: '#c4f1ff', opacity: 0.45 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* whale silhouette gliding by in the gloom */}
            <GiSpermWhale
                className={BackgroundStyle.whaleGlide}
                style={{ top: '30%', left: 0, fontSize: '16rem', color: '#06222e', opacity: 0.8 }} />

            {jellyfish.map((j, i) => (
                <GiJellyfish key={`jelly-${i}`}
                             className={`${BackgroundStyle.glow} ${BackgroundStyle.jellyPulse}`}
                             style={{ left: j.left, top: j.top, fontSize: j.size, color: j.color,
                                      opacity: j.opacity, animationDelay: `${i * 1.4}s` }} />
            ))}

            {/* anglerfish with a blinking lure */}
            <GiAnglerFish
                className={BackgroundStyle.lureBlink}
                style={{ left: '30%', bottom: '24%', fontSize: '7rem', color: '#0a3d4d' }} />

            <GiOctopus
                className={`${BackgroundStyle.glow} ${BackgroundStyle.tentacleSway}`}
                style={{ left: '20%', bottom: '19%', fontSize: '9.5rem', color: '#0a3d4d', opacity: 0.9 }} />
            <GiSeahorse
                className={BackgroundStyle.floatSlow}
                style={{ right: '29%', bottom: '22%', fontSize: '7rem', color: '#155e56', opacity: 0.85 }} />

            {bubbles.map((b, i) => (
                <FaCircle key={`bubble-${i}`}
                          className={BackgroundStyle.riseSlow}
                          style={{ left: b.left, bottom: '0%', fontSize: b.size, opacity: b.opacity,
                                   color: '#9be8e0', animationDelay: `${b.delay}s` }} />
            ))}
            {marineSnow.map((m, i) => (
                <div key={`snow-${i}`}
                     className={BackgroundStyle.snowSink}
                     style={{ left: m.left, top: '-5%', width: m.size, height: m.size,
                              animationDelay: m.delay, animationDuration: m.dur }} />
            ))}
        </div>
    </div>
);

export default Background;
