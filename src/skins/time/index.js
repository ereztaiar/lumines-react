import {default as background}        from 'Skins/time/background.less';
import {default as character}          from 'Skins/time/character.less';
import {default as dispenser}          from 'Skins/time/dispenser.less';
import {default as grid}               from 'Skins/time/grid.less';
import {default as score}              from 'Skins/time/score.less';
import {default as swiper}             from 'Skins/time/swiper.less';
import {default as BackgroundComponent} from 'Skins/time/Background.jsx';
import * as paths                      from 'Skins/time/paths';
import {default as reflection}         from 'Skins/reflection.less';

// A minor — triangle oscillator (steady, clockwork). Time ticking with precision.
const sounds = {
  synth: { type: 'triangle', volume: 0.12 },
  moveLeft:  { notes: [220.00, 261.63, 329.63],         duration: 0.30 }, // A minor (i)
  moveRight: { notes: [146.83, 220.00, 293.66],         duration: 0.30 }, // D minor low (iv) — tick contrast
  rotate:    { notes: [329.63, 415.30, 493.88],         duration: 0.42 }, // E major (V)
  drop:      { notes: [220.00, 329.63],                 duration: 0.16 }, // A3 + E4 — tick
  deletion:  { notes: [220.00, 261.63, 329.63, 392.00], duration: 0.80 }, // Am7 — chime resolve
  theme: {
    tempo: 100, type: 'triangle', volume: 0.050, noteDuration: 0.22,
    sequence: [
      [220.00], null,   [329.63], null,   [440.00], null,   [329.63], null,
      [293.66], null,   [349.23], null,   [440.00], null,   [349.23], null,
      [329.63], null,   [415.30], null,   [493.88], null,   [415.30], null,
      [440.00], null,   [329.63], null,   [261.63], null,   [220.00], null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
