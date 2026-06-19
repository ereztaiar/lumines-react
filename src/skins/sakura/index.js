import {default as background}        from 'Skins/sakura/background.less';
import {default as character}          from 'Skins/sakura/character.less';
import {default as dispenser}          from 'Skins/sakura/dispenser.less';
import {default as grid}               from 'Skins/sakura/grid.less';
import {default as score}              from 'Skins/sakura/score.less';
import {default as swiper}             from 'Skins/sakura/swiper.less';
import {default as BackgroundComponent} from 'Skins/sakura/Background.jsx';
import * as paths                      from 'Skins/sakura/paths';
import {default as reflection}         from 'Skins/sakura/reflection.less';

const gameplay = { speedMultiplier: 1.4 };

// A major — sine oscillator (clean, delicate). Japanese koto resonance.
const sounds = {
  synth: { type: 'sine', volume: 0.12 },
  moveLeft:  { notes: [220.00, 277.18, 329.63],         duration: 0.30 }, // A major (I) — A3, C#4, E4
  moveRight: { notes: [293.66, 369.99, 440.00],         duration: 0.30 }, // D major (IV)
  rotate:    { notes: [329.63, 415.30, 493.88],         duration: 0.42 }, // E major (V)
  drop:      { notes: [220.00, 329.63],                 duration: 0.17 }, // A3 + E4 — pluck
  deletion:  { notes: [220.00, 277.18, 329.63, 415.30], duration: 0.85 }, // A maj7 — resonant sustain
  theme: {
    tempo: 116, type: 'sine', volume: 0.050, noteDuration: 0.17,
    sequence: [
      [440.00], null,    [493.88],[554.37],[493.88], null,    [440.00], null,
      [369.99], null,    [440.00], null,   [493.88], null,    [440.00], null,
      [659.25], null,    [739.99], null,   [659.25],[554.37], [493.88], null,
      [440.00], null,    [493.88], null,   [440.00], null,    null,    null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
