import React from 'react';
import {background as BackgroundStyle} from "Skins/arcade";
import { GiRetroController, GiJoystick } from 'react-icons/gi';

const pixelColors = ['#39ff14', '#ff00ff', '#00eaff', '#ffe600'];

const pixels = [
    { left: '4%',  top: '10%', cls: 'blinkFast' },
    { left: '12%', top: '34%', cls: 'blinkSlow' },
    { left: '20%', top: '6%',  cls: 'blinkFast' },
    { left: '30%', top: '46%', cls: 'blinkSlow' },
    { left: '40%', top: '14%', cls: 'blinkFast' },
    { left: '48%', top: '38%', cls: 'blinkSlow' },
    { left: '58%', top: '8%',  cls: 'blinkFast' },
    { left: '66%', top: '42%', cls: 'blinkSlow' },
    { left: '74%', top: '18%', cls: 'blinkFast' },
    { left: '84%', top: '40%', cls: 'blinkSlow' },
    { left: '90%', top: '12%', cls: 'blinkFast' },
    { left: '95%', top: '30%', cls: 'blinkSlow' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {pixels.map((p, i) => (
                <div key={`pixel-${i}`}
                     className={BackgroundStyle[p.cls]}
                     style={{ position: 'absolute', left: p.left, top: p.top,
                              width: '0.7rem', height: '0.7rem',
                              background: pixelColors[i % pixelColors.length] }} />
            ))}
            <GiJoystick
                className={`${BackgroundStyle.glow} ${BackgroundStyle.driftSlow}`}
                style={{ top: '14%', left: '10%', fontSize: '6rem', color: '#ff00ff', opacity: 0.85 }} />
            <GiRetroController
                className={`${BackgroundStyle.glow} ${BackgroundStyle.floatSlow}`}
                style={{ top: '20%', right: '12%', fontSize: '9rem', color: '#39ff14' }} />
        </div>
    </div>
);

export default Background;
