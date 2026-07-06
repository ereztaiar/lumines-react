import React from 'react';
import { background as BackgroundStyle } from 'Skins/notes';
import { MdMusicNote } from 'react-icons/md';

// Note head center sits at ~85% of MdMusicNote icon height.
// HEAD_OFFSET aligns the note head to its target staff line.
const HEAD_OFFSET = 13; // px (for 0.95rem icon ≈ 15px)

// Staff systems: topPct is position within the background element.
// Due to scale(1.5) the visible range maps to roughly 17–83% of background.
// topPcts 33%, 50%, 67% → visible at screen ~25%, 50%, 75%.
const staveData = [
  {
    topPct: 33,
    bars: ['30%', '58%', '85%'],
    // ascending then descending line across the staff (offset 0=top line, 32=bottom)
    notes: [
      { x: '10%', offset: 16 }, { x: '18%', offset: 12 }, { x: '25%', offset: 8 },
      { x: '32%', offset: 4  }, { x: '40%', offset: 0  }, { x: '47%', offset: 4 },
      { x: '55%', offset: 8  }, { x: '62%', offset: 12 }, { x: '69%', offset: 16 },
      { x: '76%', offset: 20 }, { x: '83%', offset: 24 }, { x: '90%', offset: 20 },
    ],
  },
  {
    topPct: 50,
    bars: ['27%', '54%', '80%'],
    // wave pattern
    notes: [
      { x: '8%',  offset: 24 }, { x: '15%', offset: 16 }, { x: '22%', offset: 8  },
      { x: '29%', offset: 16 }, { x: '36%', offset: 24 }, { x: '43%', offset: 32 },
      { x: '50%', offset: 24 }, { x: '57%', offset: 16 }, { x: '64%', offset: 8  },
      { x: '71%', offset: 4  }, { x: '78%', offset: 8  }, { x: '85%', offset: 16 },
      { x: '92%', offset: 24 },
    ],
  },
  {
    topPct: 67,
    bars: ['33%', '61%', '88%'],
    // bass line — mostly lower notes
    notes: [
      { x: '10%', offset: 32 }, { x: '17%', offset: 28 }, { x: '24%', offset: 24 },
      { x: '31%', offset: 28 }, { x: '38%', offset: 32 }, { x: '45%', offset: 28 },
      { x: '52%', offset: 24 }, { x: '59%', offset: 20 }, { x: '66%', offset: 24 },
      { x: '73%', offset: 28 }, { x: '80%', offset: 32 }, { x: '87%', offset: 28 },
      { x: '93%', offset: 24 },
    ],
  },
];

// Alternate gold / blue for A / B block colors
const noteColor = (i) => (i % 2 === 0 ? '#F4C430' : '#38bdf8');

// A few notes get a gentle glow animation
const glowNoteIndices = new Set([2, 5, 8, 11]);

/* the playhead sweeps 6%→94% in PLAYHEAD_SECONDS; each note flares when the
   sweep line reaches its x position */
const PLAYHEAD_SECONDS = 14;
const playDelay = (x) => `${((parseFloat(x) - 6) / 88) * PLAYHEAD_SECONDS}s`;

const Background = () => (
  <div className={BackgroundStyle.background}>
    <div className={BackgroundStyle.scene}>
      {/* sweeping playhead */}
      <div className={BackgroundStyle.playhead} />

      {staveData.map((stave) => (
        <React.Fragment key={stave.topPct}>
          {/* 5-line staff */}
          <div
            className={BackgroundStyle.staffSystem}
            style={{ top: `${stave.topPct}%` }}
          />

          {/* Treble clef */}
          <span
            className={BackgroundStyle.clef}
            style={{ top: `calc(${stave.topPct}% - 24px)` }}
          >
            𝄞
          </span>

          {/* Bar lines */}
          {stave.bars.map((x) => (
            <div
              key={x}
              className={BackgroundStyle.barLine}
              style={{ left: x, top: `${stave.topPct}%` }}
            />
          ))}

          {/* Notes on the staff — each flares as the playhead passes it */}
          {stave.notes.map(({ x, offset }, i) => {
            const isGlow = glowNoteIndices.has(i);
            return (
              <MdMusicNote
                key={`${stave.topPct}-${i}`}
                className={`${isGlow ? BackgroundStyle.glow : ''} ${BackgroundStyle.notePlay}`}
                style={{
                  left: x,
                  top: `calc(${stave.topPct}% + ${offset - HEAD_OFFSET}px)`,
                  fontSize: '0.95rem',
                  color: noteColor(i),
                  opacity: isGlow ? 0.75 : 0.55,
                  animationDelay: playDelay(x),
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default Background;
