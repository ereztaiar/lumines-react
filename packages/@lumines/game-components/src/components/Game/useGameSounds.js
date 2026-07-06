import * as audioEngine from 'Util/audioEngine';

const noop = () => {};

const useGameSounds = (skinSounds, muted) => {
  if (muted) {
    return {
      playMoveLeft: noop,
      playMoveRight: noop,
      playRotate: noop,
      playDrop: noop,
      playDeletion: noop,
      playAllClear: noop,
    };
  }

  const sounds = skinSounds || audioEngine.DEFAULT_SOUNDS;
  const synth = sounds.synth || { type: 'triangle', volume: 0.12 };

  const makePlay = (soundConfig) => () => {
    if (!soundConfig) return;
    audioEngine.playChord(soundConfig.notes, {
      type: synth.type,
      duration: soundConfig.duration,
      volume: synth.volume,
    });
  };

  // Clear sound grows with the chain: each level adds an octave-doubled chord
  // tone and a touch of volume, so consecutive clears audibly build.
  const playDeletion = (chain = 1) => {
    if (!sounds.deletion) return;
    audioEngine.playChord(audioEngine.chainNotes(sounds.deletion.notes, chain), {
      type: synth.type,
      duration: sounds.deletion.duration,
      volume: Math.min(synth.volume * (1 + 0.08 * (chain - 1)), synth.volume * 1.4),
      reverb: 0.25,
    });
  };

  // All-clear fanfare: the skin's deletion chord an octave up, long and washed
  // in reverb — distinct from a normal clear without needing per-skin config.
  const playAllClear = () => {
    if (!sounds.deletion) return;
    audioEngine.playChord(sounds.deletion.notes.map((freq) => freq * 2), {
      type: synth.type,
      duration: Math.max(sounds.deletion.duration * 1.5, 1.2),
      volume: synth.volume * 1.2,
      reverb: 0.5,
    });
  };

  return {
    playMoveLeft:  makePlay(sounds.moveLeft),
    playMoveRight: makePlay(sounds.moveRight),
    playRotate:    makePlay(sounds.rotate),
    playDrop:      makePlay(sounds.drop),
    playDeletion,
    playAllClear,
  };
};

export { useGameSounds };
