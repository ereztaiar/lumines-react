import React from 'react';
import {background as BackgroundStyle} from "Skins/synthwave";
import { GiSun, GiPalmTree, GiMountains } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

const stars = [
    { left: '5%',  top: '8%',  size: '1rem',   opacity: 0.9 },
    { left: '15%', top: '20%', size: '0.6rem', opacity: 0.6 },
    { left: '28%', top: '6%',  size: '0.8rem', opacity: 0.7 },
    { left: '40%', top: '15%', size: '0.5rem', opacity: 0.5 },
    { left: '62%', top: '10%', size: '0.9rem', opacity: 0.8 },
    { left: '75%', top: '22%', size: '0.6rem', opacity: 0.6 },
    { left: '85%', top: '8%',  size: '1.1rem', opacity: 0.9 },
    { left: '92%', top: '18%', size: '0.5rem', opacity: 0.5 },
    { left: '50%', top: '5%',  size: '0.7rem', opacity: 0.7 },
];

const palms = [
    { left: '2%',  size: '10rem', color: '#ff2bd6', opacity: 0.85 },
    { left: '88%', size: '11rem', color: '#7a2bff', opacity: 0.8 },
    { left: '20%', size: '6rem',  color: '#3d1a5e', opacity: 0.6 },
    { left: '70%', size: '7rem',  color: '#3d1a5e', opacity: 0.6 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={i % 2 ? BackgroundStyle.pulse : BackgroundStyle.blinkSlow}
                        style={{ left: s.left, top: s.top, fontSize: s.size, opacity: s.opacity, color: '#ffffff' }} />
            ))}
            <GiMountains
                style={{ left: '0%', bottom: '28%', width: '100%', fontSize: '14rem', color: '#2a0f44', opacity: 0.7 }} />
            <GiSun
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '14%', left: '50%', transform: 'translateX(-50%)', fontSize: '9rem', color: '#ff8a3d' }} />
            {palms.map((p, i) => (
                <GiPalmTree key={`palm-${i}`}
                            className={BackgroundStyle.floatSlow}
                            style={{ left: p.left, bottom: '0%', fontSize: p.size, color: p.color, opacity: p.opacity }} />
            ))}
            <div className={BackgroundStyle.gridFloor} />
        </div>
    </div>
);

export default Background;
