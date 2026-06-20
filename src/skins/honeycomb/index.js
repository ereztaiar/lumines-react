import {default as background}        from 'Skins/honeycomb/background.less';
import {default as character}          from 'Skins/honeycomb/character.less';
import {default as dispenser}          from 'Skins/honeycomb/dispenser.less';
import {default as grid}               from 'Skins/honeycomb/grid.less';
import {default as score}              from 'Skins/honeycomb/score.less';
import {default as swiper}             from 'Skins/honeycomb/swiper.less';
import {default as BackgroundComponent} from 'Skins/honeycomb/Background.jsx';
import * as paths                      from 'Skins/honeycomb/paths';
import {default as reflection}         from 'Skins/reflection.less';

// D major pentatonic — warm, bouncy, buzzing. Triangle oscillator for a soft "hum".
const sounds = {
  synth: { type: 'triangle', volume: 0.14 },
  moveLeft:  { notes: [293.66, 369.99, 440.00],         duration: 0.20 }, // D major — gentle hop
  moveRight: { notes: [329.63, 415.30, 493.88],         duration: 0.20 }, // E major — lift
  rotate:    { notes: [349.23, 440.00, 523.25],         duration: 0.30 }, // F major — twirl
  drop:      { notes: [440.00, 329.63],                 duration: 0.16 }, // soft thud, like a bee landing
  deletion:  { notes: [293.66, 369.99, 440.00, 587.33], duration: 0.95 }, // Dmaj7 — glossy honey chord
  theme: {
    tempo: 110, type: 'triangle', volume: 0.05, noteDuration: 0.20,
    sequence: [
      [293.66], null,    [369.99], null,    [440.00], null,    [587.33], null,
      [523.25], null,    [440.00], null,    [369.99], null,    null,     null,
      [329.63], null,    [415.30], null,    [493.88], null,    [659.25], null,
      [587.33], null,    [493.88], null,    [415.30], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
