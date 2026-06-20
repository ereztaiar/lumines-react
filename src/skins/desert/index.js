import {default as background}        from 'Skins/desert/background.less';
import {default as character}          from 'Skins/desert/character.less';
import {default as dispenser}          from 'Skins/desert/dispenser.less';
import {default as grid}               from 'Skins/desert/grid.less';
import {default as score}              from 'Skins/desert/score.less';
import {default as swiper}             from 'Skins/desert/swiper.less';
import {default as BackgroundComponent} from 'Skins/desert/Background.jsx';
import * as paths                      from 'Skins/desert/paths';
import {default as reflection}         from 'Skins/reflection.less';

// E Phrygian-flavoured — sawtooth for a reedy, caravan-bell timbre.
const sounds = {
  synth: { type: 'sawtooth', volume: 0.11 },
  moveLeft:  { notes: [164.81, 195.99, 246.94],         duration: 0.30 }, // E + F + B (phrygian color)
  moveRight: { notes: [196.00, 233.08, 293.66],         duration: 0.30 }, // G + Bb + D
  rotate:    { notes: [220.00, 261.63, 329.63],         duration: 0.40 }, // A minor — desert wind
  drop:      { notes: [164.81, 123.47],                 duration: 0.18 }, // low thud — sand settle
  deletion:  { notes: [164.81, 207.65, 246.94, 311.13], duration: 0.95 }, // warm exotic resolve
  theme: {
    tempo: 90, type: 'sawtooth', volume: 0.045, noteDuration: 0.24,
    sequence: [
      [164.81], null,    [195.99], null,    [220.00], null,    [246.94], null,
      [261.63], null,    [246.94], null,    [220.00], null,    null,     null,
      [196.00], null,    [233.08], null,    [261.63], null,    [293.66], null,
      [246.94], null,    [220.00], null,    [195.99], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
