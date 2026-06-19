import {default as background}         from 'Skins/cherry-blossom/background.less';
import {default as character}           from 'Skins/cherry-blossom/character.less';
import {default as dispenser}           from 'Skins/cherry-blossom/dispenser.less';
import {default as grid}                from 'Skins/cherry-blossom/grid.less';
import {default as score}               from 'Skins/cherry-blossom/score.less';
import {default as swiper}              from 'Skins/cherry-blossom/swiper.less';
import {default as BackgroundComponent} from 'Skins/cherry-blossom/Background.jsx';
import * as paths                       from 'Skins/cherry-blossom/paths';
import {default as reflection}          from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 1.3 };

// A minor — sine oscillator (delicate, ethereal). Petals drifting in the night.
const sounds = {
  synth: { type: 'sine', volume: 0.12 },
  moveLeft:  { notes: [220.00, 261.63, 329.63],         duration: 0.32 }, // A minor (i)
  moveRight: { notes: [293.66, 349.23, 440.00],         duration: 0.32 }, // D minor (iv)
  rotate:    { notes: [329.63, 415.30, 493.88],         duration: 0.45 }, // E major (V) — Picardy shimmer
  drop:      { notes: [220.00, 329.63],                 duration: 0.18 }, // A3 + E4
  deletion:  { notes: [220.00, 261.63, 329.63, 415.30], duration: 0.90 }, // Am maj7 — bittersweet
  theme: {
    tempo: 108, type: 'sine', volume: 0.050, noteDuration: 0.18,
    sequence: [
      [329.63], null,    [261.63], [293.66], [329.63], null,    [220.00], null,
      [349.23], null,    [440.00], [392.00], [349.23], null,    [329.63], null,
      [415.30], [493.88],[415.30], null,     [392.00], null,    [329.63], null,
      [261.63], [220.00],[261.63], null,     [293.66], [261.63], null,   null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
