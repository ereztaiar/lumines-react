import React from 'react';
import {background as BackgroundStyle} from "Skins/midnight-neon";

const trackTies = [
    [465, 695, 738, 695],
    [470, 678, 735, 678],
    [476, 659, 731, 659],
    [483, 638, 726, 638],
    [491, 616, 720, 616],
    [500, 592, 714, 592],
    [511, 566, 707, 566],
    [523, 538, 699, 538],
    [537, 508, 691, 508],
    [553, 476, 682, 476],
];

const rainXCoords = [90,185,275,365,455,545,635,725,815,905,995,1085,1160,140,320,490,660,830,1010];

const Background = () => {
    return (
        <div className={BackgroundStyle.background}>
            <svg
                className={BackgroundStyle.cityscape}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 700"
                preserveAspectRatio="xMidYMax slice"
            >
                <defs>
                    {/* Glow filters */}
                    <filter id="mn-gc" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="3.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="mn-gm" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="3.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="mn-gg" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="3" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="mn-gy" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="3" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="mn-go" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="3.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="mn-gwc" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="18" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="mn-gwm" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="12" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="mn-rain">
                        <feGaussianBlur stdDeviation="0.4"/>
                    </filter>
                    <filter id="mn-aurora" x="-20%" y="-50%" width="140%" height="200%">
                        <feGaussianBlur stdDeviation="22"/>
                    </filter>

                    {/* Gradients */}
                    <linearGradient id="mn-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#020010"/>
                        <stop offset="55%"  stopColor="#060018"/>
                        <stop offset="100%" stopColor="#0c0028"/>
                    </linearGradient>
                    <linearGradient id="mn-road" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#04000f"/>
                        <stop offset="100%" stopColor="#060015"/>
                    </linearGradient>
                    <linearGradient id="mn-sidewalk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#06001a"/>
                        <stop offset="100%" stopColor="#09001e"/>
                    </linearGradient>
                    <linearGradient id="mn-rc" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#00e5ff" stopOpacity="0.55"/>
                        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.02"/>
                    </linearGradient>
                    <linearGradient id="mn-rm" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#ff00e5" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="#ff00e5" stopOpacity="0.02"/>
                    </linearGradient>
                    <linearGradient id="mn-rg" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#39ff14" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#39ff14" stopOpacity="0.01"/>
                    </linearGradient>
                    <linearGradient id="mn-ry" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#ffe066" stopOpacity="0.45"/>
                        <stop offset="100%" stopColor="#ffe066" stopOpacity="0.01"/>
                    </linearGradient>
                    <radialGradient id="mn-haze" cx="50%" cy="0%" r="70%">
                        <stop offset="0%"   stopColor="#200050" stopOpacity="0.7"/>
                        <stop offset="100%" stopColor="#06001a" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="mn-tram-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="#00e5ff" stopOpacity="0.35"/>
                        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0"/>
                    </radialGradient>
                </defs>

                {/* === SKY === */}
                <rect x="0" y="0" width="1200" height="450" fill="url(#mn-sky)"/>

                {/* Aurora bands — purple left, green right, blue center */}
                <ellipse cx="180"  cy="120" rx="380" ry="90" fill="#aa00ff" filter="url(#mn-aurora)" opacity="0.18"/>
                <ellipse cx="1020" cy="100" rx="320" ry="75" fill="#39ff14" filter="url(#mn-aurora)" opacity="0.13"/>
                <ellipse cx="600"  cy="60"  rx="420" ry="65" fill="#0044ff" filter="url(#mn-aurora)" opacity="0.12"/>
                <ellipse cx="800"  cy="200" rx="260" ry="55" fill="#ff5500" filter="url(#mn-aurora)" opacity="0.08"/>

                {/* Stars */}
                <g fill="white" opacity="0.5">
                    {[[55,18],[120,8],[230,35],[310,12],[420,25],[510,8],[680,20],[780,10],[870,30],[960,14],[1050,22],[1140,9],[1180,35],[340,45],[740,38]].map(([x,y],i)=>(
                        <circle key={i} cx={x} cy={y} r="1"/>
                    ))}
                </g>

                {/* Horizon haze */}
                <rect x="0" y="340" width="1200" height="110" fill="url(#mn-haze)"/>

                {/* === LEFT BUILDINGS === */}
                <g fill="#040010">
                    <rect x="0"   y="25"  width="158" height="425"/>
                    <rect x="0"   y="22"  width="163" height="7"/>
                    <rect x="125" y="85"  width="145" height="365"/>
                    <rect x="122" y="82"  width="150" height="6"/>
                    <rect x="240" y="155" width="125" height="295"/>
                    <rect x="237" y="152" width="130" height="5"/>
                    <rect x="338" y="235" width="105" height="215"/>
                    <rect x="335" y="232" width="110" height="5"/>
                </g>

                {/* Left — cyan windows */}
                <g fill="#00e5ff" filter="url(#mn-gc)">
                    <rect x="12"  y="42"  width="8" height="5"/>
                    <rect x="26"  y="42"  width="8" height="5"/>
                    <rect x="40"  y="42"  width="8" height="5"/>
                    <rect x="55"  y="42"  width="8" height="5"/>
                    <rect x="12"  y="55"  width="8" height="5"/>
                    <rect x="40"  y="55"  width="8" height="5"/>
                    <rect x="55"  y="55"  width="8" height="5"/>
                    <rect x="12"  y="68"  width="8" height="5"/>
                    <rect x="26"  y="68"  width="8" height="5"/>
                    <rect x="55"  y="68"  width="8" height="5"/>
                    <rect x="80"  y="42"  width="8" height="5"/>
                    <rect x="95"  y="55"  width="8" height="5"/>
                    <rect x="110" y="42"  width="8" height="5"/>
                    <rect x="80"  y="120" width="8" height="5"/>
                    <rect x="12"  y="135" width="8" height="5"/>
                    <rect x="40"  y="135" width="8" height="5"/>
                    <rect x="135" y="100" width="8" height="5"/>
                    <rect x="150" y="100" width="8" height="5"/>
                    <rect x="165" y="100" width="8" height="5"/>
                    <rect x="135" y="114" width="8" height="5"/>
                    <rect x="165" y="114" width="8" height="5"/>
                    <rect x="250" y="170" width="7" height="5"/>
                    <rect x="263" y="170" width="7" height="5"/>
                    <rect x="276" y="170" width="7" height="5"/>
                    <rect x="250" y="184" width="7" height="5"/>
                    <rect x="276" y="184" width="7" height="5"/>
                    <rect x="348" y="250" width="7" height="5"/>
                    <rect x="374" y="250" width="7" height="5"/>
                    <rect x="348" y="264" width="7" height="5"/>
                </g>

                {/* Left — magenta windows */}
                <g fill="#ff00e5" filter="url(#mn-gm)">
                    <rect x="26"  y="55"  width="8" height="5"/>
                    <rect x="12"  y="210" width="8" height="5"/>
                    <rect x="40"  y="225" width="8" height="5"/>
                    <rect x="12"  y="240" width="8" height="5"/>
                    <rect x="150" y="114" width="8" height="5"/>
                    <rect x="135" y="170" width="8" height="5"/>
                    <rect x="289" y="184" width="7" height="5"/>
                    <rect x="289" y="210" width="7" height="5"/>
                    <rect x="361" y="264" width="7" height="5"/>
                </g>

                {/* Left — green windows */}
                <g fill="#39ff14" filter="url(#mn-gg)">
                    <rect x="68"  y="42"  width="8" height="5"/>
                    <rect x="68"  y="68"  width="8" height="5"/>
                    <rect x="12"  y="92"  width="8" height="5"/>
                    <rect x="40"  y="92"  width="8" height="5"/>
                    <rect x="150" y="155" width="8" height="5"/>
                    <rect x="165" y="140" width="8" height="5"/>
                    <rect x="263" y="198" width="7" height="5"/>
                    <rect x="361" y="250" width="7" height="5"/>
                </g>

                {/* Left — yellow windows */}
                <g fill="#ffe066" filter="url(#mn-gy)">
                    <rect x="95"  y="42"  width="8" height="5"/>
                    <rect x="95"  y="68"  width="8" height="5"/>
                    <rect x="55"  y="120" width="8" height="5"/>
                    <rect x="165" y="170" width="8" height="5"/>
                    <rect x="250" y="210" width="7" height="5"/>
                    <rect x="374" y="278" width="7" height="5"/>
                </g>

                {/* Left — orange windows (sparse, vivid) */}
                <g fill="#ff5500" filter="url(#mn-go)">
                    <rect x="26"  y="92"  width="8" height="5"/>
                    <rect x="80"  y="160" width="8" height="5"/>
                    <rect x="276" y="210" width="7" height="5"/>
                </g>

                {/* Left neon signs */}
                <rect x="138" y="205" width="60" height="4" rx="1" fill="#00e5ff"  filter="url(#mn-gc)" opacity="0.9"/>
                <rect x="138" y="248" width="44" height="3" rx="1" fill="#ff00e5"  filter="url(#mn-gm)" opacity="0.8"/>
                <rect x="248" y="270" width="50" height="4" rx="1" fill="#39ff14"  filter="url(#mn-gg)" opacity="0.85"/>
                <rect x="342" y="310" width="38" height="3" rx="1" fill="#ffe066"  filter="url(#mn-gy)" opacity="0.8"/>
                <rect x="8"   y="320" width="55" height="4" rx="1" fill="#ff5500"  filter="url(#mn-go)" opacity="0.85"/>

                {/* === RIGHT BUILDINGS === */}
                <g fill="#040010">
                    <rect x="757"  y="235" width="105" height="215"/>
                    <rect x="755"  y="232" width="110" height="5"/>
                    <rect x="835"  y="155" width="125" height="295"/>
                    <rect x="833"  y="152" width="130" height="5"/>
                    <rect x="930"  y="85"  width="145" height="365"/>
                    <rect x="928"  y="82"  width="150" height="6"/>
                    <rect x="1042" y="25"  width="158" height="425"/>
                    <rect x="1037" y="22"  width="163" height="7"/>
                </g>

                {/* Right — cyan windows */}
                <g fill="#00e5ff" filter="url(#mn-gc)">
                    <rect x="767"  y="250" width="7" height="5"/>
                    <rect x="793"  y="250" width="7" height="5"/>
                    <rect x="767"  y="264" width="7" height="5"/>
                    <rect x="845"  y="170" width="7" height="5"/>
                    <rect x="858"  y="170" width="7" height="5"/>
                    <rect x="871"  y="170" width="7" height="5"/>
                    <rect x="845"  y="184" width="7" height="5"/>
                    <rect x="871"  y="184" width="7" height="5"/>
                    <rect x="940"  y="100" width="8" height="5"/>
                    <rect x="955"  y="100" width="8" height="5"/>
                    <rect x="970"  y="100" width="8" height="5"/>
                    <rect x="940"  y="114" width="8" height="5"/>
                    <rect x="970"  y="114" width="8" height="5"/>
                    <rect x="940"  y="170" width="8" height="5"/>
                    <rect x="1052" y="42"  width="8" height="5"/>
                    <rect x="1067" y="42"  width="8" height="5"/>
                    <rect x="1082" y="42"  width="8" height="5"/>
                    <rect x="1097" y="42"  width="8" height="5"/>
                    <rect x="1052" y="55"  width="8" height="5"/>
                    <rect x="1082" y="55"  width="8" height="5"/>
                    <rect x="1097" y="55"  width="8" height="5"/>
                    <rect x="1052" y="68"  width="8" height="5"/>
                    <rect x="1067" y="68"  width="8" height="5"/>
                    <rect x="1052" y="135" width="8" height="5"/>
                    <rect x="1082" y="135" width="8" height="5"/>
                </g>

                {/* Right — magenta windows */}
                <g fill="#ff00e5" filter="url(#mn-gm)">
                    <rect x="780"  y="264" width="7" height="5"/>
                    <rect x="884"  y="184" width="7" height="5"/>
                    <rect x="884"  y="210" width="7" height="5"/>
                    <rect x="955"  y="114" width="8" height="5"/>
                    <rect x="970"  y="170" width="8" height="5"/>
                    <rect x="1067" y="55"  width="8" height="5"/>
                    <rect x="1082" y="68"  width="8" height="5"/>
                    <rect x="1125" y="68"  width="8" height="5"/>
                    <rect x="1155" y="68"  width="8" height="5"/>
                    <rect x="1155" y="135" width="8" height="5"/>
                </g>

                {/* Right — green windows */}
                <g fill="#39ff14" filter="url(#mn-gg)">
                    <rect x="780"  y="250" width="7" height="5"/>
                    <rect x="793"  y="278" width="7" height="5"/>
                    <rect x="858"  y="184" width="7" height="5"/>
                    <rect x="858"  y="210" width="7" height="5"/>
                    <rect x="955"  y="155" width="8" height="5"/>
                    <rect x="1097" y="68"  width="8" height="5"/>
                    <rect x="1125" y="42"  width="8" height="5"/>
                    <rect x="1140" y="55"  width="8" height="5"/>
                </g>

                {/* Right — yellow windows */}
                <g fill="#ffe066" filter="url(#mn-gy)">
                    <rect x="871"  y="210" width="7" height="5"/>
                    <rect x="871"  y="225" width="7" height="5"/>
                    <rect x="940"  y="130" width="8" height="5"/>
                    <rect x="1067" y="120" width="8" height="5"/>
                    <rect x="1140" y="148" width="8" height="5"/>
                    <rect x="1155" y="42"  width="8" height="5"/>
                </g>

                {/* Right — orange windows */}
                <g fill="#ff5500" filter="url(#mn-go)">
                    <rect x="767"  y="278" width="7" height="5"/>
                    <rect x="970"  y="130" width="8" height="5"/>
                    <rect x="1125" y="55"  width="8" height="5"/>
                </g>

                {/* Right neon signs */}
                <rect x="1002" y="205" width="60" height="4" rx="1" fill="#ff00e5"  filter="url(#mn-gm)" opacity="0.9"/>
                <rect x="1018" y="248" width="44" height="3" rx="1" fill="#00e5ff"  filter="url(#mn-gc)" opacity="0.8"/>
                <rect x="900"  y="270" width="50" height="4" rx="1" fill="#ffe066"  filter="url(#mn-gy)" opacity="0.85"/>
                <rect x="818"  y="310" width="38" height="3" rx="1" fill="#39ff14"  filter="url(#mn-gg)" opacity="0.8"/>
                <rect x="1137" y="320" width="55" height="4" rx="1" fill="#ff5500"  filter="url(#mn-go)" opacity="0.85"/>

                {/* === ANTENNA LIGHTS === */}
                <circle className={BackgroundStyle.blinkSlow}  cx="79"   cy="22" r="3" fill="#ff00e5" filter="url(#mn-gm)"/>
                <circle className={BackgroundStyle.blinkFast}  cx="237"  cy="22" r="3" fill="#ff00e5" filter="url(#mn-gm)"/>
                <circle className={BackgroundStyle.blinkGreen} cx="500"  cy="22" r="2.5" fill="#39ff14" filter="url(#mn-gg)"/>
                <circle className={BackgroundStyle.blinkSlow}  cx="1121" cy="22" r="3" fill="#ff00e5" filter="url(#mn-gm)"/>
                <circle className={BackgroundStyle.blinkFast}  cx="963"  cy="22" r="3" fill="#ff00e5" filter="url(#mn-gm)"/>
                <circle className={BackgroundStyle.blinkGreen} cx="700"  cy="22" r="2.5" fill="#39ff14" filter="url(#mn-gg)"/>

                {/* === GROUND PLANE === */}
                <polygon points="0,700 300,700 530,450 0,450"       fill="url(#mn-sidewalk)"/>
                <polygon points="1200,700 900,700 670,450 1200,450" fill="url(#mn-sidewalk)"/>
                <polygon points="300,700 900,700 670,450 530,450"   fill="url(#mn-road)"/>

                {/* Horizon line */}
                <line x1="0" y1="450" x2="1200" y2="450" stroke="#14003a" strokeWidth="1.5"/>

                {/* Sidewalk edge lines */}
                <line x1="0"    y1="510" x2="490" y2="450" stroke="#1a0045" strokeWidth="1.5"/>
                <line x1="1200" y1="510" x2="710" y2="450" stroke="#1a0045" strokeWidth="1.5"/>
                <line x1="0"    y1="580" x2="480" y2="450" stroke="#12002e" strokeWidth="1"/>
                <line x1="1200" y1="580" x2="720" y2="450" stroke="#12002e" strokeWidth="1"/>
                {/* Road edge lines */}
                <line x1="300" y1="700" x2="530" y2="450" stroke="#200050" strokeWidth="1.5"/>
                <line x1="900" y1="700" x2="670" y2="450" stroke="#200050" strokeWidth="1.5"/>

                {/* === RAILWAY TRACKS === */}
                <line x1="460" y1="700" x2="586" y2="450" stroke="#0e002a" strokeWidth="6"/>
                <line x1="740" y1="700" x2="614" y2="450" stroke="#0e002a" strokeWidth="6"/>
                <line x1="460" y1="700" x2="586" y2="450" stroke="#00e5ff" strokeWidth="1.8" opacity="0.45"/>
                <line x1="740" y1="700" x2="614" y2="450" stroke="#00e5ff" strokeWidth="1.8" opacity="0.45"/>
                <g stroke="#0a0022" strokeWidth="3" strokeLinecap="round">
                    {trackTies.map(([x1, y1, x2, y2], i) => (
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>
                    ))}
                </g>

                {/* === WET GROUND REFLECTIONS === */}
                {/* Cyan — left rail streak */}
                <polygon points="502,700 545,700 591,450 572,450" fill="url(#mn-rc)" opacity="0.55"/>
                {/* Magenta — right rail streak */}
                <polygon points="655,700 698,700 628,450 609,450" fill="url(#mn-rm)" opacity="0.5"/>
                {/* Green — left sidewalk sign reflection */}
                <polygon points="200,700 260,700 520,450 495,450" fill="url(#mn-rg)" opacity="0.2"/>
                {/* Yellow — right sidewalk sign reflection */}
                <polygon points="940,700 1000,700 705,450 680,450" fill="url(#mn-ry)" opacity="0.2"/>

                {/* Streetlight puddle reflections */}
                <ellipse cx="390" cy="640" rx="40" ry="12" fill="#00e5ff" opacity="0.07"/>
                <ellipse cx="810" cy="640" rx="40" ry="12" fill="#00e5ff" opacity="0.07"/>
                {/* Neon sign puddles */}
                <ellipse cx="200" cy="660" rx="30" ry="8" fill="#39ff14" opacity="0.06"/>
                <ellipse cx="1000" cy="660" rx="30" ry="8" fill="#ffe066" opacity="0.06"/>

                {/* Tram light wash */}
                <polygon points="430,700 770,700 650,450 550,450" fill="url(#mn-tram-glow)" opacity="0.5"/>

                {/* === TRAFFIC LIGHT (distance, left of tracks) === */}
                <rect x="516" y="410" width="6" height="20" fill="#080018"/>
                <rect x="512" y="406" width="14" height="22" rx="2" fill="#0a0020"/>
                {/* Red light (top) */}
                <circle cx="519" cy="411" r="4" fill="#ff3300" filter="url(#mn-go)" opacity="0.9"/>
                {/* Green light (bottom) */}
                <circle className={BackgroundStyle.blinkGreen} cx="519" cy="423" r="4" fill="#39ff14" filter="url(#mn-gg)" opacity="0.9"/>
                {/* Traffic light reflection on road */}
                <polygon points="513,428 525,428 530,700 508,700" fill="#39ff14" opacity="0.04"/>

                {/* === DISTANT TRAM === */}
                {/* Atmospheric halo */}
                <ellipse cx="600" cy="448" rx="120" ry="30" fill="#00e5ff" filter="url(#mn-gwc)" opacity="0.22"/>
                {/* Tram body */}
                <rect x="563" y="428" width="74" height="26" rx="3" fill="#090020"/>
                {/* Tram windows (interior glow) */}
                <rect x="568" y="432" width="62" height="14" rx="2" fill="#00e5ff" opacity="0.18"/>
                {/* Destination sign (amber) */}
                <rect x="578" y="433" width="30" height="6" rx="1" fill="#ffe066" opacity="0.55"/>
                {/* Brake lights (magenta) */}
                <rect x="565" y="448" width="8" height="4" rx="1" fill="#ff00e5" filter="url(#mn-gwm)" opacity="1"/>
                <rect x="578" y="448" width="8" height="4" rx="1" fill="#ff00e5" filter="url(#mn-gwm)" opacity="1"/>
                <rect x="614" y="448" width="8" height="4" rx="1" fill="#ff00e5" filter="url(#mn-gwm)" opacity="1"/>
                <rect x="627" y="448" width="8" height="4" rx="1" fill="#ff00e5" filter="url(#mn-gwm)" opacity="1"/>
                {/* Headlight (cyan) */}
                <ellipse cx="600" cy="450" rx="22" ry="7" fill="#00e5ff" filter="url(#mn-gc)" opacity="0.7"/>
                {/* Brake light road reflections */}
                <polygon points="558,454 592,454 570,700 520,700" fill="#ff00e5" opacity="0.04"/>
                <polygon points="608,454 642,454 680,700 630,700" fill="#ff00e5" opacity="0.04"/>

                {/* === STREETLIGHTS === */}
                {/* Left */}
                <rect x="384" y="330" width="6" height="175" fill="#0b0022"/>
                <rect x="378" y="325" width="28" height="8" rx="2" fill="#0b0022"/>
                <ellipse cx="392" cy="324" rx="16" ry="6" fill="#00e5ff" filter="url(#mn-gc)" opacity="0.85"/>
                <polygon points="376,332 408,332 455,600 325,600" fill="#00e5ff" opacity="0.022"/>
                {/* Right */}
                <rect x="810" y="330" width="6" height="175" fill="#0b0022"/>
                <rect x="794" y="325" width="28" height="8" rx="2" fill="#0b0022"/>
                <ellipse cx="808" cy="324" rx="16" ry="6" fill="#00e5ff" filter="url(#mn-gc)" opacity="0.85"/>
                <polygon points="792,332 824,332 875,600 745,600" fill="#00e5ff" opacity="0.022"/>

                {/* === RAIN STREAKS === */}
                <g className={BackgroundStyle.rainAnim} stroke="#00e5ff" strokeWidth="0.7" filter="url(#mn-rain)">
                    {rainXCoords.map((x, i) => (
                        <line key={i} x1={x} y1={0} x2={x - 18} y2={210 + (i % 3) * 30}/>
                    ))}
                </g>

                {/* Ground line glow */}
                <line x1="300" y1="700" x2="900" y2="700" stroke="#00e5ff" strokeWidth="1" opacity="0.15"/>
            </svg>
        </div>
    );
};

export default Background;
