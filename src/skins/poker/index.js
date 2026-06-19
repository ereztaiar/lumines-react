import {default as background}        from 'Skins/poker/background.less';
import {default as character}          from 'Skins/poker/character.less';
import {default as dispenser}          from 'Skins/poker/dispenser.less';
import {default as grid}               from 'Skins/poker/grid.less';
import {default as score}              from 'Skins/poker/score.less';
import {default as swiper}             from 'Skins/poker/swiper.less';
import {default as BackgroundComponent} from 'Skins/poker/Background.jsx';
import * as paths                      from 'Skins/poker/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 1 };

// C minor jazz — triangle oscillator (warm, sophisticated). A cool casino walk.
const sounds = {
  synth: { type: 'triangle', volume: 0.12 },
  moveLeft:  { notes: [261.63, 311.13, 392.00],         duration: 0.32 }, // Cm (i) — C4, Eb4, G4
  moveRight: { notes: [349.23, 415.30, 523.25],         duration: 0.32 }, // Fm (iv) — F4, Ab4, C5
  rotate:    { notes: [392.00, 493.88, 587.33, 698.46], duration: 0.45 }, // G7 (V7) — dominant tension
  drop:      { notes: [130.81, 196.00],                 duration: 0.20 }, // C3 + G3 — low casino bass
  deletion:  { notes: [261.63, 311.13, 392.00, 466.16], duration: 0.88 }, // Cm7 — jazz resolve
  theme: {
    tempo: 116, type: 'triangle', volume: 0.050, noteDuration: 0.18,
    sequence: [
      [261.63], null,    [311.13], null,    [392.00], null,    [311.13], null,
      [349.23], null,    [415.30], null,    [523.25], null,    [415.30], null,
      [392.00], null,    [493.88], null,    [698.46], null,    [587.33], null,
      [523.25],[466.16], [392.00], null,    [311.13],[261.63], null,    null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
