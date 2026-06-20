import {default as background}        from 'Skins/aurora/background.less';
import {default as character}          from 'Skins/aurora/character.less';
import {default as dispenser}          from 'Skins/aurora/dispenser.less';
import {default as grid}               from 'Skins/aurora/grid.less';
import {default as score}              from 'Skins/aurora/score.less';
import {default as swiper}             from 'Skins/aurora/swiper.less';
import {default as BackgroundComponent} from 'Skins/aurora/Background.jsx';
import * as paths                      from 'Skins/aurora/paths';
import {default as reflection}         from 'Skins/reflection.less';

// D Lydian — sine oscillator, spacious and bright. Ethereal night-sky shimmer.
const sounds = {
  synth: { type: 'sine', volume: 0.12 },
  moveLeft:  { notes: [293.66, 369.99, 440.00],         duration: 0.50 }, // D major wide — cool drift
  moveRight: { notes: [329.63, 415.30, 493.88],         duration: 0.50 }, // E minor — shifting light
  rotate:    { notes: [369.99, 440.00, 554.37],         duration: 0.60 }, // F# minor — twist of color
  drop:      { notes: [293.66, 220.00],                 duration: 0.28 }, // soft settle
  deletion:  { notes: [293.66, 369.99, 440.00, 554.37], duration: 1.10 }, // Dmaj9 — glowing shimmer
  theme: {
    tempo: 75, type: 'sine', volume: 0.045, noteDuration: 0.30,
    sequence: [
      [293.66], null,    null,    [369.99], null,    null,    [440.00], null,
      [554.37], null,    null,    [440.00], null,    [415.30], null,    null,
      [369.99], null,    [329.63], null,   [293.66], null,    [246.94], null,
      [220.00], null,    null,    null,    [293.66], null,    null,    null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
