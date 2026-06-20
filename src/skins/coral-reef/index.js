import {default as background}        from 'Skins/coral-reef/background.less';
import {default as character}          from 'Skins/coral-reef/character.less';
import {default as dispenser}          from 'Skins/coral-reef/dispenser.less';
import {default as grid}               from 'Skins/coral-reef/grid.less';
import {default as score}              from 'Skins/coral-reef/score.less';
import {default as swiper}             from 'Skins/coral-reef/swiper.less';
import {default as BackgroundComponent} from 'Skins/coral-reef/Background.jsx';
import * as paths                      from 'Skins/coral-reef/paths';
import {default as reflection}         from 'Skins/reflection.less';

// D major — sine oscillator, gentle underwater ambience.
const sounds = {
  synth: { type: 'sine', volume: 0.12 },
  moveLeft:  { notes: [293.66, 369.99, 440.00],         duration: 0.40 }, // D major — calm current
  moveRight: { notes: [349.23, 440.00, 523.25],         duration: 0.40 }, // F major — drifting
  rotate:    { notes: [392.00, 493.88, 587.33],         duration: 0.50 }, // G major — gentle swirl
  drop:      { notes: [293.66, 220.00],                 duration: 0.22 }, // soft plop into water
  deletion:  { notes: [293.66, 369.99, 440.00, 587.33], duration: 0.95 }, // Dmaj7 — shimmering reef sparkle
  theme: {
    tempo: 85, type: 'sine', volume: 0.045, noteDuration: 0.26,
    sequence: [
      [293.66], null,    null,    [369.99], null,    null,    [440.00], null,
      [493.88], null,    null,    [440.00], null,    [369.99], null,    null,
      [349.23], null,    [293.66], null,   [261.63], null,    [293.66], null,
      [220.00], null,    null,    null,    [196.00], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
