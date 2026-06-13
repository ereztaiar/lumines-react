import React from "react";
import { AVATARS_BY_ID } from "./avatars";

const Character = (props) => {
  const {
    styles: { characterStyle },
    avatarId,
  } = props;

  const { Icon } = AVATARS_BY_ID[avatarId] || AVATARS_BY_ID.react;

  return (
    <div className={characterStyle.character}>
      <Icon />
    </div>
  );
};

export default Character;
