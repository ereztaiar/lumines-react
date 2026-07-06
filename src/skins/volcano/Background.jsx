import React from 'react';
import {background as BackgroundStyle} from "Skins/volcano";
import { GiFireball, GiSmallFire, GiFire } from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const embers = [
    { left: '44%', size: '1rem',   delay: '0s',   dur: '4.2s' },
    { left: '48%', size: '0.7rem', delay: '1.1s', dur: '5.4s' },
    { left: '52%', size: '0.8rem', delay: '2.2s', dur: '4.8s' },
    { left: '46%', size: '0.6rem', delay: '0.6s', dur: '5.8s' },
    { left: '55%', size: '0.9rem', delay: '1.7s', dur: '4.4s' },
    { left: '42%', size: '0.7rem', delay: '2.9s', dur: '5.2s' },
    { left: '50%', size: '1.1rem', delay: '3.6s', dur: '4s' },
    { left: '57%', size: '0.6rem', delay: '4.3s', dur: '5.6s' },
    { left: '40%', size: '0.8rem', delay: '5s',   dur: '4.6s' },
];

const sparks = [
    { left: '26%', top: '55%', size: '0.8rem' },
    { left: '70%', top: '48%', size: '0.7rem' },
    { left: '34%', top: '68%', size: '0.6rem' },
    { left: '76%', top: '64%', size: '0.9rem' },
    { left: '22%', top: '40%', size: '0.6rem' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* volcano cone silhouettes (CSS trapezoids — the icon reads badly at scale) */}
            <div className={BackgroundStyle.cone}
                 style={{ bottom: '17%', left: '30%', width: '34rem', height: '17rem',
                          background: '#4a1a0a', opacity: 0.75,
                          clipPath: 'polygon(44% 0, 56% 0, 100% 100%, 0 100%)' }} />
            <div className={`${BackgroundStyle.cone} ${BackgroundStyle.flicker}`}
                 style={{ bottom: '17%', left: '34%', width: '28rem', height: '15rem',
                          background: '#2a0d05',
                          clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)' }} />
            {/* molten crater rim glow */}
            <div className={BackgroundStyle.craterGlow}
                 style={{ bottom: '43.5%', left: '44.5%', width: '7rem', height: '1.6rem' }} />

            {/* eruption fireball bursting out of the crater */}
            <GiFireball
                className={`${BackgroundStyle.glow} ${BackgroundStyle.eruptBurst}`}
                style={{ bottom: '44%', left: '46%', fontSize: '4rem', color: '#ff4500' }} />

            {/* smoke plume rising off the crater */}
            <div className={BackgroundStyle.smokePlume}
                 style={{ bottom: '46%', left: '45%', animationDelay: '0s' }} />
            <div className={BackgroundStyle.smokePlume}
                 style={{ bottom: '44%', left: '49%', animationDelay: '2.6s' }} />

            {/* lava glow pouring down the flank */}
            <div className={BackgroundStyle.lavaFlow}
                 style={{ bottom: '20%', left: '46.5%', height: '24%' }} />

            {embers.map((e, i) => (
                <GiSmallFire key={`ember-${i}`}
                             className={BackgroundStyle.emberRise}
                             style={{ left: e.left, bottom: '44%', fontSize: e.size, color: '#ffae00',
                                      animationDelay: e.delay, animationDuration: e.dur }} />
            ))}
            <GiFire
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ bottom: '19%', left: '22%', fontSize: '6rem', color: '#ff4500', opacity: 0.9 }} />
            <GiFire
                className={`${BackgroundStyle.glow} ${BackgroundStyle.flicker}`}
                style={{ bottom: '19%', right: '22%', fontSize: '5rem', color: '#ffae00', opacity: 0.85,
                         animationDelay: '0.6s' }} />
            {sparks.map((s, i) => (
                <GiSmallFire key={`spark-${i}`}
                             className={BackgroundStyle.twinkle}
                             style={{ left: s.left, top: s.top, fontSize: s.size, color: '#2dd4bf',
                                      opacity: 0.6, animationDelay: `${i * 0.5}s` }} />
            ))}
        </div>
    </div>
);

export default Background;
