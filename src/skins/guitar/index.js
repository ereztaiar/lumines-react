import {default as background}        from 'Skins/guitar/background.less';
import {default as character}          from 'Skins/guitar/character.less';
import {default as dispenser}          from 'Skins/guitar/dispenser.less';
import {default as grid}               from 'Skins/guitar/grid.less';
import {default as score}              from 'Skins/guitar/score.less';
import {default as swiper}             from 'Skins/guitar/swiper.less';
import {default as BackgroundComponent} from 'Skins/guitar/Background.jsx';
import * as paths                      from 'Skins/guitar/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 0.65 };

// E minor — sawtooth oscillator (gritty, electric). Power chords and a driving riff.
const sounds = {
  synth: { type: 'sawtooth', volume: 0.11 },
  moveLeft:  { notes: [164.81, 246.94, 329.63],         duration: 0.22 }, // E minor (i) — punchy
  moveRight: { notes: [220.00, 329.63, 440.00],         duration: 0.22 }, // A minor (iv)
  rotate:    { notes: [246.94, 311.13, 369.99],         duration: 0.32 }, // B major (V) — rock tension
  drop:      { notes: [164.81, 329.63],                 duration: 0.14 }, // E3 + E4 octave — heavy thud
  deletion:  { notes: [164.81, 246.94, 329.63, 493.88], duration: 0.70 }, // Em7 — power chord bloom
  theme: {
    tempo: 150, type: 'sawtooth', volume: 0.048, noteDuration: 0.16,
    sequence: [
      [329.63],[329.63], null,   [392.00],[440.00], null,   [493.88], null,
      [493.88],[493.88],[440.00], null,  [392.00],[440.00],[329.63],  null,
      [440.00], null,  [440.00],[493.88],[587.33], null,   [493.88],  null,
      [440.00],[392.00],[329.63], null,  [246.94], null,   [329.63],  null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
