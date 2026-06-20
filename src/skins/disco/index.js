import {default as background}        from 'Skins/disco/background.less';
import {default as character}          from 'Skins/disco/character.less';
import {default as dispenser}          from 'Skins/disco/dispenser.less';
import {default as grid}               from 'Skins/disco/grid.less';
import {default as score}              from 'Skins/disco/score.less';
import {default as swiper}             from 'Skins/disco/swiper.less';
import {default as BackgroundComponent} from 'Skins/disco/Background.jsx';
import * as paths                      from 'Skins/disco/paths';
import {default as reflection}         from 'Skins/reflection.less';

// Funky disco — square oscillator for a bright, percussive bassline pop.
const sounds = {
  synth: { type: 'square', volume: 0.10 },
  moveLeft:  { notes: [392.00, 493.88],          duration: 0.16 }, // G + B — funky stab
  moveRight: { notes: [440.00, 554.37],          duration: 0.16 }, // A + C# — lift
  rotate:    { notes: [523.25, 659.25, 783.99],  duration: 0.24 }, // C major spin
  drop:      { notes: [261.63, 196.00],          duration: 0.12 }, // bass hit
  deletion:  { notes: [392.00, 493.88, 587.33, 783.99], duration: 0.75 }, // G9 — disco hit
  theme: {
    tempo: 124, type: 'square', volume: 0.045, noteDuration: 0.14,
    sequence: [
      [196.00], null,    [392.00], null,    [246.94], null,    [392.00], null,
      [220.00], null,    [440.00], null,    [277.18], null,    [440.00], null,
      [196.00], null,    [392.00], null,    [246.94], null,    [293.66], null,
      [261.63], null,    [523.25], null,    [392.00], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
