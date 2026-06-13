import useSound from "use-sound";
import * as sounds from "Assets/sounds";

const useGameSounds = (muted) => {
  const options = { soundEnabled: !muted };
  const [playRotate] = useSound(sounds.waterDrop, options);
  const [playDrop] = useSound(sounds.lazer2, options);
  const [playMove] = useSound(sounds.drip, options);
  return { playRotate, playDrop, playMove };
};

export { useGameSounds };
