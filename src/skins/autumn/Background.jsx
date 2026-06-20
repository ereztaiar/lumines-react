import React from 'react';
import {background as BackgroundStyle} from "Skins/autumn";
import { GiOak, GiAcorn, GiMapleLeaf, GiOakLeaf, GiMushroom } from 'react-icons/gi';

const fallingLeaves = [
    { left: '4%',  size: '1.6rem', delay: '0s',   cmp: 'maple', color: '#e2572d' },
    { left: '14%', size: '1.1rem', delay: '2.4s', cmp: 'oak',   color: '#d9a521' },
    { left: '24%', size: '1.8rem', delay: '4.8s', cmp: 'maple', color: '#e2872d' },
    { left: '34%', size: '1.0rem', delay: '1.1s', cmp: 'oak',   color: '#e2572d' },
    { left: '46%', size: '1.5rem', delay: '6.2s', cmp: 'maple', color: '#d9a521' },
    { left: '58%', size: '1.2rem', delay: '3.3s', cmp: 'oak',   color: '#e2872d' },
    { left: '70%', size: '1.7rem', delay: '0.6s', cmp: 'maple', color: '#e2572d' },
    { left: '80%', size: '1.1rem', delay: '5.5s', cmp: 'oak',   color: '#d9a521' },
    { left: '90%', size: '1.6rem', delay: '2.9s', cmp: 'maple', color: '#e2872d' },
];

const acorns = [
    { left: '10%', size: '1.4rem' },
    { left: '30%', size: '1rem' },
    { left: '50%', size: '1.6rem' },
    { left: '68%', size: '1.1rem' },
    { left: '86%', size: '1.3rem' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiOak
                className={`${BackgroundStyle.glow} ${BackgroundStyle.driftSlow}`}
                style={{ bottom: '4%', left: '6%', fontSize: '11rem', color: '#8b5a2b' }} />
            <GiMushroom
                className={BackgroundStyle.floatSlow}
                style={{ bottom: '2%', right: '14%', fontSize: '3rem', color: '#e2572d', opacity: 0.85 }} />
            {acorns.map((a, i) => (
                <GiAcorn key={`acorn-${i}`}
                         style={{ left: a.left, bottom: 0, fontSize: a.size, color: '#8b5a2b', opacity: 0.9 }} />
            ))}
            {fallingLeaves.map((l, i) => (
                l.cmp === 'maple'
                    ? <GiMapleLeaf key={`leaf-${i}`}
                                   className={BackgroundStyle.leafFall}
                                   style={{ left: l.left, top: '-10%', fontSize: l.size, color: l.color,
                                            animationDelay: l.delay }} />
                    : <GiOakLeaf key={`leaf-${i}`}
                                 className={BackgroundStyle.leafFall}
                                 style={{ left: l.left, top: '-10%', fontSize: l.size, color: l.color,
                                          animationDelay: l.delay }} />
            ))}
        </div>
    </div>
);

export default Background;
