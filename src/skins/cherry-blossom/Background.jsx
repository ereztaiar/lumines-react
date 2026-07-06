import React from 'react';
import {background as BackgroundStyle} from "Skins/cherry-blossom";

/* Unlike most skins this background is NOT scaled 1.5x — the SVG scene is
   composed for the full 1200x700 viewBox (framing trees at both edges), so
   the whole composition must stay visible. Only the topmost ~25px of the
   viewBox is sliced off on 16:9 screens (bottom-anchored slice). */

const blossoms = [
    // Left tree cluster
    {x: 55,   y: 195, s: 1.1,  r: 15,  c: "#FF85B8", c2: "#E866A8"},
    {x: 95,   y: 140, s: 0.9,  r: -20, c: "#FFB6D5", c2: "#FF6FA8"},
    {x: 160,  y: 100, s: 1.0,  r: 30,  c: "#FF6FA8", c2: "#E866A8"},
    {x: 195,  y: 170, s: 0.7,  r: -35, c: "#E866A8", c2: "#FF85B8"},
    {x: 30,   y: 250, s: 0.75, r: 50,  c: "#FF85B8", c2: "#FFB6D5"},
    {x: 210,  y: 225, s: 0.6,  r: 10,  c: "#FFB6D5", c2: "#FF6FA8"},
    {x: 75,   y: 280, s: 0.55, r: -25, c: "#FF6FA8", c2: "#E866A8"},
    {x: 130,  y: 230, s: 0.65, r: 40,  c: "#E866A8", c2: "#FF85B8"},
    {x: 20,   y: 180, s: 0.5,  r: -15, c: "#FF85B8", c2: "#FFB6D5"},
    // Upper scatter
    {x: 350,  y: 70,  s: 0.8,  r: -10, c: "#FF6FA8", c2: "#FF85B8"},
    {x: 480,  y: 45,  s: 0.65, r: 25,  c: "#FFB6D5", c2: "#E866A8"},
    {x: 600,  y: 75,  s: 0.9,  r: -30, c: "#FF85B8", c2: "#FF6FA8"},
    {x: 720,  y: 50,  s: 0.7,  r: 15,  c: "#E866A8", c2: "#FFB6D5"},
    {x: 840,  y: 85,  s: 0.6,  r: -20, c: "#FF6FA8", c2: "#FF85B8"},
    // Middle scatter
    {x: 300,  y: 190, s: 0.55, r: 45,  c: "#FFB6D5", c2: "#E866A8"},
    {x: 460,  y: 165, s: 0.7,  r: -15, c: "#FF85B8", c2: "#FF6FA8"},
    {x: 560,  y: 145, s: 0.5,  r: 35,  c: "#FF6FA8", c2: "#E866A8"},
    {x: 680,  y: 180, s: 0.65, r: -25, c: "#E866A8", c2: "#FF85B8"},
    {x: 790,  y: 155, s: 0.75, r: 20,  c: "#FFB6D5", c2: "#FF6FA8"},
    // Right tree cluster
    {x: 1050, y: 115, s: 1.0,  r: -20, c: "#FF85B8", c2: "#E866A8"},
    {x: 1110, y: 75,  s: 0.85, r: 15,  c: "#FF6FA8", c2: "#FFB6D5"},
    {x: 1145, y: 145, s: 0.75, r: -40, c: "#FFB6D5", c2: "#FF85B8"},
    {x: 1165, y: 210, s: 0.6,  r: 25,  c: "#E866A8", c2: "#FF6FA8"},
    {x: 1095, y: 240, s: 0.55, r: -10, c: "#FF85B8", c2: "#FFB6D5"},
    {x: 975,  y: 195, s: 0.7,  r: 35,  c: "#FF6FA8", c2: "#E866A8"},
    {x: 940,  y: 145, s: 0.8,  r: -30, c: "#FFB6D5", c2: "#FF85B8"},
    // Low drifting
    {x: 250,  y: 350, s: 0.45, r: 60,  c: "#FFB6D5", c2: "#FF6FA8"},
    {x: 900,  y: 330, s: 0.4,  r: -45, c: "#FF85B8", c2: "#E866A8"},
];

const Blossom = ({x, y, s, r, c, c2}) => (
    <g transform={`translate(${x}, ${y}) scale(${s}) rotate(${r})`}>
        <ellipse cx="0" cy="-9" rx="5" ry="9" fill={c} opacity="0.92"/>
        <ellipse cx="0" cy="-9" rx="5" ry="9" fill={c} opacity="0.92" transform="rotate(72)"/>
        <ellipse cx="0" cy="-9" rx="5" ry="9" fill={c} opacity="0.92" transform="rotate(144)"/>
        <ellipse cx="0" cy="-9" rx="5" ry="9" fill={c} opacity="0.92" transform="rotate(216)"/>
        <ellipse cx="0" cy="-9" rx="5" ry="9" fill={c} opacity="0.92" transform="rotate(288)"/>
        <ellipse cx="0" cy="-5" rx="2.5" ry="4" fill={c2} opacity="0.5" transform="rotate(0)"/>
        <ellipse cx="0" cy="-5" rx="2.5" ry="4" fill={c2} opacity="0.5" transform="rotate(72)"/>
        <ellipse cx="0" cy="-5" rx="2.5" ry="4" fill={c2} opacity="0.5" transform="rotate(144)"/>
        <ellipse cx="0" cy="-5" rx="2.5" ry="4" fill={c2} opacity="0.5" transform="rotate(216)"/>
        <ellipse cx="0" cy="-5" rx="2.5" ry="4" fill={c2} opacity="0.5" transform="rotate(288)"/>
        <circle cx="0" cy="0" r="3.5" fill="#FFE8F4"/>
        <circle cx="0" cy="0" r="1.8" fill="#FF9FCC"/>
    </g>
);

// full-height falling petals: [left %, size px, duration s, delay s]
const petals = [
    ['4%',  12, 10,   0],   ['11%', 9,  13,   4.5], ['18%', 14, 9,    2],
    ['26%', 10, 12,   7],   ['34%', 13, 10.5, 1],   ['42%', 9,  13.5, 5.5],
    ['50%', 12, 9.5,  3],   ['58%', 15, 11,   8],   ['66%', 10, 12.5, 0.5],
    ['73%', 13, 10,   6],   ['80%', 9,  13,   2.5], ['87%', 14, 9.8,  9],
    ['93%', 11, 11.5, 4],   ['22%', 8,  14,   10],  ['62%', 8,  14.5, 11],
    ['96%', 10, 12,   6.5],
];

// rising paper lanterns: [left %, width px, height px, duration s, delay s]
const lanterns = [
    ['13%', 24, 32, 26, 0],
    ['56%', 18, 25, 30, 11],
    ['85%', 28, 37, 24, 19],
];

// fireflies near the garden floor: [left %, top %, size px, delay s]
const fireflies = [
    ['20%', '68%', 5, 0],   ['33%', '75%', 4, 2.2], ['47%', '70%', 5, 4.1],
    ['61%', '78%', 4, 1.3], ['74%', '66%', 5, 5.5], ['88%', '73%', 4, 3.4],
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <svg
            className={BackgroundStyle.cityscape}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 700"
            preserveAspectRatio="xMidYMax slice"
        >
            <defs>
                {/* Glow filters */}
                <filter id="cb-gp" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="4" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="cb-gv" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="4" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="cb-aurora" x="-30%" y="-60%" width="160%" height="220%">
                    <feGaussianBlur stdDeviation="25"/>
                </filter>
                <filter id="cb-blossom-glow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="5" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="cb-moon-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="12"/>
                </filter>

                {/* Gradients */}
                <linearGradient id="cb-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#04000e"/>
                    <stop offset="45%"  stopColor="#0d0025"/>
                    <stop offset="100%" stopColor="#180040"/>
                </linearGradient>
                <linearGradient id="cb-ground" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#0c0020"/>
                    <stop offset="100%" stopColor="#150030"/>
                </linearGradient>
                <linearGradient id="cb-path" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#0a001a"/>
                    <stop offset="100%" stopColor="#120028"/>
                </linearGradient>
                <radialGradient id="cb-moon-halo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#FF85B8" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#FF85B8" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="cb-rp" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%"   stopColor="#FF3D7F" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#FF3D7F" stopOpacity="0.02"/>
                </linearGradient>
                <linearGradient id="cb-rv" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%"   stopColor="#9B00FF" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#9B00FF" stopOpacity="0.01"/>
                </linearGradient>
            </defs>

            {/* === SKY === */}
            <rect x="0" y="0" width="1200" height="700" fill="url(#cb-sky)"/>

            {/* Pink aurora bands */}
            <ellipse cx="200"  cy="130" rx="420" ry="100" fill="#FF3D7F" filter="url(#cb-aurora)" opacity="0.12"/>
            <ellipse cx="1000" cy="110" rx="360" ry="85"  fill="#9B00FF" filter="url(#cb-aurora)" opacity="0.14"/>
            <ellipse cx="600"  cy="70"  rx="500" ry="70"  fill="#CC77FF" filter="url(#cb-aurora)" opacity="0.1"/>
            <ellipse cx="800"  cy="220" rx="300" ry="60"  fill="#FF6FA8" filter="url(#cb-aurora)" opacity="0.07"/>

            {/* Stars */}
            <g fill="white" opacity="0.6">
                {[[60,20],[130,10],[245,38],[320,14],[435,28],[525,10],[695,22],[795,12],[880,32],[970,16],[1060,24],[1145,11],[1185,40],[355,48],[748,42],[150,55],[490,60],[900,48]].map(([x,y],i)=>(
                    <circle key={i} cx={x} cy={y} r="1"/>
                ))}
            </g>

            {/* Moon */}
            <circle className={BackgroundStyle.moonPulse} cx="920" cy="90" r="55" fill="#FF85B8" filter="url(#cb-moon-glow)"/>
            <circle cx="920" cy="90" r="38" fill="#FFE8F4" opacity="0.9"/>
            <circle cx="920" cy="90" r="38" fill="url(#cb-moon-halo)"/>
            {/* Moon craters (subtle) */}
            <circle cx="910" cy="82" r="6" fill="#FFCCE0" opacity="0.4"/>
            <circle cx="928" cy="98" r="4" fill="#FFCCE0" opacity="0.3"/>

            {/* === LEFT CHERRY BLOSSOM TREE === */}
            <g stroke="#0f001f" fill="none" strokeLinecap="round">
                {/* Trunk */}
                <path d="M 118,450 Q 116,370 114,290 Q 112,230 116,165" strokeWidth="20"/>
                {/* Main branch left-low */}
                <path d="M 115,330 Q 78,290 42,240" strokeWidth="13"/>
                <path d="M 60,270 Q 32,245 14,210" strokeWidth="7"/>
                {/* Main branch right */}
                <path d="M 115,275 Q 155,235 205,195" strokeWidth="11"/>
                <path d="M 168,220 Q 202,192 238,158" strokeWidth="6"/>
                {/* Upper branch left */}
                <path d="M 115,222 Q 85,192 58,152" strokeWidth="9"/>
                <path d="M 72,175 Q 48,158 25,128" strokeWidth="5"/>
                {/* Upper branch right */}
                <path d="M 116,195 Q 142,168 175,138" strokeWidth="7"/>
                <path d="M 155,155 Q 178,135 205,112" strokeWidth="4"/>
                {/* Top */}
                <path d="M 114,178 Q 118,155 122,125" strokeWidth="6"/>
            </g>

            {/* === RIGHT CHERRY BLOSSOM TREE === */}
            <g stroke="#0f001f" fill="none" strokeLinecap="round">
                {/* Trunk */}
                <path d="M 1082,450 Q 1084,370 1086,290 Q 1088,230 1084,165" strokeWidth="20"/>
                {/* Main branch right-low */}
                <path d="M 1085,330 Q 1122,290 1158,240" strokeWidth="13"/>
                <path d="M 1140,270 Q 1168,245 1186,210" strokeWidth="7"/>
                {/* Main branch left */}
                <path d="M 1085,275 Q 1045,235 995,195" strokeWidth="11"/>
                <path d="M 1032,220 Q 998,192 962,158" strokeWidth="6"/>
                {/* Upper branch right */}
                <path d="M 1085,222 Q 1115,192 1142,152" strokeWidth="9"/>
                <path d="M 1128,175 Q 1152,158 1175,128" strokeWidth="5"/>
                {/* Upper branch left */}
                <path d="M 1084,195 Q 1058,168 1025,138" strokeWidth="7"/>
                <path d="M 1045,155 Q 1022,135 995,112" strokeWidth="4"/>
                {/* Top */}
                <path d="M 1086,178 Q 1082,155 1078,125" strokeWidth="6"/>
            </g>

            {/* === DISTANT PAGODA (clear strip between NEXT column and the grid) === */}
            <g>
                <rect x="216" y="430" width="38" height="20" fill="#1a0038"/>
                <polygon points="198,430 272,430 256,414 214,414" fill="#26004d"/>
                <line x1="198" y1="430" x2="272" y2="430" stroke="#FF6FA8" strokeWidth="1.6" opacity="0.75" filter="url(#cb-gp)"/>
                <rect x="223" y="398" width="24" height="16" fill="#1a0038"/>
                <polygon points="206,398 264,398 250,384 220,384" fill="#26004d"/>
                <line x1="206" y1="398" x2="264" y2="398" stroke="#FF6FA8" strokeWidth="1.4" opacity="0.7" filter="url(#cb-gp)"/>
                <rect x="228" y="370" width="14" height="14" fill="#1a0038"/>
                <polygon points="214,370 256,370 244,357 226,357" fill="#26004d"/>
                <line x1="214" y1="370" x2="256" y2="370" stroke="#FF6FA8" strokeWidth="1.2" opacity="0.7" filter="url(#cb-gp)"/>
                <line x1="235" y1="357" x2="235" y2="344" stroke="#26004d" strokeWidth="3"/>
                {/* warm window glow */}
                <rect className={BackgroundStyle.blinkSlow} x="231" y="434" width="8" height="7" fill="#ffce7a" opacity="0.9" filter="url(#cb-gp)"/>
                <rect x="229" y="402" width="5" height="6" fill="#ffce7a" opacity="0.6"/>
                <rect x="237" y="402" width="5" height="6" fill="#ffce7a" opacity="0.6"/>
                <rect x="232" y="373" width="6" height="6" fill="#ffce7a" opacity="0.55"/>
            </g>

            {/* === TORII GATE (clear strip between the grid and the score panel) === */}
            <g>
                <rect x="827" y="392" width="7" height="58" fill="#2a0050" stroke="#FF3D7F" strokeWidth="0.8" opacity="0.9"/>
                <rect x="877" y="392" width="7" height="58" fill="#2a0050" stroke="#FF3D7F" strokeWidth="0.8" opacity="0.9"/>
                <rect x="821" y="402" width="69" height="6" fill="#2a0050" stroke="#FF3D7F" strokeWidth="0.8" opacity="0.9"/>
                <path d="M 813,388 Q 855,378 898,388 L 896,396 Q 855,387 815,396 Z" fill="#2a0050" stroke="#FF3D7F" strokeWidth="0.8" opacity="0.9"/>
                <path d="M 813,388 Q 855,378 898,388" stroke="#FF3D7F" strokeWidth="2" fill="none" opacity="0.85" filter="url(#cb-gp)"/>
            </g>

            {/* === CHERRY BLOSSOMS (28) — canopy sways in the wind === */}
            <g className={BackgroundStyle.swayCanopy} filter="url(#cb-blossom-glow)">
                {blossoms.map((b, i) => (
                    <Blossom key={i} {...b}/>
                ))}
            </g>

            {/* === GROUND PLANE === */}
            <polygon points="0,700 280,700 510,450 0,450"       fill="url(#cb-ground)"/>
            <polygon points="1200,700 920,700 690,450 1200,450" fill="url(#cb-ground)"/>
            <polygon points="280,700 920,700 690,450 510,450"   fill="url(#cb-path)"/>

            {/* Horizon line */}
            <line x1="0" y1="450" x2="1200" y2="450" stroke="#2a0055" strokeWidth="1.5"/>

            {/* Ground path edge lines */}
            <line x1="0"    y1="500" x2="480" y2="450" stroke="#1f0040" strokeWidth="1.2"/>
            <line x1="1200" y1="500" x2="720" y2="450" stroke="#1f0040" strokeWidth="1.2"/>
            <line x1="280"  y1="700" x2="510" y2="450" stroke="#220045" strokeWidth="1.5"/>
            <line x1="920"  y1="700" x2="690" y2="450" stroke="#220045" strokeWidth="1.5"/>

            {/* Stepping stone path */}
            {[[580,480],[590,510],[575,540],[592,575],[580,610],[590,645],[578,680]].map(([cx,cy],i)=>(
                <ellipse key={i} cx={cx} cy={cy} rx="22" ry="10" fill="#180035" opacity="0.8"/>
            ))}
            {[[620,480],[610,510],[625,540],[608,575],[620,610],[610,645],[622,680]].map(([cx,cy],i)=>(
                <ellipse key={i} cx={cx} cy={cy} rx="22" ry="10" fill="#180035" opacity="0.8"/>
            ))}

            {/* Pink blossom reflections on path */}
            <polygon points="490,700 550,700 560,450 530,450" fill="url(#cb-rp)" opacity="0.3"/>
            <polygon points="650,700 710,700 670,450 640,450" fill="url(#cb-rv)" opacity="0.25"/>

            {/* Petals on ground */}
            <ellipse cx="420" cy="470" rx="6" ry="3" fill="#FF85B8" opacity="0.5" transform="rotate(30, 420, 470)"/>
            <ellipse cx="540" cy="490" rx="5" ry="2.5" fill="#FFB6D5" opacity="0.45" transform="rotate(-20, 540, 490)"/>
            <ellipse cx="700" cy="475" rx="6" ry="3" fill="#E866A8" opacity="0.4" transform="rotate(15, 700, 475)"/>
            <ellipse cx="830" cy="468" rx="5" ry="2.5" fill="#FF85B8" opacity="0.45" transform="rotate(-35, 830, 468)"/>
            <ellipse cx="320" cy="480" rx="6" ry="3" fill="#FFB6D5" opacity="0.4" transform="rotate(45, 320, 480)"/>
            <ellipse cx="920" cy="485" rx="5" ry="2.5" fill="#FF6FA8" opacity="0.4" transform="rotate(-10, 920, 485)"/>

            {/* Antenna blink lights on trees */}
            <circle className={BackgroundStyle.blinkSlow} cx="122" cy="123" r="4" fill="#FF3D7F" filter="url(#cb-gp)"/>
            <circle className={BackgroundStyle.blinkFast} cx="1078" cy="123" r="4" fill="#9B00FF" filter="url(#cb-gv)"/>

            {/* Ground line glow */}
            <line x1="280" y1="700" x2="920" y2="700" stroke="#FF3D7F" strokeWidth="1" opacity="0.12"/>
        </svg>

        {/* HTML particle layer — full-height petals, lanterns, fireflies */}
        <div className={BackgroundStyle.scene}>
            {petals.map(([left, size, dur, delay], i) => (
                <div key={`petal-${i}`}
                     className={BackgroundStyle.petalFall}
                     style={{ left, width: `${size}px`, height: `${size * 0.7}px`,
                              animationDuration: `${dur}s`, animationDelay: `${delay}s` }}/>
            ))}
            {lanterns.map(([left, w, h, dur, delay], i) => (
                <div key={`lantern-${i}`}
                     className={BackgroundStyle.lanternRise}
                     style={{ left, width: `${w}px`, height: `${h}px`,
                              animationDuration: `${dur}s`, animationDelay: `${delay}s` }}/>
            ))}
            {fireflies.map(([left, top, size, delay], i) => (
                <div key={`firefly-${i}`}
                     className={BackgroundStyle.firefly}
                     style={{ left, top, width: `${size}px`, height: `${size}px`,
                              animationDelay: `${delay}s` }}/>
            ))}
        </div>
    </div>
);

export default Background;
