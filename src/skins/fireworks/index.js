import {default as background}        from 'Skins/fireworks/background.less';
import {default as character}          from 'Skins/fireworks/character.less';
import {default as dispenser}          from 'Skins/fireworks/dispenser.less';
import {default as grid}               from 'Skins/fireworks/grid.less';
import {default as score}              from 'Skins/fireworks/score.less';
import {default as swiper}             from 'Skins/fireworks/swiper.less';
import {default as BackgroundComponent} from 'Skins/fireworks/Background.jsx';
import * as paths                      from 'Skins/fireworks/paths';
import {default as reflection}         from 'Skins/reflection.less';

// Festive bursts — sawtooth oscillator for a bright, punchy "pop" timbre.
const sounds = {
  synth: { type: 'sawtooth', volume: 0.13 },
  moveLeft:  { notes: [493.88, 587.33, 698.46],          duration: 0.16 }, // bright punchy blip
  moveRight: { notes: [523.25, 659.25, 783.99],          duration: 0.16 }, // higher punchy blip
  rotate:    { notes: [587.33, 739.99, 880.00],          duration: 0.22 }, // rising whistle
  drop:      { notes: [880.00, 587.33, 392.00],          duration: 0.20 }, // falling whistle
  deletion:  { notes: [392.00, 587.33, 783.99, 1046.50], duration: 1.10 }, // big loud explosion chord
  theme: {
    tempo: 130, type: 'sawtooth', volume: 0.045, noteDuration: 0.15,
    sequence: [
      [392.00], null,    [587.33], null,    [783.99], null,    [1046.50], null,
      [880.00], null,    [783.99], null,    [659.25], null,    null,      null,
      [493.88], null,    [587.33], null,    [739.99], null,    [987.77],  null,
      [880.00], null,    [739.99], null,    [587.33], null,    null,      null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
