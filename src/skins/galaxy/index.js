import {default as background}        from 'Skins/galaxy/background.less';
import {default as character}          from 'Skins/galaxy/character.less';
import {default as dispenser}          from 'Skins/galaxy/dispenser.less';
import {default as grid}               from 'Skins/galaxy/grid.less';
import {default as score}              from 'Skins/galaxy/score.less';
import {default as swiper}             from 'Skins/galaxy/swiper.less';
import {default as BackgroundComponent} from 'Skins/galaxy/Background.jsx';
import * as paths                      from 'Skins/galaxy/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 1.3 };

// E minor — sine oscillator (vast, ethereal). Stars adrift in deep space.
const sounds = {
  synth: { type: 'sine', volume: 0.12 },
  moveLeft:  { notes: [164.81, 246.94, 329.63],         duration: 0.45 }, // E minor wide (i) — cosmic spread
  moveRight: { notes: [220.00, 329.63, 440.00],         duration: 0.45 }, // A minor (iv)
  rotate:    { notes: [246.94, 369.99, 493.88],         duration: 0.55 }, // B minor (v) — deep tension
  drop:      { notes: [164.81, 246.94],                 duration: 0.25 }, // E3 + B3 — gravity
  deletion:  { notes: [164.81, 246.94, 329.63, 493.88], duration: 1.00 }, // Em7 — supernova
  theme: {
    tempo: 72, type: 'sine', volume: 0.045, noteDuration: 0.35,
    sequence: [
      [329.63], null,    null,    [392.00], null,    null,    [493.88], null,
      [587.33], null,    null,    [493.88], null,    [440.00], null,   null,
      [493.88], null,    [440.00], null,   [392.00], null,    [369.99], null,
      [329.63], null,    null,    null,    [246.94], null,    null,   null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
