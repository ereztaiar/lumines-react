import React from 'react';
import {background as BackgroundStyle} from "Skins/fireworks";
import { GiFireworkRocket, GiRocket, GiSparkles } from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const bursts = [
    { left: '22%', top: '22%', size: '4.5rem', color: '#ff2e4d', duration: '3.2s', delay: '0s' },
    { left: '32%', top: '16%', size: '3.4rem', color: '#2ee6ff', duration: '2.7s', delay: '0.7s' },
    { left: '42%', top: '26%', size: '5rem',   color: '#ffd34d', duration: '3.6s', delay: '1.4s' },
    { left: '52%', top: '18%', size: '3.8rem', color: '#7a2ff7', duration: '2.9s', delay: '2.1s' },
    { left: '62%', top: '28%', size: '4.2rem', color: '#ff2e4d', duration: '3.1s', delay: '0.4s' },
    { left: '72%', top: '20%', size: '3.2rem', color: '#2ee6ff', duration: '2.5s', delay: '1.1s' },
    { left: '78%', top: '32%', size: '4.6rem', color: '#ffd34d', duration: '3.4s', delay: '1.8s' },
    { left: '27%', top: '36%', size: '3rem',   color: '#7a2ff7', duration: '2.8s', delay: '2.5s' },
    { left: '57%', top: '38%', size: '3.6rem', color: '#ff8a3c', duration: '3s',   delay: '0.9s' },
];

const trails = [
    { left: '26%', size: '1.8rem', color: '#ffd34d', duration: '2.9s', delay: '0s' },
    { left: '40%', size: '1.6rem', color: '#2ee6ff', duration: '3.3s', delay: '0.9s' },
    { left: '54%', size: '2rem',   color: '#ff2e4d', duration: '2.6s', delay: '1.7s' },
    { left: '68%', size: '1.7rem', color: '#7a2ff7', duration: '3.1s', delay: '0.3s' },
    { left: '76%', size: '1.5rem', color: '#ff8a3c', duration: '2.8s', delay: '2.2s' },
];

const skyline = [
    { left: '17%', width: '5%', height: '6rem' },
    { left: '22%', width: '4%', height: '9.5rem' },
    { left: '26%', width: '6%', height: '5rem' },
    { left: '32%', width: '4%', height: '8rem' },
    { left: '36%', width: '7%', height: '6.5rem' },
    { left: '43%', width: '4%', height: '11rem' },
    { left: '47%', width: '5%', height: '5.5rem' },
    { left: '52%', width: '6%', height: '9rem' },
    { left: '58%', width: '5%', height: '7rem' },
    { left: '63%', width: '4%', height: '10rem' },
    { left: '67%', width: '6%', height: '6rem' },
    { left: '73%', width: '5%', height: '8.5rem' },
    { left: '78%', width: '5%', height: '5rem' },
];

/* blinking antenna beacons on the tallest towers */
const beacons = [
    { left: '44.6%', bottom: '30.5%', cls: 'blinkFast', color: '#ff2e4d' },
    { left: '64.6%', bottom: '29%',   cls: 'blinkSlow', color: '#ff2e4d' },
    { left: '23.6%', bottom: '28.5%', cls: 'blinkFast', color: '#ffd34d' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {bursts.map((b, i) => (
                <React.Fragment key={`burst-${i}`}>
                    <GiSparkles
                        className={`${BackgroundStyle.glow} ${BackgroundStyle.burstPop}`}
                        style={{ left: b.left, top: b.top, fontSize: b.size, color: b.color,
                                 animationDuration: b.duration, animationDelay: b.delay }} />
                    <div className={BackgroundStyle.burstRing}
                         style={{ left: b.left, top: b.top, width: b.size, height: b.size,
                                  borderColor: b.color, animationDuration: b.duration,
                                  animationDelay: b.delay }} />
                </React.Fragment>
            ))}
            {trails.map((t, i) => (
                <GiRocket key={`trail-${i}`}
                          className={BackgroundStyle.rise}
                          style={{ left: t.left, bottom: '16%', fontSize: t.size, color: t.color,
                                   opacity: 0.9, animationDuration: t.duration, animationDelay: t.delay }} />
            ))}
            <GiFireworkRocket
                className={`${BackgroundStyle.glow} ${BackgroundStyle.blinkSlow}`}
                style={{ top: '18%', left: '18%', fontSize: '4.5rem', color: '#ff2e4d', opacity: 0.7 }} />
            <GiFireworkRocket
                className={`${BackgroundStyle.glow} ${BackgroundStyle.blinkFast}`}
                style={{ top: '15%', right: '18%', fontSize: '3.8rem', color: '#2ee6ff', opacity: 0.7 }} />

            {/* city skyline against the glow */}
            {skyline.map((s, i) => (
                <div key={`bldg-${i}`}
                     style={{ position: 'absolute', left: s.left, bottom: '17%', width: s.width,
                              height: s.height, background: '#0a1230', opacity: 0.9 }} />
            ))}
            {beacons.map((b, i) => (
                <div key={`beacon-${i}`}
                     className={BackgroundStyle[b.cls]}
                     style={{ position: 'absolute', left: b.left, bottom: b.bottom, width: '0.45rem',
                              height: '0.45rem', borderRadius: '50%', background: b.color,
                              boxShadow: `0 0 6px ${b.color}` }} />
            ))}
        </div>
    </div>
);

export default Background;
