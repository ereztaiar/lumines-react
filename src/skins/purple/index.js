import {default as background} from 'Skins/purple/background.less';
import {default as character} from 'Skins/purple/character.less';
import {default as dispenser} from 'Skins/purple/dispenser.less';
import {default as grid} from 'Skins/purple/grid.less';
import {default as score} from 'Skins/purple/score.less';
import {default as swiper} from 'Skins/purple/swiper.less';
import {default as BackgroundComponent} from 'Skins/purple/Background.jsx';
import * as paths from 'Skins/purple/paths';
import {default as reflection} from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 1 };

// F major — triangle oscillator (dreamy, floating). Psychedelic warmth.
const sounds = {
  synth: { type: 'triangle', volume: 0.12 },
  moveLeft:  { notes: [349.23, 440.00, 523.25],         duration: 0.32 }, // F major (I)
  moveRight: { notes: [233.08, 293.66, 349.23],         duration: 0.32 }, // Bb major low (IV) — Bb3=233.08
  rotate:    { notes: [261.63, 329.63, 392.00],         duration: 0.45 }, // C major (V)
  drop:      { notes: [174.61, 261.63],                 duration: 0.18 }, // F3 + C4
  deletion:  { notes: [349.23, 440.00, 523.25, 659.25], duration: 0.90 }, // F maj7 — dreamy shimmer
  theme: {
    tempo: 88, type: 'triangle', volume: 0.050, noteDuration: 0.24,
    sequence: [
      [349.23], null,    [440.00], null,    [523.25], null,    [440.00], null,
      [587.33], null,    [523.25], null,    [440.00], null,    [523.25], null,
      [523.25],[392.00], [329.63], null,    [392.00], null,    [440.00], null,
      [523.25], null,    [440.00], null,    [349.23], null,    null,    null,
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