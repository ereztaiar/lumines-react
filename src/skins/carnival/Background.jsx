import React from 'react';
import {background as BackgroundStyle} from "Skins/carnival";
import { GiClown, GiAirBalloon, GiBalloons, GiPopcorn } from 'react-icons/gi';

const balloons = [
    { left: '10%', size: '4rem', color: '#ff3b3b', delay: '0s' },
    { left: '78%', size: '3.4rem', color: '#2f6fed', delay: '1.5s' },
    { left: '60%', size: '2.6rem', color: '#ffd23f', delay: '0.8s' },
];

const popcorns = [
    { left: '5%',  size: '2.6rem', opacity: 0.85 },
    { left: '18%', size: '1.8rem', opacity: 0.7 },
    { left: '34%', size: '3rem',   opacity: 0.9 },
    { left: '50%', size: '2rem',   opacity: 0.75 },
    { left: '66%', size: '2.8rem', opacity: 0.85 },
    { left: '82%', size: '2.2rem', opacity: 0.7 },
    { left: '94%', size: '1.9rem', opacity: 0.8 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiClown
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '8%', left: '38%', fontSize: '8rem', color: '#ffffff' }} />
            <GiAirBalloon
                className={`${BackgroundStyle.glow} ${BackgroundStyle.bobUp}`}
                style={{ top: '4%', right: '10%', fontSize: '6rem', color: '#ff3b3b' }} />
            {balloons.map((b, i) => (
                <GiBalloons key={`balloon-${i}`}
                            className={BackgroundStyle.driftSlow}
                            style={{ left: b.left, top: '18%', fontSize: b.size, color: b.color,
                                     opacity: 0.85, animationDelay: b.delay }} />
            ))}
            {popcorns.map((p, i) => (
                <GiPopcorn key={`popcorn-${i}`}
                           className={BackgroundStyle.pulse}
                           style={{ left: p.left, bottom: 0, fontSize: p.size, color: '#ffd23f', opacity: p.opacity }} />
            ))}
        </div>
    </div>
);

export default Background;
