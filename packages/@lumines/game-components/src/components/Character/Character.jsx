import React from "react";
import { AVATARS_BY_ID } from "./avatars";
import effectsStyle from "./avatarEffects.less";
import getAvatarEffectClass from "./avatarEffects";

const Character = (props) => {
  const {
    styles: { characterStyle },
    avatarId,
  } = props;

  const { Icon } = AVATARS_BY_ID[avatarId] || AVATARS_BY_ID.react;

  return (
    <div className={characterStyle.character}>
      <span className={getAvatarEffectClass(effectsStyle, avatarId)}>
        <Icon />
      </span>
    </div>
  );
};

export default Character;
