import React from "react";
import { default as Classes } from "Skins/common.less";
import { default as GameClasses } from "./Game.less";
import useScore from "@lumines/game-components/src/hooks/useScore";
import useSkin from "@lumines/core/src/hooks/useSkin";
import GameProvider from "@lumines/game-components/src/contexts/GameProvider";
import GameContent from "@lumines/game-components/src/components/Game/GameContent";

const Game = () => {
  const reflection = true;

  const [score, addOne, multiplier, highScore, deletedBlocks, deleted] =
    useScore();

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
        <GameProvider scoring={{ addOne, multiplier, deletedBlocks }}>
          <GameContent
            reflection={reflection}
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
          />
        </GameProvider>
      </div>
    </div>
  );
};

export default Game;
