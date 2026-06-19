import * as audioEngine from 'Util/audioEngine';

const noop = () => {};

const useGameSounds = (skinSounds, muted) => {
  if (muted) {
    return { playMoveLeft: noop, playMoveRight: noop, playRotate: noop, playDrop: noop, playDeletion: noop };
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

  return {
    playMoveLeft:  makePlay(sounds.moveLeft),
    playMoveRight: makePlay(sounds.moveRight),
    playRotate:    makePlay(sounds.rotate),
    playDrop:      makePlay(sounds.drop),
    playDeletion:  makePlay(sounds.deletion),
  };
};

export { useGameSounds };
