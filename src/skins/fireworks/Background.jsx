import React from 'react';
import {background as BackgroundStyle} from "Skins/fireworks";
import { GiFireworkRocket, GiRocket, GiSparkles } from 'react-icons/gi';

const bursts = [
    { left: '14%', top: '18%', size: '3.2rem', color: '#ff2e4d', delay: '0s' },
    { left: '32%', top: '10%', size: '2.4rem', color: '#2ee6ff', delay: '0.7s' },
    { left: '52%', top: '22%', size: '3.6rem', color: '#ffd34d', delay: '1.4s' },
    { left: '70%', top: '8%',  size: '2.8rem', color: '#7a2ff7', delay: '2.1s' },
    { left: '86%', top: '26%', size: '2.2rem', color: '#ff2e4d', delay: '0.4s' },
];

const trails = [
    { left: '20%', size: '1.6rem', color: '#ffd34d', delay: '0s' },
    { left: '46%', size: '1.4rem', color: '#2ee6ff', delay: '0.9s' },
    { left: '64%', size: '1.8rem', color: '#ff2e4d', delay: '1.7s' },
    { left: '80%', size: '1.5rem', color: '#7a2ff7', delay: '0.3s' },
];

const skyline = [
    { left: '0%',  width: '8%',  height: '10%' },
    { left: '8%',  width: '6%',  height: '16%' },
    { left: '15%', width: '9%',  height: '7%' },
    { left: '26%', width: '7%',  height: '13%' },
    { left: '35%', width: '10%', height: '9%' },
    { left: '47%', width: '6%',  height: '18%' },
    { left: '55%', width: '8%',  height: '8%' },
    { left: '65%', width: '9%',  height: '14%' },
    { left: '76%', width: '7%',  height: '11%' },
    { left: '85%', width: '8%',  height: '6%' },
    { left: '93%', width: '7%',  height: '15%' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {bursts.map((b, i) => (
                <GiSparkles key={`burst-${i}`}
                            className={`${BackgroundStyle.glow} ${BackgroundStyle.burstPop}`}
                            style={{ left: b.left, top: b.top, fontSize: b.size, color: b.color,
                                     animationDelay: b.delay }} />
            ))}
            {trails.map((t, i) => (
                <GiRocket key={`trail-${i}`}
                          className={BackgroundStyle.rise}
                          style={{ left: t.left, bottom: '0%', fontSize: t.size, color: t.color,
                                   opacity: 0.85, animationDelay: t.delay }} />
            ))}
            <GiFireworkRocket
                className={`${BackgroundStyle.glow} ${BackgroundStyle.blinkSlow}`}
                style={{ top: '14%', left: '8%', fontSize: '4rem', color: '#ff2e4d', opacity: 0.7 }} />
            <GiFireworkRocket
                className={`${BackgroundStyle.glow} ${BackgroundStyle.blinkFast}`}
                style={{ top: '12%', right: '10%', fontSize: '3.4rem', color: '#2ee6ff', opacity: 0.7 }} />
            {skyline.map((s, i) => (
                <div key={`bldg-${i}`}
                     style={{ position: 'absolute', left: s.left, bottom: 0, width: s.width, height: s.height,
                              background: '#0a1230', opacity: 0.85 }} />
            ))}
        </div>
    </div>
);

export default Background;
