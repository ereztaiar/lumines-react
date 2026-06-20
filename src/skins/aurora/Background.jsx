import React from 'react';
import {background as BackgroundStyle} from "Skins/aurora";
import { GiPolarStar, GiPineTree } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

const stars = [
    { left: '4%',  top: '6%',  size: '0.5rem', cls: 'blinkSlow' },
    { left: '14%', top: '16%', size: '0.35rem', cls: 'pulse' },
    { left: '26%', top: '4%',  size: '0.45rem', cls: 'blinkFast' },
    { left: '36%', top: '12%', size: '0.3rem', cls: 'pulse' },
    { left: '50%', top: '5%',  size: '0.4rem', cls: 'blinkSlow' },
    { left: '60%', top: '14%', size: '0.5rem', cls: 'blinkFast' },
    { left: '70%', top: '6%',  size: '0.35rem', cls: 'pulse' },
    { left: '80%', top: '18%', size: '0.45rem', cls: 'blinkSlow' },
    { left: '90%', top: '8%',  size: '0.4rem', cls: 'blinkFast' },
    { left: '96%', top: '20%', size: '0.3rem', cls: 'pulse' },
    { left: '8%',  top: '28%', size: '0.35rem', cls: 'blinkSlow' },
    { left: '92%', top: '30%', size: '0.4rem', cls: 'pulse' },
];

const trees = [
    { left: '0%',  size: '7rem',  color: '#0a1626' },
    { left: '9%',  size: '5rem',  color: '#0c1a2e' },
    { left: '18%', size: '8rem',  color: '#0a1626' },
    { left: '28%', size: '4.5rem', color: '#0c1a2e' },
    { left: '70%', size: '5.5rem', color: '#0c1a2e' },
    { left: '80%', size: '7.5rem', color: '#0a1626' },
    { left: '90%', size: '4rem',  color: '#0c1a2e' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <div className={BackgroundStyle.ribbon}
                 style={{ top: '4%', left: '-10%', width: '90%',
                          background: 'linear-gradient(90deg, rgba(57,255,157,0.45), rgba(157,77,255,0.35))' }} />
            <div className={BackgroundStyle.ribbon}
                 style={{ top: '14%', left: '5%', width: '80%', animationDelay: '2.5s',
                          background: 'linear-gradient(90deg, rgba(77,200,255,0.35), rgba(57,255,157,0.30))' }} />
            <div className={BackgroundStyle.ribbon}
                 style={{ top: '24%', left: '-5%', width: '75%', animationDelay: '5s',
                          background: 'linear-gradient(90deg, rgba(157,77,255,0.30), rgba(77,200,255,0.30))' }} />
            {stars.map((s, i) => (
                <FaStar key={`star-${i}`}
                        className={BackgroundStyle[s.cls]}
                        style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff' }} />
            ))}
            <GiPolarStar
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '36%', right: '12%', fontSize: '5rem', color: '#4dc8ff', opacity: 0.7 }} />
            {trees.map((t, i) => (
                <GiPineTree key={`tree-${i}`}
                            style={{ left: t.left, bottom: 0, fontSize: t.size, color: t.color }} />
            ))}
        </div>
    </div>
);

export default Background;
