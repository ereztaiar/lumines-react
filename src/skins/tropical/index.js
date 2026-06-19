import {default as background}        from 'Skins/tropical/background.less';
import {default as character}          from 'Skins/tropical/character.less';
import {default as dispenser}          from 'Skins/tropical/dispenser.less';
import {default as grid}               from 'Skins/tropical/grid.less';
import {default as score}              from 'Skins/tropical/score.less';
import {default as swiper}             from 'Skins/tropical/swiper.less';
import {default as BackgroundComponent} from 'Skins/tropical/Background.jsx';
import * as paths                      from 'Skins/tropical/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 0.85 };

// G major I–IV–V–I via sine oscillator (steel drum / marimba character).
// Theme: G major pentatonic melody at 110 BPM — airy, breezy, Caribbean.
const sounds = {
  synth: { type: 'sine', volume: 0.13 },
  moveLeft:  { notes: [392.00, 493.88, 587.33],         duration: 0.30 }, // G major  (I)
  moveRight: { notes: [261.63, 329.63, 392.00],         duration: 0.30 }, // C major  (IV)
  rotate:    { notes: [293.66, 369.99, 440.00],         duration: 0.42 }, // D major  (V)
  drop:      { notes: [196.00, 293.66],                 duration: 0.18 }, // G power chord (low thud)
  deletion:  { notes: [392.00, 493.88, 587.33, 739.99], duration: 0.85 }, // G major 7th (shimmering resolution)
  theme: {
    tempo: 130,
    type: 'sine',
    volume: 0.055,
    noteDuration: 0.19,
    sequence: [
      // bar 1 — tonic G, opening phrase
      [392.00], null, [493.88], [587.33], [493.88], null, [440.00], null,
      // bar 2 — upper register, E5/D5 peak
      [659.25], null, [587.33], [493.88], [659.25], null, [587.33], null,
      // bar 3 — descending tension toward cadence
      [587.33], [493.88], [440.00], null, [493.88], null, [392.00], null,
      // bar 4 — resolve back to G
      [440.00], [493.88], [587.33], null, [493.88], [392.00], null, null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
