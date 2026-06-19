import {default as background}        from 'Skins/halloween/background.less';
import {default as character}          from 'Skins/halloween/character.less';
import {default as dispenser}          from 'Skins/halloween/dispenser.less';
import {default as grid}               from 'Skins/halloween/grid.less';
import {default as score}              from 'Skins/halloween/score.less';
import {default as swiper}             from 'Skins/halloween/swiper.less';
import {default as BackgroundComponent} from 'Skins/halloween/Background.jsx';
import * as paths                      from 'Skins/halloween/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 0.7 };

// D minor — triangle oscillator (organ-like, ghostly). Harmonic minor creeping in the dark.
const sounds = {
  synth: { type: 'triangle', volume: 0.12 },
  moveLeft:  { notes: [293.66, 349.23, 440.00],         duration: 0.35 }, // D minor (i)
  moveRight: { notes: [196.00, 233.08, 293.66],         duration: 0.35 }, // G minor (iv) — Bb3 = 233.08
  rotate:    { notes: [220.00, 277.18, 329.63],         duration: 0.50 }, // A major (V) — Picardy 3rd, unsettling
  drop:      { notes: [146.83, 220.00],                 duration: 0.20 }, // D3 + A3 — low thud
  deletion:  { notes: [293.66, 349.23, 440.00, 523.25], duration: 0.92 }, // Dm7 — ominous bloom
  theme: {
    tempo: 102, type: 'triangle', volume: 0.050, noteDuration: 0.18,
    sequence: [
      [293.66], null,    [349.23], null,    [440.00], null,    [349.23],[293.66],
      [440.00], null,    [392.00], null,    [349.23], null,    [293.66], null,
      [277.18], null,    [329.63],[440.00], [329.63], null,    [277.18], null,
      [293.66], null,    [349.23], null,    [440.00],[349.23], [293.66], null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
