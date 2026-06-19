import React from 'react';
import {background as BackgroundStyle} from "Skins/time";
import { FaClock, FaHourglassHalf, FaCog, FaStar, FaCalendarAlt } from 'react-icons/fa';

const stars = [
    { left: '28%', top: '24%', size: '0.4rem',  cls: 'blinkSlow' },
    { left: '36%', top: '32%', size: '0.3rem',  cls: 'pulse' },
    { left: '47%', top: '26%', size: '0.45rem', cls: 'blinkFast' },
    { left: '55%', top: '34%', size: '0.35rem', cls: 'blinkSlow' },
    { left: '62%', top: '24%', size: '0.4rem',  cls: 'pulse' },
    { left: '70%', top: '32%', size: '0.3rem',  cls: 'blinkFast' },
    { left: '76%', top: '26%', size: '0.45rem', cls: 'blinkSlow' },
    { left: '30%', top: '60%', size: '0.35rem', cls: 'pulse' },
    { left: '44%', top: '65%', size: '0.3rem',  cls: 'blinkFast' },
    { left: '58%', top: '62%', size: '0.4rem',  cls: 'blinkSlow' },
    { left: '68%', top: '57%', size: '0.35rem', cls: 'pulse' },
    { left: '77%', top: '66%', size: '0.3rem',  cls: 'blinkFast' },
];

const hourglasses = [
    { left: '30%', top: '42%', size: '2.8rem', opacity: 0.70, cls: 'floatSlow' },
    { left: '43%', top: '58%', size: '1.8rem', opacity: 0.50, cls: 'pulse' },
    { left: '60%', top: '44%', size: '2.2rem', opacity: 0.60, cls: 'driftSlow' },
    { left: '72%', top: '62%', size: '1.5rem', opacity: 0.40, cls: 'floatSlow' },
    { left: '35%', top: '68%', size: '1.2rem', opacity: 0.35, cls: 'blinkSlow' },
];

const gears = [
    { left: '30%', top: '24%', size: '3.5rem', opacity: 0.22 },
    { left: '55%', top: '52%', size: '4.5rem', opacity: 0.18 },
    { left: '70%', top: '32%', size: '2.5rem', opacity: 0.28 },
    { left: '40%', top: '72%', size: '3rem',   opacity: 0.20 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {gears.map((g, i) => (
                <FaCog key={`gear-${i}`}
                       className={BackgroundStyle.spinSlow}
                       style={{ left: g.left, top: g.top, fontSize: g.size, color: '#A78BFA', opacity: g.opacity }} />
            ))}
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={BackgroundStyle[s.cls]}
                        style={{ left: s.left, top: s.top, fontSize: s.size, color: '#F4C430', opacity: 0.7 }} />
            ))}
            {hourglasses.map((h, i) => (
                <FaHourglassHalf key={`hg-${i}`}
                                 className={BackgroundStyle[h.cls]}
                                 style={{ left: h.left, top: h.top, fontSize: h.size, color: '#00D4E8', opacity: h.opacity }} />
            ))}
            <FaCalendarAlt
                className={`${BackgroundStyle.glow} ${BackgroundStyle.driftSlow}`}
                style={{ left: '48%', top: '30%', fontSize: '2.5rem', color: '#FF6B9D', opacity: 0.55 }} />
            <FaClock
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ left: '32%', top: '42%', fontSize: '3rem', color: '#FF6B9D', opacity: 0.45 }} />
            <FaClock
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ left: '68%', top: '25%', fontSize: '8rem', color: '#F4C430' }} />
        </div>
    </div>
);

export default Background;
