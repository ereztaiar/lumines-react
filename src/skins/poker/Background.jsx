import React from 'react';
import {background as BackgroundStyle} from "Skins/poker";
import {
    GiPokerHand,
    GiTwoCoins,
    GiCoins,
    GiRollingDices,
    GiHearts,
    GiSpades,
    GiDiamonds,
    GiClubs,
} from 'react-icons/gi';

const suits = [
    { Icon: GiHearts,   left: '3%',  top: '-45%', size: '2.9rem', color: '#d11a2d', opacity: 0.7 },
    { Icon: GiSpades,   left: '8%',  top: '-27%', size: '1.9rem', color: '#f5f0e6', opacity: 0.45 },
    { Icon: GiDiamonds, left: '13%', top: '-47%', size: '2.4rem', color: '#d11a2d', opacity: 0.6 },
    { Icon: GiClubs,    left: '18%', top: '-21%', size: '1.8rem', color: '#f5f0e6', opacity: 0.4 },
    { Icon: GiHearts,   left: '23%', top: '-39%', size: '2.1rem', color: '#d11a2d', opacity: 0.55 },
    { Icon: GiSpades,   left: '28%', top: '-49%', size: '2.7rem', color: '#f5f0e6', opacity: 0.5 },
    { Icon: GiDiamonds, left: '33%', top: '-25%', size: '1.6rem', color: '#d11a2d', opacity: 0.45 },
    { Icon: GiClubs,    left: '38%', top: '-43%', size: '2.2rem', color: '#f5f0e6', opacity: 0.5 },
    { Icon: GiHearts,   left: '43%', top: '-15%', size: '1.8rem', color: '#d11a2d', opacity: 0.4 },
    { Icon: GiSpades,   left: '48%', top: '-46%', size: '3rem',   color: '#f5f0e6', opacity: 0.55 },
    { Icon: GiDiamonds, left: '53%', top: '-31%', size: '1.9rem', color: '#d11a2d', opacity: 0.5 },
    { Icon: GiClubs,    left: '58%', top: '-11%', size: '1.6rem', color: '#f5f0e6', opacity: 0.35 },
    { Icon: GiHearts,   left: '63%', top: '-48%', size: '2.4rem', color: '#d11a2d', opacity: 0.6 },
    { Icon: GiSpades,   left: '68%', top: '-24%', size: '2.1rem', color: '#f5f0e6', opacity: 0.45 },
    { Icon: GiDiamonds, left: '73%', top: '-40%', size: '2.9rem', color: '#d11a2d', opacity: 0.65 },
    { Icon: GiClubs,    left: '78%', top: '-17%', size: '1.8rem', color: '#f5f0e6', opacity: 0.4 },
    { Icon: GiHearts,   left: '83%', top: '-44%', size: '1.9rem', color: '#d11a2d', opacity: 0.5 },
    { Icon: GiSpades,   left: '88%', top: '-29%', size: '2.6rem', color: '#f5f0e6', opacity: 0.55 },
    { Icon: GiDiamonds, left: '93%', top: '-49%', size: '2.1rem', color: '#d11a2d', opacity: 0.5 },
    { Icon: GiClubs,    left: '5%',  top: '-9%',  size: '1.6rem', color: '#f5f0e6', opacity: 0.35 },
    { Icon: GiHearts,   left: '11%', top: '-37%', size: '2.2rem', color: '#d11a2d', opacity: 0.55 },
    { Icon: GiSpades,   left: '16%', top: '-13%', size: '1.9rem', color: '#f5f0e6', opacity: 0.4 },
    { Icon: GiDiamonds, left: '21%', top: '-29%', size: '1.6rem', color: '#d11a2d', opacity: 0.45 },
    { Icon: GiClubs,    left: '26%', top: '-7%',  size: '2.1rem', color: '#f5f0e6', opacity: 0.4 },
    { Icon: GiHearts,   left: '31%', top: '-35%', size: '2.6rem', color: '#d11a2d', opacity: 0.6 },
    { Icon: GiSpades,   left: '36%', top: '-19%', size: '1.6rem', color: '#f5f0e6', opacity: 0.35 },
    { Icon: GiDiamonds, left: '41%', top: '-41%', size: '1.9rem', color: '#d11a2d', opacity: 0.5 },
    { Icon: GiClubs,    left: '46%', top: '-27%', size: '2.4rem', color: '#f5f0e6', opacity: 0.5 },
    { Icon: GiHearts,   left: '51%', top: '-9%',  size: '1.6rem', color: '#d11a2d', opacity: 0.4 },
    { Icon: GiSpades,   left: '56%', top: '-39%', size: '2.1rem', color: '#f5f0e6', opacity: 0.5 },
    { Icon: GiDiamonds, left: '61%', top: '-17%', size: '2.2rem', color: '#d11a2d', opacity: 0.55 },
    { Icon: GiClubs,    left: '66%', top: '-33%', size: '1.6rem', color: '#f5f0e6', opacity: 0.35 },
    { Icon: GiHearts,   left: '71%', top: '-11%', size: '1.9rem', color: '#d11a2d', opacity: 0.45 },
    { Icon: GiSpades,   left: '76%', top: '-47%', size: '2.4rem', color: '#f5f0e6', opacity: 0.55 },
    { Icon: GiDiamonds, left: '81%', top: '-23%', size: '1.8rem', color: '#d11a2d', opacity: 0.45 },
    { Icon: GiClubs,    left: '86%', top: '-37%', size: '2.1rem', color: '#f5f0e6', opacity: 0.45 },
];

const chips = [
    { Icon: GiTwoCoins,     left: '1%',  size: '6.9rem',  color: '#d4af37', opacity: 0.9 },
    { Icon: GiCoins,        left: '5%',  size: '5rem',    color: '#a8862c', opacity: 0.7 },
    { Icon: GiPokerHand,    left: '9%',  size: '8.75rem', color: '#d11a2d', opacity: 0.85 },
    { Icon: GiRollingDices, left: '13%', size: '5.6rem',  color: '#f5f0e6', opacity: 0.8 },
    { Icon: GiTwoCoins,     left: '17%', size: '4.4rem',  color: '#a8862c', opacity: 0.6 },
    { Icon: GiCoins,        left: '21%', size: '7.5rem',  color: '#d4af37', opacity: 0.9 },
    { Icon: GiPokerHand,    left: '25%', size: '5.6rem',  color: '#8c1525', opacity: 0.65 },
    { Icon: GiRollingDices, left: '29%', size: '4.4rem',  color: '#f5f0e6', opacity: 0.6 },
    { Icon: GiTwoCoins,     left: '33%', size: '6.25rem', color: '#d4af37', opacity: 0.85 },
    { Icon: GiCoins,        left: '37%', size: '4.4rem',  color: '#a8862c', opacity: 0.65 },
    { Icon: GiPokerHand,    left: '41%', size: '7.5rem',  color: '#d11a2d', opacity: 0.8 },
    { Icon: GiRollingDices, left: '45%', size: '5rem',    color: '#f5f0e6', opacity: 0.75 },
    { Icon: GiTwoCoins,     left: '49%', size: '4.4rem',  color: '#a8862c', opacity: 0.6 },
    { Icon: GiCoins,        left: '53%', size: '6.9rem',  color: '#d4af37', opacity: 0.9 },
    { Icon: GiPokerHand,    left: '57%', size: '5rem',    color: '#8c1525', opacity: 0.6 },
    { Icon: GiRollingDices, left: '61%', size: '6.25rem', color: '#f5f0e6', opacity: 0.8 },
    { Icon: GiTwoCoins,     left: '65%', size: '5.6rem',  color: '#d4af37', opacity: 0.8 },
    { Icon: GiCoins,        left: '69%', size: '4.4rem',  color: '#a8862c', opacity: 0.65 },
    { Icon: GiPokerHand,    left: '73%', size: '8.1rem',  color: '#d11a2d', opacity: 0.85 },
    { Icon: GiRollingDices, left: '78%', size: '4.4rem',  color: '#f5f0e6', opacity: 0.6 },
    { Icon: GiTwoCoins,     left: '82%', size: '7.5rem',  color: '#d4af37', opacity: 0.9 },
    { Icon: GiCoins,        left: '86%', size: '5rem',    color: '#a8862c', opacity: 0.7 },
    { Icon: GiPokerHand,    left: '90%', size: '6.25rem', color: '#8c1525', opacity: 0.7 },
    { Icon: GiRollingDices, left: '94%', size: '5rem',    color: '#f5f0e6', opacity: 0.75 },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <div className={BackgroundStyle.title}>Poker</div>
            <div className={BackgroundStyle.cardSlots}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <div key={`slot-${i}`} className={BackgroundStyle.cardSlot} />
                ))}
            </div>
            {chips.map(({ Icon, ...c }, i) => (
                <Icon key={`chip-${i}`}
                      style={{ left: c.left, bottom: 0, fontSize: c.size, color: c.color, opacity: c.opacity }} />
            ))}
            {suits.map(({ Icon, ...s }, i) => (
                <Icon key={`suit-${i}`}
                      className={BackgroundStyle[`fall${(i % 4) + 1}`]}
                      style={{ left: s.left, top: s.top, fontSize: s.size, color: s.color, opacity: s.opacity }} />
            ))}
        </div>
    </div>
);

export default Background;
