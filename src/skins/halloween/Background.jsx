import React from 'react';
import {background as BackgroundStyle} from "Skins/halloween";
import { GiMoon, GiBat, GiSpiderWeb, GiTombstone } from 'react-icons/gi';

const tombstones = [
    { left: '8%',  size: '4.5rem', color: '#1a0b2e' },
    { left: '20%', size: '3rem',  color: '#241040' },
    { left: '75%', size: '4rem',  color: '#241040' },
    { left: '88%', size: '5rem',  color: '#1a0b2e' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiMoon
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '8%', right: '12%', fontSize: '7rem', color: '#f5f0d8' }} />
            <GiSpiderWeb
                style={{ top: '-2%', left: '-2%', fontSize: '8rem', color: '#3a2050', opacity: 0.6 }} />
            <GiBat
                className={BackgroundStyle.driftSlow}
                style={{ top: '15%', fontSize: '2.5rem', color: '#1a0b2e' }} />
            <GiBat
                className={BackgroundStyle.driftSlowReverse}
                style={{ top: '28%', fontSize: '1.8rem', color: '#241040' }} />
            <GiBat
                className={BackgroundStyle.driftSlow}
                style={{ top: '40%', fontSize: '2.2rem', color: '#1a0b2e', animationDelay: '6s' }} />
            {tombstones.map((t, i) => (
                <GiTombstone key={`tomb-${i}`}
                             style={{ left: t.left, bottom: 0, fontSize: t.size, color: t.color }} />
            ))}
        </div>
    </div>
);

export default Background;
