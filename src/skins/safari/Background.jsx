import React from 'react';
import {background as BackgroundStyle} from "Skins/safari";
import { GiPalmTree, GiElephant, GiLion, GiMonkey } from 'react-icons/gi';

const palms = [
    { left: '2%',  size: '7rem', color: '#3fae46' },
    { left: '14%', size: '5rem', color: '#327f38' },
    { left: '80%', size: '6rem', color: '#3fae46' },
    { left: '92%', size: '4.5rem', color: '#327f38' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <div style={{ position: 'absolute', top: '8%', right: '14%', width: '7rem', height: '7rem',
                          borderRadius: '50%', background: 'radial-gradient(circle, #ffe9b0 0%, rgba(255,233,176,0) 70%)' }} />
            <GiMonkey
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '14%', left: '20%', fontSize: '3rem', color: '#8b5a2b', opacity: 0.8 }} />
            <GiLion
                className={`${BackgroundStyle.glow} ${BackgroundStyle.swayWalk}`}
                style={{ bottom: '6%', left: '46%', fontSize: '5rem', color: '#e8a23c' }} />
            <GiElephant
                className={`${BackgroundStyle.glow} ${BackgroundStyle.driftSlow}`}
                style={{ bottom: '4%', left: '62%', fontSize: '6.5rem', color: '#3fae46' }} />
            {palms.map((p, i) => (
                <GiPalmTree key={`palm-${i}`}
                            style={{ left: p.left, bottom: 0, fontSize: p.size, color: p.color }} />
            ))}
        </div>
    </div>
);

export default Background;
