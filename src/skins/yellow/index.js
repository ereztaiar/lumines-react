import {default as background} from 'Skins/yellow/background.less';
import {default as character} from 'Skins/yellow/character.less';
import {default as dispenser} from 'Skins/yellow/dispenser.less';
import {default as grid} from 'Skins/yellow/grid.less';
import {default as score} from 'Skins/yellow/score.less';
import {default as swiper} from 'Skins/yellow/swiper.less';
import {default as BackgroundComponent} from 'Skins/yellow/Background.jsx';
import * as paths from 'Skins/yellow/paths';
import {default as reflection} from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 0.75 };

// C major — triangle oscillator (warm, bright). Golden sunshine energy.
const sounds = {
  synth: { type: 'triangle', volume: 0.12 },
  moveLeft:  { notes: [261.63, 329.63, 392.00],         duration: 0.28 }, // C major (I)
  moveRight: { notes: [349.23, 440.00, 523.25],         duration: 0.28 }, // F major (IV)
  rotate:    { notes: [392.00, 493.88, 587.33],         duration: 0.40 }, // G major (V)
  drop:      { notes: [261.63, 392.00],                 duration: 0.15 }, // C4 + G4 — bright thud
  deletion:  { notes: [261.63, 329.63, 392.00, 493.88], duration: 0.82 }, // C maj7 — sunny resolution
  theme: {
    tempo: 112, type: 'triangle', volume: 0.055, noteDuration: 0.20,
    sequence: [
      [261.63],[329.63],[392.00], null,   [440.00],[392.00],[329.63], null,
      [349.23],[440.00],[523.25], null,   [440.00],[349.23],[440.00], null,
      [392.00],[493.88],[587.33], null,   [493.88],[440.00],[392.00], null,
      [329.63],[261.63],[329.63], null,   [392.00],[329.63],[261.63], null,
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