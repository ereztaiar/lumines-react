import {default as background}        from 'Skins/pirate/background.less';
import {default as character}          from 'Skins/pirate/character.less';
import {default as dispenser}          from 'Skins/pirate/dispenser.less';
import {default as grid}               from 'Skins/pirate/grid.less';
import {default as score}              from 'Skins/pirate/score.less';
import {default as swiper}             from 'Skins/pirate/swiper.less';
import {default as BackgroundComponent} from 'Skins/pirate/Background.jsx';
import * as paths                      from 'Skins/pirate/paths';
import {default as reflection}         from 'Skins/reflection.less';

// D minor jig — sawtooth for a hurdy-gurdy/concertina edge, swashbuckling and adventurous.
const sounds = {
  synth: { type: 'sawtooth', volume: 0.12 },
  moveLeft:  { notes: [293.66, 349.23, 440.00],         duration: 0.22 }, // D minor — quick step
  moveRight: { notes: [349.23, 415.30, 523.25],         duration: 0.22 }, // F major lift
  rotate:    { notes: [392.00, 466.16, 587.33],         duration: 0.30 }, // G minor swing
  drop:      { notes: [220.00, 146.83],                 duration: 0.16 }, // anchor drop — low thud
  deletion:  { notes: [293.66, 349.23, 440.00, 587.33], duration: 0.95 }, // Dm7 — treasure found!
  theme: {
    tempo: 118, type: 'sawtooth', volume: 0.05, noteDuration: 0.20,
    sequence: [
      [293.66], null,    [349.23], [392.00], [440.00], null,    [349.23], null,
      [293.66], null,    null,     null,     [261.63], null,    [293.66], null,
      [349.23], null,    [415.30], [466.16], [523.25], null,    [415.30], null,
      [349.23], null,    [293.66], null,     [261.63], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
