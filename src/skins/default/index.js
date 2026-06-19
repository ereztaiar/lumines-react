import {default as background} from 'Skins/default/background.less';
import {default as character} from 'Skins/default/character.less';
import {default as dispenser} from 'Skins/default/dispenser.less';
import {default as grid} from 'Skins/default/grid.less';
import {default as score} from 'Skins/default/score.less';
import {default as swiper} from 'Skins/default/swiper.less';
import {default as BackgroundComponent} from 'Skins/default/Background.jsx';
import * as paths from 'Skins/default/paths';
import {default as reflection} from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 1 };

// C major — triangle oscillator (warm, balanced). Clean and classic.
const sounds = {
  synth: { type: 'triangle', volume: 0.12 },
  moveLeft:  { notes: [261.63, 329.63, 392.00],         duration: 0.28 }, // C major (I)
  moveRight: { notes: [349.23, 440.00, 523.25],         duration: 0.28 }, // F major (IV)
  rotate:    { notes: [392.00, 493.88, 587.33],         duration: 0.40 }, // G major (V)
  drop:      { notes: [261.63, 392.00],                 duration: 0.16 }, // C4 + G4 power
  deletion:  { notes: [261.63, 329.63, 392.00, 493.88], duration: 0.80 }, // C maj7 resolution
  theme: {
    tempo: 120, type: 'triangle', volume: 0.050, noteDuration: 0.17,
    sequence: [
      [261.63],[329.63],[392.00], null,   [329.63],[261.63], null,   null,
      [392.00],[440.00],[392.00], null,   [329.63], null,   [261.63], null,
      [392.00],[493.88],[392.00], null,   [349.23],[329.63], null,   null,
      [261.63],[329.63],[392.00], null,   [261.63], null,   null,   null,
    ],
  },
};

export {
    background,
    character,
    dispenser,
    grid,
    score,
    swiper,
    paths,
    reflection,
    BackgroundComponent,
    gameplay,
    sounds
}