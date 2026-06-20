import {default as background}        from 'Skins/volcano/background.less';
import {default as character}          from 'Skins/volcano/character.less';
import {default as dispenser}          from 'Skins/volcano/dispenser.less';
import {default as grid}               from 'Skins/volcano/grid.less';
import {default as score}              from 'Skins/volcano/score.less';
import {default as swiper}             from 'Skins/volcano/swiper.less';
import {default as BackgroundComponent} from 'Skins/volcano/Background.jsx';
import * as paths                      from 'Skins/volcano/paths';
import {default as reflection}         from 'Skins/reflection.less';

// C minor — sawtooth oscillator for a gritty, rumbling magma timbre.
const sounds = {
  synth: { type: 'sawtooth', volume: 0.11 },
  moveLeft:  { notes: [130.81, 155.56, 196.00],         duration: 0.30 }, // Cm — low rumble
  moveRight: { notes: [146.83, 174.61, 220.00],         duration: 0.30 }, // Dm-ish shift, tense
  rotate:    { notes: [155.56, 185.00, 233.08],         duration: 0.38 }, // tritone tension grind
  drop:      { notes: [98.00, 65.41],                   duration: 0.22 }, // deep magma thud
  deletion:  { notes: [261.63, 329.63, 392.00, 466.16], duration: 1.10 }, // bright eruption burst
  theme: {
    tempo: 80, type: 'sawtooth', volume: 0.045, noteDuration: 0.30,
    sequence: [
      [130.81], null,    null,    [155.56], null,    null,    [123.47], null,
      [130.81], null,    [146.83], null,    null,    null,    null,    null,
      [155.56], null,    null,    [185.00], null,    null,    [146.83], null,
      [130.81], null,    null,    null,    [98.00],  null,    null,    null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
