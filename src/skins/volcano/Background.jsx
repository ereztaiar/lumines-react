import React from 'react';
import {background as BackgroundStyle} from "Skins/volcano";
import { GiVolcano, GiFireball, GiSmallFire, GiFire } from 'react-icons/gi';

const embers = [
    { left: '46%', size: '0.9rem', delay: '0s' },
    { left: '50%', size: '0.6rem', delay: '1.1s' },
    { left: '53%', size: '0.7rem', delay: '2.2s' },
    { left: '48%', size: '0.5rem', delay: '0.6s' },
    { left: '55%', size: '0.8rem', delay: '1.7s' },
    { left: '44%', size: '0.6rem', delay: '2.9s' },
];

const sparks = [
    { left: '20%', top: '60%', size: '0.7rem' },
    { left: '70%', top: '50%', size: '0.6rem' },
    { left: '32%', top: '72%', size: '0.5rem' },
    { left: '80%', top: '68%', size: '0.8rem' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiVolcano
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ bottom: '0%', left: '32%', fontSize: '20rem', color: '#3a1208' }} />
            <GiFireball
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ bottom: '38%', left: '47%', fontSize: '3.2rem', color: '#ff4500' }} />
            {embers.map((e, i) => (
                <GiSmallFire key={`ember-${i}`}
                             className={BackgroundStyle.emberRise}
                             style={{ left: e.left, bottom: '40%', fontSize: e.size, color: '#ffae00',
                                      animationDelay: e.delay }} />
            ))}
            <GiFire
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ bottom: '2%', left: '14%', fontSize: '5rem', color: '#ff4500', opacity: 0.85 }} />
            <GiFire
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ bottom: '2%', right: '12%', fontSize: '4rem', color: '#ffae00', opacity: 0.8 }} />
            {sparks.map((s, i) => (
                <GiSmallFire key={`spark-${i}`}
                             className={BackgroundStyle.twinkle}
                             style={{ left: s.left, top: s.top, fontSize: s.size, color: '#2dd4bf', opacity: 0.6 }} />
            ))}
        </div>
    </div>
);

export default Background;
