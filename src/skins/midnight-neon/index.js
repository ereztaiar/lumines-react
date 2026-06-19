import {default as background} from 'Skins/midnight-neon/background.less';
import {default as character} from 'Skins/midnight-neon/character.less';
import {default as dispenser} from 'Skins/midnight-neon/dispenser.less';
import {default as grid} from 'Skins/midnight-neon/grid.less';
import {default as score} from 'Skins/midnight-neon/score.less';
import {default as swiper} from 'Skins/midnight-neon/swiper.less';
import {default as BackgroundComponent} from 'Skins/midnight-neon/Background.jsx';
import * as paths from 'Skins/midnight-neon/paths';
import {default as reflection} from 'Skins/reflection.less';

const gameplay = { speedMultiplier: 0.65 };

// A minor — square oscillator (buzzy, retro). 8-bit chiptune cyberpunk.
const sounds = {
  synth: { type: 'square', volume: 0.10 },
  moveLeft:  { notes: [220.00, 261.63, 329.63],         duration: 0.20 }, // A minor (i) — staccato
  moveRight: { notes: [293.66, 349.23, 440.00],         duration: 0.20 }, // D minor (iv)
  rotate:    { notes: [329.63, 415.30, 493.88],         duration: 0.28 }, // E major (V)
  drop:      { notes: [440.00, 659.25],                 duration: 0.12 }, // A4 + E5 — zap
  deletion:  { notes: [220.00, 261.63, 329.63, 392.00], duration: 0.55 }, // Am7 — neon flash
  theme: {
    tempo: 160, type: 'square', volume: 0.048, noteDuration: 0.14,
    sequence: [
      [440.00],[523.25],[659.25],[523.25],[440.00],[523.25],[659.25], null,
      [587.33],[659.25],[783.99],[659.25],[587.33],[523.25],[440.00], null,
      [659.25],[783.99],[659.25],[523.25],[440.00],[329.63],[261.63], null,
      [440.00],[329.63],[261.63],[220.00],[261.63],[329.63], null,   null,
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
