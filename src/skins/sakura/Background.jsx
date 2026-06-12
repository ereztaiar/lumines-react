import React from 'react';
import {background as BackgroundStyle} from "Skins/sakura";
import {
    GiFuji,
    GiFruitTree,
    GiPaperCrane,
    GiFallingLeaf,
    GiCurledLeaf,
    GiFlowerEmblem,
} from 'react-icons/gi';
import { FaCircle, FaCloud } from 'react-icons/fa';

/* pink / white / blue petals raining from above the viewport */
const petals = [
    { Icon: GiFallingLeaf,  left: '2%',  top: '-45%', size: '1.5rem', color: '#ffb7d0', opacity: 0.8 },
    { Icon: GiCurledLeaf,   left: '6%',  top: '-22%', size: '1rem',   color: '#fff0f6', opacity: 0.55 },
    { Icon: GiFlowerEmblem, left: '10%', top: '-38%', size: '1.3rem', color: '#9cc4e4', opacity: 0.6 },
    { Icon: GiFallingLeaf,  left: '14%', top: '-12%', size: '1.1rem', color: '#f48fb1', opacity: 0.65 },
    { Icon: GiCurledLeaf,   left: '18%', top: '-48%', size: '1.6rem', color: '#ffd6e7', opacity: 0.75 },
    { Icon: GiFlowerEmblem, left: '22%', top: '-28%', size: '0.9rem', color: '#fff0f6', opacity: 0.5 },
    { Icon: GiFallingLeaf,  left: '26%', top: '-40%', size: '1.4rem', color: '#bcd7ee', opacity: 0.6 },
    { Icon: GiCurledLeaf,   left: '30%', top: '-16%', size: '1rem',   color: '#ffb7d0', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '34%', top: '-44%', size: '1.5rem', color: '#f48fb1', opacity: 0.7 },
    { Icon: GiFallingLeaf,  left: '38%', top: '-25%', size: '1.1rem', color: '#fff0f6', opacity: 0.55 },
    { Icon: GiCurledLeaf,   left: '42%', top: '-36%', size: '1.3rem', color: '#9cc4e4', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '46%', top: '-10%', size: '0.9rem', color: '#ffd6e7', opacity: 0.5 },
    { Icon: GiFallingLeaf,  left: '50%', top: '-47%', size: '1.6rem', color: '#ffb7d0', opacity: 0.8 },
    { Icon: GiCurledLeaf,   left: '54%', top: '-20%', size: '1rem',   color: '#fff0f6', opacity: 0.55 },
    { Icon: GiFlowerEmblem, left: '58%', top: '-42%', size: '1.4rem', color: '#bcd7ee', opacity: 0.65 },
    { Icon: GiFallingLeaf,  left: '62%', top: '-14%', size: '1.1rem', color: '#f48fb1', opacity: 0.6 },
    { Icon: GiCurledLeaf,   left: '66%', top: '-34%', size: '1.3rem', color: '#ffd6e7', opacity: 0.7 },
    { Icon: GiFlowerEmblem, left: '70%', top: '-49%', size: '1rem',   color: '#fff0f6', opacity: 0.5 },
    { Icon: GiFallingLeaf,  left: '74%', top: '-26%', size: '1.5rem', color: '#9cc4e4', opacity: 0.6 },
    { Icon: GiCurledLeaf,   left: '78%', top: '-43%', size: '1.1rem', color: '#ffb7d0', opacity: 0.65 },
    { Icon: GiFlowerEmblem, left: '82%', top: '-18%', size: '1.3rem', color: '#f48fb1', opacity: 0.7 },
    { Icon: GiFallingLeaf,  left: '86%', top: '-39%', size: '0.9rem', color: '#fff0f6', opacity: 0.5 },
    { Icon: GiCurledLeaf,   left: '90%', top: '-30%', size: '1.4rem', color: '#bcd7ee', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '94%', top: '-46%', size: '1.2rem', color: '#ffd6e7', opacity: 0.65 },
    { Icon: GiFallingLeaf,  left: '8%',  top: '-8%',  size: '0.9rem', color: '#fff0f6', opacity: 0.45 },
    { Icon: GiCurledLeaf,   left: '36%', top: '-50%', size: '1.2rem', color: '#ffb7d0', opacity: 0.6 },
    { Icon: GiFlowerEmblem, left: '64%', top: '-7%',  size: '1rem',   color: '#9cc4e4', opacity: 0.5 },
    { Icon: GiFallingLeaf,  left: '92%', top: '-11%', size: '1.1rem', color: '#ffd6e7', opacity: 0.55 },
];

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. */
const clouds = [
    { left: '22%', top: '20%', size: '5rem',   opacity: 0.18 },
    { left: '43%', top: '24%', size: '6.5rem', opacity: 0.22 },
    { left: '59%', top: '28%', size: '4rem',   opacity: 0.15 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* red sun disc, Hinomaru-style */}
            <FaCircle
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '20%', right: '22%', fontSize: '5.5rem', color: '#d8474f', opacity: 0.85 }}
            />
            {clouds.map((c, i) => (
                <FaCloud key={`cloud-${i}`}
                         className={BackgroundStyle.driftSlow}
                         style={{ left: c.left, top: c.top, fontSize: c.size, color: '#dce9f5', opacity: c.opacity }} />
            ))}
            {/* paper cranes gliding across the sky */}
            <GiPaperCrane
                className={BackgroundStyle.floatSlow}
                style={{ left: '30%', top: '24%', fontSize: '2.2rem', color: '#fff0f6', opacity: 0.75 }}
            />
            <GiPaperCrane
                className={BackgroundStyle.driftSlow}
                style={{ left: '68%', top: '28%', fontSize: '1.6rem', color: '#ffd6e7', opacity: 0.55 }}
            />
            {/* Mount Fuji — the focal point, rising on the open right side */}
            <GiFuji
                style={{ left: '58%', bottom: '20%', fontSize: '28rem', color: '#2d5078', opacity: 0.95 }}
            />
            {/* blossom trees framing the scene */}
            <GiFruitTree
                style={{ left: '17%', bottom: '19%', fontSize: '10rem', color: '#d97aa3', opacity: 0.9 }}
            />
            <GiFruitTree
                style={{ left: '76%', bottom: '18%', fontSize: '8rem', color: '#a85d77', opacity: 0.7 }}
            />
            {petals.map(({ Icon, ...p }, i) => (
                <Icon key={`petal-${i}`}
                      className={BackgroundStyle[`fall${(i % 4) + 1}`]}
                      style={{ left: p.left, top: p.top, fontSize: p.size, color: p.color, opacity: p.opacity }} />
            ))}
        </div>
    </div>
);

export default Background;
