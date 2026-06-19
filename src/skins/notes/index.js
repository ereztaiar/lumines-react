import { default as background }         from 'Skins/notes/background.less';
import { default as character }           from 'Skins/notes/character.less';
import { default as dispenser }           from 'Skins/notes/dispenser.less';
import { default as grid }                from 'Skins/notes/grid.less';
import { default as score }               from 'Skins/notes/score.less';
import { default as swiper }              from 'Skins/notes/swiper.less';
import { default as BackgroundComponent } from 'Skins/notes/Background.jsx';
import * as paths                         from 'Skins/notes/paths';
import { default as reflection }          from 'Skins/reflection.less';

// I–IV–V–I progression in C major — each action is a distinct chord that
// harmonizes with the others, creating a miniature musical phrase during play.
const sounds = {
  synth: { type: 'triangle', volume: 0.14 },
  // C major — the tonic "home" chord
  moveLeft:  { notes: [261.63, 329.63, 392.00], duration: 0.35 },
  // F major — subdominant, a step away
  moveRight: { notes: [349.23, 440.00, 523.25], duration: 0.35 },
  // G major — dominant, adds tension
  rotate:    { notes: [392.00, 493.88, 587.33], duration: 0.45 },
  // G major drop — quick, percussive
  drop:      { notes: [392.00, 293.66], duration: 0.18 },
  // C major 7th — tonic with colour, satisfying resolution
  deletion:  { notes: [261.63, 329.63, 392.00, 493.88], duration: 0.90 },
  theme: {
    tempo: 120,
    type: 'triangle',
    volume: 0.05,
    noteDuration: 0.22,
    // I (Cmaj7) arpeggio up/down → vi (Am) arpeggio → IV (F) arpeggio → V (G) arpeggio
    sequence: [
      // Cmaj7 up
      [261.63], [329.63], [392.00], [493.88],
      // Cmaj7 down
      [523.25], [493.88], [392.00], [329.63],
      // Am up
      [220.00], [261.63], [329.63], [440.00],
      // Am down + rest
      [329.63], [261.63], [220.00], null,
      // F major up
      [174.61], [220.00], [261.63], [349.23],
      // F major down
      [440.00], [349.23], [261.63], [220.00],
      // G major up
      [196.00], [246.94], [293.66], [392.00],
      // G major down + rest
      [293.66], [246.94], [196.00], null,
    ],
  },
};

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds };
