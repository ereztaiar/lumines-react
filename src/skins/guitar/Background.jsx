import React from 'react';
import {background as BackgroundStyle} from "Skins/guitar";
import {
    GiGuitar,
    GiMusicalNotes,
    GiMicrophone,
    GiSpeaker,
    GiSoundWaves,
    GiDrumKit,
} from 'react-icons/gi';
import { FaCircle } from 'react-icons/fa';

/* The .background layer is scaled 1.5x around its center, so positions land
   further from center than they read (s = 50 + 1.5*(p - 50)) — the usable
   range is roughly 17%–83% on each axis. Keep the scene inside that band. */

/* Coloured stage spotlights strung along the top of the rig */
const spotlights = [
    { left: '20%', color: '#ff2e4d', fast: false },
    { left: '32%', color: '#e6e8ee', fast: true  },
    { left: '44%', color: '#ff7a3c', fast: false },
    { left: '56%', color: '#b06bff', fast: true  },
    { left: '68%', color: '#ff2e4d', fast: false },
    { left: '80%', color: '#e6e8ee', fast: true  },
];

/* Musical notes drifting up from the stage */
const notes = [
    { left: '24%', bottom: '30%', size: '1.6rem', color: '#ff2e4d', rise: 'rise1' },
    { left: '38%', bottom: '26%', size: '1.1rem', color: '#ff2e4d', rise: 'rise2' },
    { left: '52%', bottom: '32%', size: '1.9rem', color: '#ff2e4d', rise: 'rise3' },
    { left: '63%', bottom: '27%', size: '1.3rem', color: '#ff2e4d', rise: 'rise1' },
    { left: '46%', bottom: '24%', size: '1rem',   color: '#ff2e4d', rise: 'rise2' },
    { left: '72%', bottom: '30%', size: '1.5rem', color: '#ff2e4d', rise: 'rise3' },
    { left: '30%', bottom: '28%', size: '1.2rem', color: '#ff2e4d', rise: 'rise1' },
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            {/* spotlight rig */}
            {spotlights.map((s, i) => (
                <FaCircle key={`light-${i}`}
                          className={`${BackgroundStyle.glow} ${s.fast ? BackgroundStyle.blinkFast : BackgroundStyle.blinkSlow}`}
                          style={{ left: s.left, top: '19%', fontSize: '1.4rem', color: s.color }} />
            ))}

            {/* focal hero guitar glowing centre-stage */}
            <GiGuitar
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ left: '50%', top: '26%', transform: 'translateX(-50%)',
                         fontSize: '22rem', color: '#ff2e4d', opacity: 0.6 }}
            />

            {/* sound waves rippling off either side */}
            <GiSoundWaves
                className={BackgroundStyle.swell}
                style={{ left: '21%', top: '40%', fontSize: '4rem', color: '#ff2e4d', opacity: 0.55 }}
            />
            <GiSoundWaves
                className={BackgroundStyle.swell}
                style={{ right: '21%', top: '40%', fontSize: '4rem', color: '#ff2e4d', opacity: 0.55,
                         transform: 'scaleX(-1)' }}
            />

            {/* amp / speaker stacks framing the stage floor */}
            <GiSpeaker
                style={{ left: '18%', bottom: '18%', fontSize: '7rem', color: '#ff2e4d', opacity: 0.95 }}
            />
            <GiSpeaker
                style={{ left: '26%', bottom: '18%', fontSize: '5rem', color: '#ff2e4d', opacity: 0.8 }}
            />
            <GiSpeaker
                style={{ right: '18%', bottom: '18%', fontSize: '7rem', color: '#ff2e4d', opacity: 0.95 }}
            />
            <GiSpeaker
                style={{ right: '26%', bottom: '18%', fontSize: '5rem', color: '#ff2e4d', opacity: 0.8 }}
            />

            {/* drum kit centre-back on the riser */}
            <GiDrumKit
                style={{ left: '50%', bottom: '18%', transform: 'translateX(-50%)',
                         fontSize: '8rem', color: '#ff2e4d', opacity: 0.9 }}
            />

            {/* mic stands up front */}
            <GiMicrophone
                className={BackgroundStyle.floatSlow}
                style={{ left: '36%', bottom: '20%', fontSize: '3.2rem', color: '#ff2e4d', opacity: 0.85 }}
            />
            <GiMicrophone
                className={BackgroundStyle.driftSlow}
                style={{ right: '36%', bottom: '20%', fontSize: '2.6rem', color: '#ff2e4d', opacity: 0.75 }}
            />

            {/* notes rising through the lights */}
            {notes.map((n, i) => (
                <GiMusicalNotes key={`note-${i}`}
                                className={`${BackgroundStyle.glow} ${BackgroundStyle[n.rise]}`}
                                style={{ left: n.left, bottom: n.bottom, fontSize: n.size, color: n.color }} />
            ))}
        </div>
    </div>
);

export default Background;
