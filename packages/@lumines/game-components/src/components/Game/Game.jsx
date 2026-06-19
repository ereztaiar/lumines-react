import React, { useState, useEffect } from "react";
import * as audioEngine from 'Util/audioEngine';
import { default as Classes } from "Skins/common.less";
import { default as GameClasses } from "./Game.less";
import useScore from "@lumines/game-components/src/hooks/useScore";
import useSkin from "@lumines/core/src/hooks/useSkin";
import GameProvider from "@lumines/game-components/src/contexts/GameProvider";
import GameContent from "@lumines/game-components/src/components/Game/GameContent";
import { AVATAR_IDS } from "@lumines/game-components/src/components/Character/avatars";
import { getGameSettings, saveGameSettings, normalizeSettings } from "Util/gameSettings";
import { getTickSpeed } from "Util/gameplaySpeed";
import { SKINS_BY_ID } from "Skins/index";

const Game = (props) => {
  const { mode = 'arcade' } = props;
  // settings are read once per game mount — menu and game never coexist
  const [{ reflection, avatarId, showSkinName }] = useState(() => {
    const s = normalizeSettings(getGameSettings(), AVATAR_IDS);
    return { reflection: s.reflection, avatarId: s.avatarId, showSkinName: s.showSkinName };
  });
  const [muted, setMuted] = useState(() => normalizeSettings(getGameSettings(), AVATAR_IDS).muted);
  const toggleMuted = () => setMuted((prev) => {
    const next = !prev;
    saveGameSettings({ ...getGameSettings(), muted: next });
    return next;
  });

  const [score, addOne, multiplier, highScore, deletedBlocks, deleted, resetScore, level, allClearBonus] =
    useScore(mode);

  const {
    skin,
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
    currentSkinId,
  } = useSkin({ score });

  const speed = getTickSpeed(skin);

  useEffect(() => {
    if (!muted && skin.sounds && skin.sounds.theme) {
      audioEngine.startTheme(skin.sounds.theme);
    } else {
      audioEngine.stopTheme();
    }
    return () => audioEngine.stopTheme();
  }, [currentSkinId, muted, skin.sounds]);

  return (
    <div className={Classes.root}>
      <BackgroundComponent />
      {showSkinName && (
        <span className={GameClasses.skinNameTag}>{SKINS_BY_ID[currentSkinId].label}</span>
      )}
      <div
        className={
          Classes.app +
          " " +
          Classes.container +
          " " +
          GameClasses.pauseContainer
        }
      >
        <GameProvider mode={mode} muted={muted} toggleMuted={toggleMuted} skinSounds={skin.sounds} speed={speed} scoring={{ addOne, multiplier, deletedBlocks, resetScore, allClearBonus }}>
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
