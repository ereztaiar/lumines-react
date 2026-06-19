import React from 'react';
import {background as BackgroundStyle} from "Skins/halloween";
import { GiMoon, GiBat, GiSpiderWeb, GiTombstone, GiGhost, GiPumpkin } from 'react-icons/gi';

const tombstones = [
    { left: '8%',  size: '4.5rem', color: '#1a0b2e' },
    { left: '20%', size: '3rem',  color: '#241040' },
    { left: '75%', size: '4rem',  color: '#241040' },
    { left: '88%', size: '5rem',  color: '#1a0b2e' },
];

const ghosts = [
    { left: '30%', top: '22%', size: '3.5rem', color: '#e8e0ff', opacity: 0.55, delay: 0 },
    { left: '65%', top: '35%', size: '2.8rem', color: '#d4c8f8', opacity: 0.45, delay: 2 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiMoon
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ top: '8%', right: '12%', fontSize: '7rem', color: '#f5f0d8' }} />
            <GiSpiderWeb
                style={{ top: '-2%', left: '-2%', fontSize: '8rem', color: '#3a2050', opacity: 0.6 }} />
            <GiSpiderWeb
                className={BackgroundStyle.pulse}
                style={{ top: '0%', right: '5%', fontSize: '5rem', color: '#2a1540', opacity: 0.5, transform: 'scaleX(-1)' }} />
            <GiBat
                className={BackgroundStyle.driftSlow}
                style={{ top: '15%', fontSize: '2.5rem', color: '#1a0b2e' }} />
            <GiBat
                className={BackgroundStyle.driftSlowReverse}
                style={{ top: '28%', fontSize: '1.8rem', color: '#241040' }} />
            <GiBat
                className={BackgroundStyle.driftSlow}
                style={{ top: '40%', fontSize: '2.2rem', color: '#1a0b2e', animationDelay: '6s' }} />
            <GiBat
                className={BackgroundStyle.driftSlowReverse}
                style={{ top: '50%', fontSize: '1.5rem', color: '#2a1040', animationDelay: '10s' }} />
            {ghosts.map((g, i) => (
                <GiGhost key={`ghost-${i}`}
                         className={BackgroundStyle.floatGhost}
                         style={{ left: g.left, top: g.top, fontSize: g.size, color: g.color, opacity: g.opacity,
                                  animationDelay: `${g.delay}s` }} />
            ))}
            {tombstones.map((t, i) => (
                <GiTombstone key={`tomb-${i}`}
                             style={{ left: t.left, bottom: 0, fontSize: t.size, color: t.color }} />
            ))}
            <GiPumpkin
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ left: '45%', bottom: '2%', fontSize: '3.5rem', color: '#ff7518', opacity: 0.9 }} />
        </div>
    </div>
);

export default Background;
