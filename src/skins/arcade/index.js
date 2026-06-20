import {default as background}        from 'Skins/arcade/background.less';
import {default as character}          from 'Skins/arcade/character.less';
import {default as dispenser}          from 'Skins/arcade/dispenser.less';
import {default as grid}               from 'Skins/arcade/grid.less';
import {default as score}              from 'Skins/arcade/score.less';
import {default as swiper}             from 'Skins/arcade/swiper.less';
import {default as BackgroundComponent} from 'Skins/arcade/Background.jsx';
import * as paths                      from 'Skins/arcade/paths';
import {default as reflection}         from 'Skins/reflection.less';

// 8-bit chiptune — square oscillator for that classic console blip/bleep timbre.
const sounds = {
  synth: { type: 'square', volume: 0.10 },
  moveLeft:  { notes: [523.25, 659.25],                 duration: 0.08 }, // quick blip up
  moveRight: { notes: [659.25, 783.99],                 duration: 0.08 }, // quick blip higher
  rotate:    { notes: [783.99, 987.77, 1046.50],        duration: 0.12 }, // rising rotate trill
  drop:      { notes: [1046.50, 523.25],                duration: 0.07 }, // sharp drop blip
  deletion:  { notes: [523.25, 659.25, 783.99, 1046.50], duration: 0.55 }, // level-clear jingle fragment
  theme: {
    tempo: 160, type: 'square', volume: 0.045, noteDuration: 0.105,
    sequence: [
      [523.25], null,    [523.25], null,    [659.25], null,    [783.99], null,
      [659.25], null,    [523.25], null,    [392.00], null,    null,     null,
      [440.00], null,    [440.00], null,    [523.25], null,    [659.25], null,
      [523.25], null,    [440.00], null,    [392.00], null,    null,     null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds }
