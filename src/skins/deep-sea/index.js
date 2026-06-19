import {default as background}        from 'Skins/deep-sea/background.less';
import {default as character}          from 'Skins/deep-sea/character.less';
import {default as dispenser}          from 'Skins/deep-sea/dispenser.less';
import {default as grid}               from 'Skins/deep-sea/grid.less';
import {default as score}              from 'Skins/deep-sea/score.less';
import {default as swiper}             from 'Skins/deep-sea/swiper.less';
import {default as BackgroundComponent} from 'Skins/deep-sea/Background.jsx';
import * as paths                      from 'Skins/deep-sea/paths';
import {default as reflection}         from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 1.5 };

// C major pentatonic — sine oscillator (pure, fluid). Deep ocean drift.
const sounds = {
  synth: { type: 'sine', volume: 0.12 },
  moveLeft:  { notes: [261.63, 392.00, 523.25],         duration: 0.40 }, // C major wide (I)
  moveRight: { notes: [220.00, 329.63, 440.00],         duration: 0.40 }, // A minor (vi) — depth
  rotate:    { notes: [196.00, 261.63, 293.66],         duration: 0.50 }, // G sus — suspended tension
  drop:      { notes: [130.81, 196.00],                 duration: 0.25 }, // C3 + G3 — deep bubble
  deletion:  { notes: [261.63, 329.63, 392.00, 493.88], duration: 1.00 }, // C maj7 — slow bloom
  theme: {
    tempo: 78, type: 'sine', volume: 0.048, noteDuration: 0.30,
    sequence: [
      [261.63], null,    null,    [329.63], null,    null,    [392.00], null,
      [440.00], null,    null,    [392.00], null,    null,    [329.63], null,
      [392.00], null,    [293.66], null,   null,    [261.63], null,    null,
      [329.63], null,    null,    null,    [261.63], null,    null,    null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, gameplay, sounds }
