import React from 'react';
import {background as BackgroundStyle} from "Skins/bubblegum";
import { GiBalloons, GiSparkles, GiBubbles, GiCupcake, GiCandyCanes } from 'react-icons/gi';

const bubbles = [
    { left: '6%',  size: '1.6rem', delay: '0s',   color: '#3ec9ff' },
    { left: '16%', size: '1.0rem', delay: '1.2s', color: '#b388ff' },
    { left: '28%', size: '2.0rem', delay: '0.4s', color: '#ff8ac8' },
    { left: '40%', size: '1.2rem', delay: '2.1s', color: '#3ec9ff' },
    { left: '54%', size: '1.6rem', delay: '0.8s', color: '#b388ff' },
    { left: '66%', size: '0.9rem', delay: '1.6s', color: '#ff8ac8' },
    { left: '78%', size: '2.2rem', delay: '0.2s', color: '#3ec9ff' },
    { left: '88%', size: '1.3rem', delay: '2.6s', color: '#b388ff' },
];

const sparkles = [
    { left: '10%', top: '14%', size: '1rem' },
    { left: '24%', top: '40%', size: '0.7rem' },
    { left: '46%', top: '8%',  size: '0.9rem' },
    { left: '62%', top: '32%', size: '0.6rem' },
    { left: '74%', top: '12%', size: '1.1rem' },
    { left: '90%', top: '38%', size: '0.8rem' },
];

const groundSweets = [
    { left: '4%',  size: '5rem', cmp: 'cupcake', color: '#ff8ac8' },
    { left: '20%', size: '3.4rem', cmp: 'candy', color: '#3ec9ff' },
    { left: '38%', size: '6rem', cmp: 'cupcake', color: '#b388ff' },
    { left: '56%', size: '3.8rem', cmp: 'candy', color: '#ff2d95' },
    { left: '74%', size: '5.4rem', cmp: 'cupcake', color: '#3ec9ff' },
    { left: '90%', size: '3.2rem', cmp: 'candy', color: '#b388ff' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {bubbles.map((b, i) => (
                <GiBubbles key={`bubble-${i}`}
                           className={BackgroundStyle.bobUp}
                           style={{ left: b.left, bottom: '-10%', fontSize: b.size, color: b.color,
                                    opacity: 0.6, animationDelay: b.delay }} />
            ))}
            <GiBalloons
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '10%', right: '12%', fontSize: '9rem', color: '#ff2d95' }} />
            <GiBalloons
                className={`${BackgroundStyle.glow} ${BackgroundStyle.driftSlow}`}
                style={{ top: '6%', left: '8%', fontSize: '6rem', color: '#b388ff', opacity: 0.85 }} />
            {sparkles.map((s, i) => (
                <GiSparkles key={`spark-${i}`}
                            className={BackgroundStyle.twinkle}
                            style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff' }} />
            ))}
            {groundSweets.map((g, i) => (
                g.cmp === 'cupcake'
                    ? <GiCupcake key={`sweet-${i}`}
                                 style={{ left: g.left, bottom: 0, fontSize: g.size, color: g.color, opacity: 0.9 }} />
                    : <GiCandyCanes key={`sweet-${i}`}
                                    style={{ left: g.left, bottom: 0, fontSize: g.size, color: g.color, opacity: 0.85 }} />
            ))}
        </div>
    </div>
);

export default Background;
