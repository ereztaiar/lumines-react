import React from 'react';
import {background as BackgroundStyle} from "Skins/pirate";
import { GiPirateFlag, GiShipWheel, GiOpenTreasureChest, GiCompass, GiSinkingShip } from 'react-icons/gi';

const waves = [
    { left: '0%',  size: '4rem' },
    { left: '14%', size: '3.2rem' },
    { left: '28%', size: '4.4rem' },
    { left: '42%', size: '3rem' },
    { left: '56%', size: '4.2rem' },
    { left: '70%', size: '3.4rem' },
    { left: '84%', size: '4rem' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiPirateFlag
                className={`${BackgroundStyle.glow} ${BackgroundStyle.sway}`}
                style={{ top: '6%', left: '10%', fontSize: '7rem', color: '#d4af37' }} />
            <GiCompass
                className={`${BackgroundStyle.glow} ${BackgroundStyle.spinSlow}`}
                style={{ top: '12%', right: '10%', fontSize: '5rem', color: '#1f7a7a', opacity: 0.7 }} />
            <GiShipWheel
                className={BackgroundStyle.spinSlow}
                style={{ top: '40%', right: '18%', fontSize: '6rem', color: '#8b5a2b', opacity: 0.55 }} />
            <GiSinkingShip
                style={{ bottom: '4%', left: '4%', fontSize: '7rem', color: '#241608', opacity: 0.8 }} />
            <GiOpenTreasureChest
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ bottom: '2%', right: '8%', fontSize: '5rem', color: '#d4af37' }} />
            {waves.map((w, i) => (
                <GiSinkingShip
                    key={`wave-${i}`}
                    className={BackgroundStyle.bobWaves}
                    style={{ left: w.left, bottom: '-2%', fontSize: w.size, color: '#1f7a7a', opacity: 0.18,
                             animationDelay: `${i * 0.3}s`, transform: 'scaleY(0.3) rotate(180deg)' }} />
            ))}
        </div>
    </div>
);

export default Background;
