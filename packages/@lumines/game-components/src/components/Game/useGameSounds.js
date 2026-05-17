import useSound from "use-sound";
import * as sounds from "Assets/sounds";

const useGameSounds = () => {
  const [playRotate] = useSound(sounds.waterDrop);
  const [playDrop] = useSound(sounds.lazer2);
  const [playMove] = useSound(sounds.drip);
  return { playRotate, playDrop, playMove };
};

export { useGameSounds };
