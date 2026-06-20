import React from 'react';
import {background as BackgroundStyle} from "Skins/desert";
import { GiPalmTree, GiCactus, GiCamel } from 'react-icons/gi';

const palms = [
    { left: '4%',  size: '6rem', color: '#3fae5a' },
    { left: '12%', size: '4rem', color: '#2e8a44' },
    { left: '78%', size: '5rem', color: '#3fae5a' },
    { left: '88%', size: '3.6rem', color: '#2e8a44' },
];

const cacti = [
    { left: '24%', size: '2.6rem', opacity: 0.9 },
    { left: '36%', size: '1.8rem', opacity: 0.75 },
    { left: '60%', size: '2.2rem', opacity: 0.85 },
    { left: '68%', size: '1.6rem', opacity: 0.7 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <div className={`${BackgroundStyle.sunGlow} ${BackgroundStyle.glow}`}
                 style={{ position: 'absolute', top: '8%', right: '14%', width: '8rem', height: '8rem' }} />
            <GiCamel
                className={`${BackgroundStyle.walkSlow} ${BackgroundStyle.heatShimmer}`}
                style={{ bottom: '14%', left: '40%', fontSize: '4.5rem', color: '#e0a85c', opacity: 0.9 }} />
            {palms.map((p, i) => (
                <GiPalmTree key={`palm-${i}`}
                            className={BackgroundStyle.floatSlow}
                            style={{ left: p.left, bottom: 0, fontSize: p.size, color: p.color }} />
            ))}
            {cacti.map((c, i) => (
                <GiCactus key={`cactus-${i}`}
                          className={BackgroundStyle.heatShimmer}
                          style={{ left: c.left, bottom: 0, fontSize: c.size, color: '#3fae5a', opacity: c.opacity }} />
            ))}
        </div>
    </div>
);

export default Background;
