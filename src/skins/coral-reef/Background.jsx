import React from 'react';
import {background as BackgroundStyle} from "Skins/coral-reef";
import { GiCoral, GiTropicalFish, GiJellyfish, GiSeahorse } from 'react-icons/gi';

const reefBed = [
    { left: '2%',  size: '5rem',   color: '#ff6f61' },
    { left: '16%', size: '3.2rem', color: '#1fc2c2' },
    { left: '30%', size: '6rem',   color: '#ffd34d' },
    { left: '46%', size: '3.6rem', color: '#ff6f61' },
    { left: '60%', size: '5.4rem', color: '#1fc2c2' },
    { left: '76%', size: '3rem',   color: '#ff6f61' },
    { left: '90%', size: '4.4rem', color: '#ffd34d' },
];

const fish = [
    { left: '10%', top: '30%', size: '2.2rem', color: '#ffd34d', delay: '0s' },
    { left: '38%', top: '18%', size: '1.6rem', color: '#ff6f61', delay: '2s' },
    { left: '64%', top: '34%', size: '2rem',   color: '#ffd34d', delay: '1s' },
    { left: '80%', top: '20%', size: '1.4rem', color: '#ff6f61', delay: '3s' },
];

const bubbles = [
    { left: '12%', size: '0.8rem', delay: '0s' },
    { left: '28%', size: '1.1rem', delay: '1.5s' },
    { left: '50%', size: '0.6rem', delay: '0.6s' },
    { left: '68%', size: '1.3rem', delay: '2.4s' },
    { left: '84%', size: '0.9rem', delay: '1s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiJellyfish
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '8%', right: '12%', fontSize: '7rem', color: '#ffffff', opacity: 0.7 }} />
            <GiSeahorse
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '14%', left: '10%', fontSize: '5rem', color: '#ffd34d', opacity: 0.85 }} />
            {fish.map((f, i) => (
                <GiTropicalFish key={`fish-${i}`}
                                 className={BackgroundStyle.driftSlow}
                                 style={{ left: f.left, top: f.top, fontSize: f.size, color: f.color,
                                          animationDelay: f.delay }} />
            ))}
            {bubbles.map((b, i) => (
                <div key={`bubble-${i}`}
                     className={BackgroundStyle.riseUp}
                     style={{ position: 'absolute', left: b.left, bottom: '0%', width: b.size, height: b.size,
                              borderRadius: '50%', background: 'rgba(255,255,255,0.5)',
                              animationDelay: b.delay }} />
            ))}
            {reefBed.map((r, i) => (
                <GiCoral key={`coral-${i}`}
                         style={{ left: r.left, bottom: 0, fontSize: r.size, color: r.color, opacity: 0.9 }} />
            ))}
        </div>
    </div>
);

export default Background;
