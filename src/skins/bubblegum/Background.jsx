import React from 'react';
import {background as BackgroundStyle} from "Skins/bubblegum";
import {
    GiBalloons,
    GiSparkles,
    GiBubbles,
    GiCupcake,
    GiCandyCanes,
    GiDonut,
    GiWrappedSweet,
    GiIceCreamCone,
} from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const bubbles = [
    { left: '20%', size: '1.8rem', delay: '0s',   color: '#3ec9ff' },
    { left: '27%', size: '1.1rem', delay: '1.2s', color: '#b388ff' },
    { left: '34%', size: '2.2rem', delay: '0.4s', color: '#ff8ac8' },
    { left: '42%', size: '1.3rem', delay: '2.1s', color: '#3ec9ff' },
    { left: '50%', size: '1.8rem', delay: '0.8s', color: '#b388ff' },
    { left: '58%', size: '1rem',   delay: '1.6s', color: '#ff8ac8' },
    { left: '66%', size: '2.4rem', delay: '0.2s', color: '#3ec9ff' },
    { left: '74%', size: '1.4rem', delay: '2.6s', color: '#b388ff' },
    { left: '80%', size: '1.7rem', delay: '3.4s', color: '#ff8ac8' },
    { left: '46%', size: '1.2rem', delay: '4.2s', color: '#3ec9ff' },
];

const sparkles = [
    { left: '22%', top: '20%', size: '1.2rem' },
    { left: '32%', top: '42%', size: '0.9rem' },
    { left: '46%', top: '18%', size: '1.1rem' },
    { left: '58%', top: '34%', size: '0.8rem' },
    { left: '68%', top: '22%', size: '1.3rem' },
    { left: '78%', top: '40%', size: '1rem' },
    { left: '40%', top: '55%', size: '0.9rem' },
    { left: '72%', top: '58%', size: '1.1rem' },
];

const groundSweets = [
    { left: '19%', size: '6rem',   cmp: 'cupcake', color: '#ff8ac8' },
    { left: '28%', size: '4.4rem', cmp: 'candy',   color: '#3ec9ff' },
    { left: '36%', size: '5rem',   cmp: 'icecream', color: '#b388ff' },
    { left: '46%', size: '7rem',   cmp: 'cupcake', color: '#b388ff' },
    { left: '56%', size: '4.6rem', cmp: 'candy',   color: '#ff2d95' },
    { left: '64%', size: '5.4rem', cmp: 'icecream', color: '#ff8ac8' },
    { left: '73%', size: '6.4rem', cmp: 'cupcake', color: '#3ec9ff' },
    { left: '81%', size: '4rem',   cmp: 'candy',   color: '#b388ff' },
];

const sweetFor = (cmp) => (cmp === 'cupcake' ? GiCupcake : cmp === 'candy' ? GiCandyCanes : GiIceCreamCone);

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* inflating gum bubble */}
            <div className={BackgroundStyle.gumBubble}
                 style={{ top: '22%', left: '30%', width: '9rem', height: '9rem' }} />

            {/* giant spinning donut hero */}
            <GiDonut
                className={`${BackgroundStyle.glow} ${BackgroundStyle.spinFloat}`}
                style={{ top: '18%', right: '30%', fontSize: '12rem', color: '#ff2d95' }} />

            {/* wrapped sweets tumbling down */}
            <GiWrappedSweet
                className={BackgroundStyle.tumbleFall}
                style={{ left: '26%', top: '-10%', fontSize: '2.6rem', color: '#3ec9ff', opacity: 0.85 }} />
            <GiWrappedSweet
                className={BackgroundStyle.tumbleFall}
                style={{ left: '52%', top: '-10%', fontSize: '2rem', color: '#b388ff', opacity: 0.8,
                         animationDelay: '3.5s' }} />
            <GiWrappedSweet
                className={BackgroundStyle.tumbleFall}
                style={{ left: '72%', top: '-10%', fontSize: '2.4rem', color: '#ff8ac8', opacity: 0.85,
                         animationDelay: '7s' }} />

            {bubbles.map((b, i) => (
                <GiBubbles key={`bubble-${i}`}
                           className={BackgroundStyle.bobUp}
                           style={{ left: b.left, bottom: '-10%', fontSize: b.size, color: b.color,
                                    opacity: 0.6, animationDelay: b.delay }} />
            ))}
            <GiBalloons
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '30%', left: '20%', fontSize: '7rem', color: '#b388ff', opacity: 0.9 }} />
            {sparkles.map((s, i) => (
                <GiSparkles key={`spark-${i}`}
                            className={BackgroundStyle.twinkle}
                            style={{ left: s.left, top: s.top, fontSize: s.size, color: '#ffffff',
                                     animationDelay: `${i * 0.4}s` }} />
            ))}
            {groundSweets.map((g, i) => {
                const Sweet = sweetFor(g.cmp);
                return (
                    <Sweet key={`sweet-${i}`}
                           className={BackgroundStyle.wobble}
                           style={{ left: g.left, bottom: '18%', fontSize: g.size, color: g.color,
                                    opacity: 0.92, animationDelay: `${i * 0.6}s` }} />
                );
            })}
        </div>
    </div>
);

export default Background;
