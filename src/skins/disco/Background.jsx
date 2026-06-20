import React from 'react';
import {background as BackgroundStyle} from "Skins/disco";
import { GiMirrorMirror, GiSparkles } from 'react-icons/gi';
import { FaStar, FaMusic } from 'react-icons/fa';

const glints = [
    { left: '8%',  top: '16%', size: '0.9rem', cls: 'blinkFast' },
    { left: '20%', top: '38%', size: '0.6rem', cls: 'blinkSlow' },
    { left: '32%', top: '10%', size: '0.8rem', cls: 'blinkFast' },
    { left: '46%', top: '30%', size: '0.5rem', cls: 'blinkSlow' },
    { left: '58%', top: '14%', size: '0.9rem', cls: 'blinkFast' },
    { left: '70%', top: '34%', size: '0.6rem', cls: 'blinkSlow' },
    { left: '82%', top: '12%', size: '0.8rem', cls: 'blinkFast' },
    { left: '92%', top: '40%', size: '0.5rem', cls: 'blinkSlow' },
];

const notes = [
    { left: '14%', size: '1.6rem', color: '#ffd700' },
    { left: '50%', size: '1.3rem', color: '#ff2bd6' },
    { left: '78%', size: '1.8rem', color: '#00e5ff' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiMirrorMirror
                className={`${BackgroundStyle.glow} ${BackgroundStyle.spinSlow}`}
                style={{ top: '8%', left: '38%', fontSize: '9rem', color: '#ffd700' }} />
            {glints.map((g, i) => (
                <FaStar key={`glint-${i}`}
                        className={BackgroundStyle[g.cls]}
                        style={{ left: g.left, top: g.top, fontSize: g.size, color: '#ffffff' }} />
            ))}
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '55%', right: '10%', fontSize: '4rem', color: '#00e5ff', opacity: 0.7 }} />
            <GiSparkles
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ bottom: '10%', left: '8%', fontSize: '3.5rem', color: '#ff2bd6', opacity: 0.7 }} />
            {notes.map((n, i) => (
                <FaMusic key={`note-${i}`}
                         className={BackgroundStyle.driftSlow}
                         style={{ left: n.left, bottom: '4%', fontSize: n.size, color: n.color, opacity: 0.8 }} />
            ))}
        </div>
    </div>
);

export default Background;
