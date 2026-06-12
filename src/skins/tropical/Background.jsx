import React from 'react';
import {background as BackgroundStyle} from "Skins/tropical";
import {
    GiSun,
    GiPalmTree,
    GiIsland,
    GiToucan,
    GiParrotHead,
    GiFlamingo,
    GiSeagull,
    GiFlowerEmblem,
} from 'react-icons/gi';
import { FaCloud, FaCircle, FaUmbrellaBeach } from 'react-icons/fa';

/* bright confetti raining from above the viewport — mango / coral / aqua / lime */
const confetti = [
    { Icon: GiFlowerEmblem, left: '3%',  top: '-44%', size: '1.4rem', color: '#ffd166', opacity: 0.8 },
    { Icon: FaCircle,       left: '8%',  top: '-20%', size: '0.7rem', color: '#ff4f7b', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '13%', top: '-36%', size: '1.1rem', color: '#5ee6d0', opacity: 0.65 },
    { Icon: FaCircle,       left: '18%', top: '-12%', size: '0.6rem', color: '#ffe066', opacity: 0.55 },
    { Icon: GiFlowerEmblem, left: '23%', top: '-48%', size: '1.5rem', color: '#ff8c42', opacity: 0.75 },
    { Icon: FaCircle,       left: '28%', top: '-26%', size: '0.8rem', color: '#9defe8', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '33%', top: '-40%', size: '1.2rem', color: '#ff4f7b', opacity: 0.7 },
    { Icon: FaCircle,       left: '38%', top: '-15%', size: '0.6rem', color: '#aef25e', opacity: 0.55 },
    { Icon: GiFlowerEmblem, left: '43%', top: '-45%', size: '1.4rem', color: '#ffd166', opacity: 0.75 },
    { Icon: FaCircle,       left: '48%', top: '-29%', size: '0.7rem', color: '#ff8c42', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '53%', top: '-37%', size: '1rem',   color: '#9defe8', opacity: 0.6 },
    { Icon: FaCircle,       left: '58%', top: '-10%', size: '0.8rem', color: '#ff4f7b', opacity: 0.55 },
    { Icon: GiFlowerEmblem, left: '63%', top: '-47%', size: '1.5rem', color: '#5ee6d0', opacity: 0.7 },
    { Icon: FaCircle,       left: '68%', top: '-22%', size: '0.6rem', color: '#ffe066', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '73%', top: '-33%', size: '1.2rem', color: '#ff8c42', opacity: 0.7 },
    { Icon: FaCircle,       left: '78%', top: '-49%', size: '0.7rem', color: '#aef25e', opacity: 0.55 },
    { Icon: GiFlowerEmblem, left: '83%', top: '-18%', size: '1.3rem', color: '#ffd166', opacity: 0.75 },
    { Icon: FaCircle,       left: '88%', top: '-41%', size: '0.8rem', color: '#ff4f7b', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '93%', top: '-27%', size: '1.1rem', color: '#9defe8', opacity: 0.65 },
    { Icon: FaCircle,       left: '50%', top: '-50%', size: '0.6rem', color: '#5ee6d0', opacity: 0.5 },
];

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. */
const clouds = [
    { left: '24%', top: '21%', size: '5rem',   opacity: 0.3 },
    { left: '44%', top: '25%', size: '6.5rem', opacity: 0.35 },
    { left: '60%', top: '20%', size: '4rem',   opacity: 0.25 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* blazing sun low over the horizon */}
            <GiSun
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '21%', right: '25%', fontSize: '7rem', color: '#ffd166', opacity: 0.95 }}
            />
            {clouds.map((c, i) => (
                <FaCloud key={`cloud-${i}`}
                         className={BackgroundStyle.driftSlow}
                         style={{ left: c.left, top: c.top, fontSize: c.size, color: '#ffe3c2', opacity: c.opacity }} />
            ))}
            {/* seagulls gliding across the sunset */}
            <GiSeagull
                className={BackgroundStyle.glide}
                style={{ left: '32%', top: '24%', fontSize: '2.2rem', color: '#fff6e8', opacity: 0.8 }}
            />
            <GiSeagull
                className={BackgroundStyle.floatSlow}
                style={{ left: '48%', top: '28%', fontSize: '1.5rem', color: '#ffe3c2', opacity: 0.6 }}
            />
            {/* island silhouette rising on the right */}
            <GiIsland
                style={{ left: '60%', bottom: '19%', fontSize: '16rem', color: '#0e3438', opacity: 0.9 }}
            />
            {/* palm grove framing the left side */}
            <GiPalmTree
                style={{ left: '18%', bottom: '18%', fontSize: '12rem', color: '#15393b', opacity: 0.95 }}
            />
            <GiPalmTree
                style={{ left: '28%', bottom: '19%', fontSize: '8rem', color: '#1d4a4d', opacity: 0.8 }}
            />
            {/* beach life along the shore */}
            <GiToucan
                style={{ left: '24%', bottom: '34%', fontSize: '2.6rem', color: '#ffd166', opacity: 0.95 }}
            />
            <GiParrotHead
                className={BackgroundStyle.floatSlow}
                style={{ left: '70%', top: '30%', fontSize: '2rem', color: '#ff4f7b', opacity: 0.85 }}
            />
            <GiFlamingo
                style={{ left: '42%', bottom: '18%', fontSize: '4rem', color: '#ff6f91', opacity: 0.9 }}
            />
            <FaUmbrellaBeach
                style={{ left: '50%', bottom: '18.5%', fontSize: '3rem', color: '#ffe066', opacity: 0.85 }}
            />
            {confetti.map(({ Icon, ...p }, i) => (
                <Icon key={`confetti-${i}`}
                      className={BackgroundStyle[`fall${(i % 4) + 1}`]}
                      style={{ left: p.left, top: p.top, fontSize: p.size, color: p.color, opacity: p.opacity }} />
            ))}
        </div>
    </div>
);

export default Background;
