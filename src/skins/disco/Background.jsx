import React from 'react';
import {background as BackgroundStyle} from "Skins/disco";
import { GiMirrorMirror, GiSparkles } from 'react-icons/gi';
import { FaStar, FaMusic, FaMale, FaFemale } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const glints = [
    { left: '20%', top: '20%', size: '1rem',   cls: 'blinkFast' },
    { left: '26%', top: '40%', size: '0.7rem', cls: 'blinkSlow' },
    { left: '32%', top: '16%', size: '0.9rem', cls: 'blinkFast' },
    { left: '40%', top: '34%', size: '0.6rem', cls: 'blinkSlow' },
    { left: '48%', top: '20%', size: '1rem',   cls: 'blinkFast' },
    { left: '56%', top: '38%', size: '0.7rem', cls: 'blinkSlow' },
    { left: '64%', top: '18%', size: '0.9rem', cls: 'blinkFast' },
    { left: '72%', top: '42%', size: '0.6rem', cls: 'blinkSlow' },
    { left: '78%', top: '24%', size: '0.8rem', cls: 'blinkFast' },
    { left: '36%', top: '52%', size: '0.7rem', cls: 'blinkSlow' },
    { left: '60%', top: '56%', size: '0.8rem', cls: 'blinkFast' },
    { left: '24%', top: '60%', size: '0.6rem', cls: 'blinkSlow' },
];

const notes = [
    { left: '24%', size: '1.8rem', color: '#ffd700', delay: '0s' },
    { left: '46%', size: '1.4rem', color: '#ff2bd6', delay: '2.4s' },
    { left: '68%', size: '2rem',   color: '#00e5ff', delay: '1.2s' },
    { left: '56%', size: '1.5rem', color: '#ffd700', delay: '3.6s' },
];

const beams = [
    { rotate: '-38deg', color: 'rgba(255, 43, 214, 0.28)', delay: '0s' },
    { rotate: '-14deg', color: 'rgba(0, 229, 255, 0.26)',  delay: '0.9s' },
    { rotate: '12deg',  color: 'rgba(255, 215, 0, 0.24)',  delay: '1.8s' },
    { rotate: '36deg',  color: 'rgba(57, 255, 20, 0.22)',  delay: '2.7s' },
];

const tileColors = ['#ff2bd6', '#00e5ff', '#ffd700', '#39ff14'];
const floorTiles = Array.from({ length: 20 }, (_, i) => ({
    left: `${19 + (i % 10) * 6.4}%`,
    bottom: i < 10 ? '20%' : '17%',
    color: tileColors[(i * 7) % 4],
    delay: `${(i * 0.35) % 2.8}s`,
}));

const dancers = [
    { Icon: FaMale,   left: '30%', size: '5rem',   delay: '0s' },
    { Icon: FaFemale, left: '48%', size: '4.6rem', delay: '0.4s' },
    { Icon: FaMale,   left: '66%', size: '5.4rem', delay: '0.8s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* rotating light beams fanning out from the ball */}
            {beams.map((b, i) => (
                <div key={`beam-${i}`}
                     className={BackgroundStyle.lightBeam}
                     style={{ left: '49%', top: '24%',
                              background: `linear-gradient(180deg, ${b.color} 0%, transparent 100%)`,
                              transform: `rotate(${b.rotate})`, animationDelay: b.delay }} />
            ))}

            <GiMirrorMirror
                className={`${BackgroundStyle.glow} ${BackgroundStyle.spinSlow}`}
                style={{ top: '16%', left: '43%', fontSize: '11rem', color: '#ffd700' }} />

            {glints.map((g, i) => (
                <FaStar key={`glint-${i}`}
                        className={BackgroundStyle[g.cls]}
                        style={{ left: g.left, top: g.top, fontSize: g.size, color: '#ffffff' }} />
            ))}
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '52%', right: '20%', fontSize: '4.5rem', color: '#00e5ff', opacity: 0.7 }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '46%', left: '21%', fontSize: '4rem', color: '#ff2bd6', opacity: 0.7,
                         animationDelay: '1.6s' }} />
            {notes.map((n, i) => (
                <FaMusic key={`note-${i}`}
                         className={BackgroundStyle.noteRise}
                         style={{ left: n.left, bottom: '18%', fontSize: n.size, color: n.color,
                                  opacity: 0.85, animationDelay: n.delay }} />
            ))}

            {/* dancers grooving on the floor */}
            {dancers.map((d, i) => (
                <d.Icon key={`dancer-${i}`}
                        className={BackgroundStyle.danceBob}
                        style={{ left: d.left, bottom: '21%', fontSize: d.size, color: '#12042a',
                                 opacity: 0.9, animationDelay: d.delay }} />
            ))}

            {/* blinking dance floor */}
            {floorTiles.map((t, i) => (
                <div key={`tile-${i}`}
                     className={BackgroundStyle.tileBlink}
                     style={{ left: t.left, bottom: t.bottom, width: '5.8%', height: '3%',
                              background: t.color, animationDelay: t.delay }} />
            ))}
        </div>
    </div>
);

export default Background;
