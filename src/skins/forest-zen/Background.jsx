import React from 'react';
import {background as BackgroundStyle} from "Skins/forest-zen";
import { GiPineTree, GiMountains, GiSunCloud } from 'react-icons/gi';
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
                          style={{ left: m.left, top: m.top, fontSize: m.size, opacity: m.opacity, color: '#e8e4d8' }} />
            ))}
            {trees.map((t, i) => (
                <GiPineTree key={`tree-${i}`}
                            className={i % 2 ? BackgroundStyle.floatSlow : undefined}
                            style={{ left: t.left, bottom: 0, fontSize: t.size, color: t.color, opacity: t.opacity }} />
            ))}
        </div>
    </div>
);

export default Background;
