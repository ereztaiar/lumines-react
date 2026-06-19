import React from 'react';
import {background as BackgroundStyle} from "Skins/forest-zen";
import { GiPineTree, GiMountains, GiSunCloud, GiMapleLeaf } from 'react-icons/gi';
import { FaCircle } from 'react-icons/fa';

const trees = [
    { left: '0%',  size: '11rem', color: '#1c2b14', opacity: 0.95 },
    { left: '8%',  size: '7rem',  color: '#28401e', opacity: 0.8 },
    { left: '16%', size: '9rem',  color: '#1c2b14', opacity: 0.9 },
    { left: '78%', size: '8rem',  color: '#28401e', opacity: 0.8 },
    { left: '88%', size: '11rem', color: '#1c2b14', opacity: 0.95 },
    { left: '96%', size: '6rem',  color: '#28401e', opacity: 0.75 },
];

const mist = [
    { left: '10%', top: '55%', size: '5rem', opacity: 0.12 },
    { left: '40%', top: '62%', size: '7rem', opacity: 0.1 },
    { left: '65%', top: '58%', size: '6rem', opacity: 0.12 },
    { left: '85%', top: '64%', size: '5rem', opacity: 0.1 },
];

const leaves = [
    { left: '5%',  size: '1rem',  color: '#a8e838', delay: 0,  opacity: 0.8 },
    { left: '20%', size: '0.8rem', color: '#e89050', delay: 2,  opacity: 0.7 },
    { left: '38%', size: '1.1rem', color: '#a8e838', delay: 5,  opacity: 0.75 },
    { left: '55%', size: '0.9rem', color: '#e89050', delay: 1,  opacity: 0.65 },
    { left: '72%', size: '1rem',  color: '#c8f040', delay: 7,  opacity: 0.7 },
    { left: '88%', size: '0.8rem', color: '#a8e838', delay: 3.5, opacity: 0.8 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiMountains
                style={{ left: '0%', bottom: '32%', width: '100%', fontSize: '15rem', color: '#2e3e29', opacity: 0.6 }} />
            <GiSunCloud
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '8%', right: '15%', fontSize: '6rem', color: '#e8e4d8' }} />
            {mist.map((m, i) => (
                <FaCircle key={`mist-${i}`}
                          className={BackgroundStyle.driftSlow}
                          style={{ left: m.left, top: m.top, fontSize: m.size, opacity: m.opacity, color: '#e8e4d8',
                                   animationDelay: `${i * 2}s` }} />
            ))}
            {trees.map((t, i) => (
                <GiPineTree key={`tree-${i}`}
                            className={i % 2 ? BackgroundStyle.sway : BackgroundStyle.floatSlow}
                            style={{ left: t.left, bottom: 0, fontSize: t.size, color: t.color, opacity: t.opacity,
                                     animationDelay: `${i * 0.8}s` }} />
            ))}
            {leaves.map((l, i) => (
                <GiMapleLeaf key={`leaf-${i}`}
                             className={BackgroundStyle.fallLeaf}
                             style={{ left: l.left, top: '-5%', fontSize: l.size, color: l.color, opacity: l.opacity,
                                      animationDelay: `${l.delay}s` }} />
            ))}
        </div>
    </div>
);

export default Background;
