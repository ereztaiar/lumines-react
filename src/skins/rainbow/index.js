import {default as background}        from 'Skins/rainbow/background.less';
import {default as character}          from 'Skins/rainbow/character.less';
import {default as dispenser}          from 'Skins/rainbow/dispenser.less';
import {default as grid}               from 'Skins/rainbow/grid.less';
import {default as score}              from 'Skins/rainbow/score.less';
import {default as swiper}             from 'Skins/rainbow/swiper.less';
import {default as BackgroundComponent} from 'Skins/rainbow/Background.jsx';
import * as paths                      from 'Skins/rainbow/paths';
import {default as reflection}         from 'Skins/reflection.less';

// Ascending major triads cycling through the spectrum — a different "color" chord per action.
const sounds = {
  synth: { type: 'triangle', volume: 0.14 },
  moveLeft:  { notes: [261.63, 329.63, 392.00],         duration: 0.22 }, // C major — red
  moveRight: { notes: [293.66, 369.99, 440.00],         duration: 0.22 }, // D major — orange
  rotate:    { notes: [329.63, 415.30, 493.88],         duration: 0.30 }, // E major — yellow
  drop:      { notes: [392.00, 523.25],                 duration: 0.15 }, // G + C — green blip
  deletion:  { notes: [261.63, 329.63, 392.00, 493.88, 587.33], duration: 0.95 }, // full spectrum chord
  theme: {
    tempo: 140, type: 'triangle', volume: 0.05, noteDuration: 0.15,
    sequence: [
      [261.63], [329.63], [392.00], null,    [293.66], [369.99], [440.00], null,
      [329.63], [415.30], [493.88], null,    [392.00], [493.88], [587.33], null,
      [440.00], [554.37], [659.25], null,    [493.88], [587.33], [739.99], null,
      [392.00], [329.63], [293.66], [261.63], null,     null,     null,    null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
