import React from 'react';
import {background as BackgroundStyle} from "Skins/honeycomb";
import { GiBeehive, GiBee, GiHoneycomb, GiDrippingHoney } from 'react-icons/gi';

const bees = [
    { left: '14%', top: '20%', size: '2rem',   delay: '0s' },
    { left: '34%', top: '12%', size: '1.4rem', delay: '0.8s' },
    { left: '58%', top: '26%', size: '1.8rem', delay: '1.6s' },
    { left: '72%', top: '16%', size: '1.3rem', delay: '0.3s' },
    { left: '86%', top: '30%', size: '1.6rem', delay: '2.2s' },
];

const combPatches = [
    { left: '4%',  bottom: '0%', size: '7rem',  opacity: 0.5 },
    { left: '24%', bottom: '0%', size: '5rem',  opacity: 0.35 },
    { left: '70%', bottom: '0%', size: '8rem',  opacity: 0.45 },
    { left: '88%', bottom: '0%', size: '5.5rem', opacity: 0.3 },
];

const drips = [
    { left: '18%', size: '2.6rem', delay: '0s' },
    { left: '46%', size: '2.1rem', delay: '1.3s' },
    { left: '64%', size: '2.8rem', delay: '0.6s' },
    { left: '82%', size: '2.2rem', delay: '2s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {combPatches.map((c, i) => (
                <GiHoneycomb key={`comb-${i}`}
                             style={{ left: c.left, bottom: c.bottom, fontSize: c.size, color: '#7a4a14', opacity: c.opacity }} />
            ))}
            <GiBeehive
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '14%', right: '14%', fontSize: '9rem', color: '#7a4a14' }} />
            {drips.map((d, i) => (
                <GiDrippingHoney key={`drip-${i}`}
                                  className={BackgroundStyle.drip}
                                  style={{ left: d.left, top: '-2%', fontSize: d.size, color: '#f5a623',
                                           opacity: 0.85, animationDelay: d.delay }} />
            ))}
            {bees.map((b, i) => (
                <GiBee key={`bee-${i}`}
                       className={`${BackgroundStyle.glow} ${BackgroundStyle.buzz}`}
                       style={{ left: b.left, top: b.top, fontSize: b.size, color: '#ffc107',
                                animationDelay: b.delay }} />
            ))}
        </div>
    </div>
);

export default Background;
