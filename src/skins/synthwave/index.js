import {default as background}        from 'Skins/synthwave/background.less';
import {default as character}          from 'Skins/synthwave/character.less';
import {default as dispenser}          from 'Skins/synthwave/dispenser.less';
import {default as grid}               from 'Skins/synthwave/grid.less';
import {default as score}              from 'Skins/synthwave/score.less';
import {default as swiper}             from 'Skins/synthwave/swiper.less';
import {default as BackgroundComponent} from 'Skins/synthwave/Background.jsx';
import * as paths                      from 'Skins/synthwave/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 0.55 };

// A minor — square oscillator (bright, retro). 80s synth arpeggio drive.
const sounds = {
  synth: { type: 'square', volume: 0.10 },
  moveLeft:  { notes: [220.00, 261.63, 329.63],         duration: 0.25 }, // A minor (i)
  moveRight: { notes: [293.66, 349.23, 440.00],         duration: 0.25 }, // D minor (iv)
  rotate:    { notes: [329.63, 415.30, 493.88],         duration: 0.35 }, // E major (V)
  drop:      { notes: [440.00, 659.25],                 duration: 0.15 }, // A4 + E5 — high zap
  deletion:  { notes: [220.00, 261.63, 329.63, 392.00], duration: 0.75 }, // Am7 — neon flash
  theme: {
    tempo: 148, type: 'square', volume: 0.048, noteDuration: 0.16,
    sequence: [
      [220.00],[329.63],[440.00],[329.63],[220.00],[261.63],[329.63], null,
      [293.66],[440.00],[587.33],[440.00],[349.23],[293.66],[440.00], null,
      [329.63],[493.88],[659.25],[493.88],[415.30],[329.63],[493.88], null,
      [440.00],[329.63],[261.63],[220.00],[261.63],[329.63], null,   null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
