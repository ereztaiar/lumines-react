import {default as background}        from 'Skins/bubblegum/background.less';
import {default as character}          from 'Skins/bubblegum/character.less';
import {default as dispenser}          from 'Skins/bubblegum/dispenser.less';
import {default as grid}               from 'Skins/bubblegum/grid.less';
import {default as score}              from 'Skins/bubblegum/score.less';
import {default as swiper}             from 'Skins/bubblegum/swiper.less';
import {default as BackgroundComponent} from 'Skins/bubblegum/Background.jsx';
import * as paths                      from 'Skins/bubblegum/paths';
import {default as reflection}         from 'Skins/reflection.less';

// E major — major-key bounce, square-ish oscillator for a chewy "pop" timbre.
const sounds = {
  synth: { type: 'triangle', volume: 0.14 },
  moveLeft:  { notes: [329.63, 415.30, 493.88],         duration: 0.20 }, // E major — bouncy pop
  moveRight: { notes: [369.99, 440.00, 554.37],         duration: 0.20 }, // F#m-ish lift
  rotate:    { notes: [392.00, 493.88, 587.33],         duration: 0.28 }, // G major twirl
  drop:      { notes: [523.25, 392.00],                 duration: 0.14 }, // bubble-pop blip
  deletion:  { notes: [329.63, 415.30, 493.88, 659.25], duration: 0.85 }, // Emaj7 — sweet fizz
  theme: {
    tempo: 132, type: 'triangle', volume: 0.05, noteDuration: 0.17,
    sequence: [
      [329.63], null,    [415.30], null,    [493.88], null,    [659.25], null,
      [587.33], null,    [493.88], null,    [415.30], null,    null,     null,
      [369.99], null,    [440.00], null,    [554.37], null,    [739.99], null,
      [659.25], null,    [554.37], null,    [440.00], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
