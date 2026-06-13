import React from 'react';
import {background as BackgroundStyle} from "Skins/deep-sea";
import { GiJellyfish, GiOctopus, GiSeahorse } from 'react-icons/gi';
import { FaCircle } from 'react-icons/fa';

const bubbles = [
    { left: '6%',  size: '0.6rem', opacity: 0.4, delay: 0 },
    { left: '18%', size: '0.4rem', opacity: 0.3, delay: 2 },
    { left: '30%', size: '0.7rem', opacity: 0.35, delay: 4 },
    { left: '45%', size: '0.5rem', opacity: 0.3, delay: 1 },
    { left: '58%', size: '0.45rem', opacity: 0.4, delay: 6 },
    { left: '70%', size: '0.6rem', opacity: 0.3, delay: 3 },
    { left: '82%', size: '0.5rem', opacity: 0.35, delay: 5 },
    { left: '92%', size: '0.4rem', opacity: 0.3, delay: 7 },
];

const jellyfish = [
    { left: '10%', top: '10%', size: '4.5rem', color: '#c4f1ff', opacity: 0.7 },
    { left: '70%', top: '6%',  size: '3.5rem', color: '#5eead4', opacity: 0.6 },
    { left: '40%', top: '20%', size: '2.8rem', color: '#9be8e0', opacity: 0.5 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {jellyfish.map((j, i) => (
                <GiJellyfish key={`jelly-${i}`}
                             className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                             style={{ left: j.left, top: j.top, fontSize: j.size, color: j.color, opacity: j.opacity }} />
            ))}
            <GiOctopus
                className={BackgroundStyle.driftSlow}
                style={{ left: '8%', bottom: '4%', fontSize: '8rem', color: '#0a3d4d', opacity: 0.85 }} />
            <GiSeahorse
                className={BackgroundStyle.floatSlow}
                style={{ right: '12%', bottom: '8%', fontSize: '6rem', color: '#155e56', opacity: 0.8 }} />
            {bubbles.map((b, i) => (
                <FaCircle key={`bubble-${i}`}
                          className={BackgroundStyle.riseSlow}
                          style={{ left: b.left, bottom: '0%', fontSize: b.size, opacity: b.opacity, color: '#9be8e0',
                                   animationDelay: `${b.delay}s` }} />
            ))}
        </div>
    </div>
);

export default Background;
