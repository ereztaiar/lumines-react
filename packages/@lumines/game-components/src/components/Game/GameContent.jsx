import React from "react";
import { useGame } from "@lumines/game-components/src/contexts";
import Dispenser from "@lumines/game-components/src/components/Dispenser/Dispenser";
import { Grid } from "@lumines/game-components/src/components/Board";
import Reflection from "@lumines/game-components/src/components/Reflection/Reflection";
import Score from "@lumines/game-components/src/components/Score/Score";
import Character from "@lumines/game-components/src/components/Character/Character";
import Pause from "@lumines/game-components/src/components/Game/Pause";
import GameOver from "@lumines/game-components/src/components/Game/GameOver";

const GameContent = (props) => {
  const {
    reflection,
    scoreStyle,
    gridStyle,
    swiperStyle,
    reflectionStyle,
    paths,
    dispenserStyle,
    characterStyle,
    score,
    highScore,
    deleted,
    level,
  } = props;
  const {
    setCurrentCube,
    grid,
    currentCube,
    newCube,
    setNewCube,
    tick,
    currentDeleted,
    pause,
    isGameOver,
  } = useGame();

  return (
    <>
      <Score
        score={score}
        highScore={highScore}
        deleted={deleted}
        level={level}
        pause={pause}
        styles={{ scoreStyle }}
      />
      <Grid
        grid={grid}
        currentCube={currentCube}
        tick={tick}
        deleted={currentDeleted}
        styles={{ gridStyle, swiperStyle }}
        paths={paths}
      />
      {reflection && (
        <Reflection styles={{ reflectionStyle }}>
          <Grid
            currentCube={currentCube}
            grid={grid}
            tick={tick}
            rowStart={8}
            showSwiper={false}
            styles={{ gridStyle }}
            paths={paths}
          />
        </Reflection>
      )}
      <Dispenser
        setCurrentCube={setCurrentCube}
        newCube={newCube}
        setNewCube={setNewCube}
        styles={{ dispenserStyle, gridStyle }}
        paths={paths}
      />
      <Character styles={{ characterStyle }} />
      <Pause pause={pause} />
      <GameOver isGameOver={isGameOver} />
    </>
  );
};

export default GameContent;
