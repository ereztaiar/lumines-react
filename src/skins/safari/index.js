import {default as background}        from 'Skins/safari/background.less';
import {default as character}          from 'Skins/safari/character.less';
import {default as dispenser}          from 'Skins/safari/dispenser.less';
import {default as grid}               from 'Skins/safari/grid.less';
import {default as score}              from 'Skins/safari/score.less';
import {default as swiper}             from 'Skins/safari/swiper.less';
import {default as BackgroundComponent} from 'Skins/safari/Background.jsx';
import * as paths                      from 'Skins/safari/paths';
import {default as reflection}         from 'Skins/reflection.less';

// Pentatonic motif (C-D-E-G-A) — adventurous, open-air trek feel.
const sounds = {
  synth: { type: 'triangle', volume: 0.14 },
  moveLeft:  { notes: [261.63, 329.63, 392.00],         duration: 0.22 }, // C-E-G — confident step
  moveRight: { notes: [293.66, 349.23, 440.00],         duration: 0.22 }, // D-F-A — answering step
  rotate:    { notes: [392.00, 440.00, 523.25],         duration: 0.30 }, // G-A-C — alert call
  drop:      { notes: [440.00, 293.66],                 duration: 0.16 }, // thud — footfall
  deletion:  { notes: [261.63, 329.63, 392.00, 440.00], duration: 0.85 }, // pentatonic cluster — triumphant
  theme: {
    tempo: 100, type: 'triangle', volume: 0.05, noteDuration: 0.2,
    sequence: [
      [261.63], null,    [329.63], null,    [392.00], null,    [440.00], null,
      [392.00], null,    [329.63], null,    [293.66], null,    null,     null,
      [329.63], null,    [392.00], null,    [440.00], null,    [523.25], null,
      [440.00], null,    [392.00], null,    [329.63], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
