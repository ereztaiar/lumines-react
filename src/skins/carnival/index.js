import {default as background}        from 'Skins/carnival/background.less';
import {default as character}          from 'Skins/carnival/character.less';
import {default as dispenser}          from 'Skins/carnival/dispenser.less';
import {default as grid}               from 'Skins/carnival/grid.less';
import {default as score}              from 'Skins/carnival/score.less';
import {default as swiper}             from 'Skins/carnival/swiper.less';
import {default as BackgroundComponent} from 'Skins/carnival/Background.jsx';
import * as paths                      from 'Skins/carnival/paths';
import {default as reflection}         from 'Skins/reflection.less';

// C major calliope — square oscillator for a bright, reedy circus-organ timbre.
const sounds = {
  synth: { type: 'square', volume: 0.10 },
  moveLeft:  { notes: [261.63, 329.63, 392.00],         duration: 0.18 }, // C major — bouncy step
  moveRight: { notes: [293.66, 369.99, 440.00],         duration: 0.18 }, // D minor lift
  rotate:    { notes: [392.00, 493.88, 587.33],         duration: 0.26 }, // G major twirl
  drop:      { notes: [523.25, 392.00],                 duration: 0.13 }, // quick honk
  deletion:  { notes: [261.63, 329.63, 392.00, 523.25], duration: 0.80 }, // C major triumphant fanfare
  theme: {
    tempo: 150, type: 'square', volume: 0.045, noteDuration: 0.15,
    sequence: [
      [261.63], null,    [329.63], null,    [392.00], null,    [523.25], null,
      [493.88], null,    [392.00], null,    [329.63], null,    null,     null,
      [293.66], null,    [369.99], null,    [440.00], null,    [587.33], null,
      [523.25], null,    [440.00], null,    [369.99], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
