import {default as background}        from 'Skins/arctic/background.less';
import {default as character}          from 'Skins/arctic/character.less';
import {default as dispenser}          from 'Skins/arctic/dispenser.less';
import {default as grid}               from 'Skins/arctic/grid.less';
import {default as score}              from 'Skins/arctic/score.less';
import {default as swiper}             from 'Skins/arctic/swiper.less';
import {default as BackgroundComponent} from 'Skins/arctic/Background.jsx';
import * as paths                      from 'Skins/arctic/paths';
import {default as reflection}         from 'Skins/reflection.less';

// Sparse, glacial — sine oscillator, long sustains, crystalline high register.
const sounds = {
  synth: { type: 'sine', volume: 0.13 },
  moveLeft:  { notes: [880.00, 1108.73],         duration: 0.55 }, // A5 + C#6 — thin ice chime
  moveRight: { notes: [987.77, 1244.51],         duration: 0.55 }, // B5 + D#6
  rotate:    { notes: [1046.50, 1318.51, 1567.98], duration: 0.65 }, // C6 maj — crystal spin
  drop:      { notes: [659.25, 523.25],          duration: 0.30 }, // soft crack
  deletion:  { notes: [880.00, 1108.73, 1318.51, 1760.00], duration: 1.10 }, // shimmering glacial chord
  theme: {
    tempo: 70, type: 'sine', volume: 0.045, noteDuration: 0.30,
    sequence: [
      [523.25], null,    null,    [659.25], null,    null,    [783.99], null,
      [880.00], null,    null,    [783.99], null,    null,    null,     null,
      [659.25], null,    [587.33], null,    [523.25], null,    null,    null,
      [440.00], null,    null,    [523.25], null,    null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
