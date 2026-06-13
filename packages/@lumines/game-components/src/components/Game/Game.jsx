import React, { useState } from "react";
import { default as Classes } from "Skins/common.less";
import { default as GameClasses } from "./Game.less";
import useScore from "@lumines/game-components/src/hooks/useScore";
import useSkin from "@lumines/core/src/hooks/useSkin";
import GameProvider from "@lumines/game-components/src/contexts/GameProvider";
import GameContent from "@lumines/game-components/src/components/Game/GameContent";
import { AVATAR_IDS } from "@lumines/game-components/src/components/Character/avatars";
import { getGameSettings, normalizeSettings } from "Util/gameSettings";

const Game = (props) => {
  const { mode = 'arcade' } = props;
  // settings are read once per game mount — menu and game never coexist
  const [{ reflection, avatarId, muted }] = useState(() => normalizeSettings(getGameSettings(), AVATAR_IDS));

  const [score, addOne, multiplier, highScore, deletedBlocks, deleted, resetScore, level] =
    useScore(mode);

  const {
    skin: {
      BackgroundComponent,
      dispenser: dispenserStyle,
      grid: gridStyle,
      score: scoreStyle,
      character: characterStyle,
      swiper: swiperStyle,
      reflection: reflectionStyle,
      paths,
    },
  } = useSkin({ score });

  return (
    <div className={Classes.root}>
      <BackgroundComponent />
      <div
        className={
          Classes.app +
          " " +
          Classes.container +
          " " +
          GameClasses.pauseContainer
        }
      >
        <GameProvider mode={mode} muted={muted} scoring={{ addOne, multiplier, deletedBlocks, resetScore }}>
          <GameContent
            mode={mode}
            reflection={reflection}
            avatarId={avatarId}
            scoreStyle={scoreStyle}
            gridStyle={gridStyle}
            swiperStyle={swiperStyle}
            reflectionStyle={reflectionStyle}
            paths={paths}
            dispenserStyle={dispenserStyle}
            characterStyle={characterStyle}
            score={score}
            highScore={highScore}
            deleted={deleted}
            level={level}
          />
        </GameProvider>
      </div>
    </div>
  );
};

export default Game;
