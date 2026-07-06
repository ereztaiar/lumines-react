import React from 'react';
import {background as BackgroundStyle} from "Skins/pirate";
import {
    GiPirateFlag,
    GiShipWheel,
    GiOpenTreasureChest,
    GiCompass,
    GiGalleon,
    GiParrotHead,
    GiSeagull,
    GiMoon,
} from 'react-icons/gi';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

const gulls = [
    { top: '22%', size: '1.7rem', duration: '24s', delay: '0s' },
    { top: '27%', size: '1.2rem', duration: '30s', delay: '9s' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <GiMoon
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '17%', right: '21%', fontSize: '6rem', color: '#f5eecb', opacity: 0.9 }} />
            <GiPirateFlag
                className={`${BackgroundStyle.glow} ${BackgroundStyle.sway}`}
                style={{ top: '18%', left: '20%', fontSize: '7rem', color: '#d4af37' }} />
            <GiCompass
                className={`${BackgroundStyle.glow} ${BackgroundStyle.spinSlow}`}
                style={{ top: '34%', right: '19%', fontSize: '4.5rem', color: '#1f7a7a', opacity: 0.7 }} />
            <GiShipWheel
                className={BackgroundStyle.spinSlow}
                style={{ top: '48%', left: '20%', fontSize: '5rem', color: '#8b5a2b', opacity: 0.5,
                         animationDirection: 'reverse' }} />

            {gulls.map((g, i) => (
                <GiSeagull key={`gull-${i}`}
                           className={BackgroundStyle.gullFly}
                           style={{ top: g.top, left: 0, fontSize: g.size, color: '#241608', opacity: 0.7,
                                    animationDuration: g.duration, animationDelay: g.delay }} />
            ))}

            {/* galleon rocking on the swell */}
            <GiGalleon
                className={BackgroundStyle.shipRock}
                style={{ left: '34%', bottom: '24%', fontSize: '12rem', color: '#241608', opacity: 0.95 }} />

            <GiOpenTreasureChest
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ bottom: '22%', right: '22%', fontSize: '6rem', color: '#d4af37' }} />
            <GiParrotHead
                className={BackgroundStyle.floatSlow}
                style={{ bottom: '30%', right: '20%', fontSize: '2.8rem', color: '#2fae5a', opacity: 0.95 }} />

            {/* rolling wave bands */}
            <div className={BackgroundStyle.waveBand}
                 style={{ bottom: '18%', opacity: 0.5, animationDuration: '9s' }} />
            <div className={`${BackgroundStyle.waveBand} ${BackgroundStyle.waveBandReverse}`}
                 style={{ bottom: '15.5%', opacity: 0.75, animationDuration: '7s' }} />
        </div>
    </div>
);

export default Background;
