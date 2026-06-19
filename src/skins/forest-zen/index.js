import {default as background}        from 'Skins/forest-zen/background.less';
import {default as character}          from 'Skins/forest-zen/character.less';
import {default as dispenser}          from 'Skins/forest-zen/dispenser.less';
import {default as grid}               from 'Skins/forest-zen/grid.less';
import {default as score}              from 'Skins/forest-zen/score.less';
import {default as swiper}             from 'Skins/forest-zen/swiper.less';
import {default as BackgroundComponent} from 'Skins/forest-zen/Background.jsx';
import * as paths                      from 'Skins/forest-zen/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 1.6 };

// D major — sine oscillator (warm, pastoral). Birdsong through the canopy.
const sounds = {
  synth: { type: 'sine', volume: 0.12 },
  moveLeft:  { notes: [293.66, 369.99, 440.00],         duration: 0.32 }, // D major (I)
  moveRight: { notes: [196.00, 246.94, 293.66],         duration: 0.32 }, // G major low (IV) — earthy
  rotate:    { notes: [220.00, 277.18, 329.63],         duration: 0.45 }, // A major (V)
  drop:      { notes: [146.83, 220.00],                 duration: 0.18 }, // D3 + A3 — roots
  deletion:  { notes: [293.66, 369.99, 440.00, 554.37], duration: 0.88 }, // D maj7 — bloom
  theme: {
    tempo: 88, type: 'sine', volume: 0.050, noteDuration: 0.24,
    sequence: [
      [293.66], null,    [369.99], null,    [440.00], null,    [369.99], null,
      [493.88], null,    [440.00], [369.99],[440.00], null,    [493.88], null,
      [440.00], [369.99],[329.63], null,    [293.66], null,    [329.63], null,
      [293.66], null,    [369.99], null,    [293.66], null,    null,    null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
