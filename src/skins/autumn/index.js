import {default as background}        from 'Skins/autumn/background.less';
import {default as character}          from 'Skins/autumn/character.less';
import {default as dispenser}          from 'Skins/autumn/dispenser.less';
import {default as grid}               from 'Skins/autumn/grid.less';
import {default as score}              from 'Skins/autumn/score.less';
import {default as swiper}             from 'Skins/autumn/swiper.less';
import {default as BackgroundComponent} from 'Skins/autumn/Background.jsx';
import * as paths                      from 'Skins/autumn/paths';
import {default as reflection}         from 'Skins/reflection.less';

// D minor → F major — a wistful, nostalgic resolution, like a leaf settling.
const sounds = {
  synth: { type: 'triangle', volume: 0.13 },
  moveLeft:  { notes: [293.66, 349.23, 440.00],         duration: 0.30 }, // D minor — soft step
  moveRight: { notes: [349.23, 440.00, 523.25],         duration: 0.30 }, // F major — warmer lift
  rotate:    { notes: [261.63, 311.13, 392.00],         duration: 0.40 }, // C minor-ish turn
  drop:      { notes: [349.23, 261.63],                 duration: 0.20 }, // a leaf settling
  deletion:  { notes: [293.66, 349.23, 440.00, 523.25], duration: 0.95 }, // Dm-to-F resolve — golden hour
  theme: {
    tempo: 95, type: 'triangle', volume: 0.05, noteDuration: 0.22,
    sequence: [
      [293.66], null,    [349.23], null,    [440.00], null,    null,     null,
      [392.00], null,    [349.23], null,    [293.66], null,    null,     null,
      [261.63], null,    [311.13], null,    [392.00], null,    null,     null,
      [349.23], null,    [293.66], null,    [261.63], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
