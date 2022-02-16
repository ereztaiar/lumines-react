import React from 'react';
import { default as Classes } from 'Skins/common.less';
import Dispenser from "@lumines/game-components/src/components/Dispenser/Dispenser";
import { Grid } from "@lumines/game-components/src/components/Board";
import GameView from "@lumines/game-components/src/components/Game/GameView";
import Reflection from "@lumines/game-components/src/components/Reflection/Reflection";
import Score from "@lumines/game-components/src/components/Score/Score";
import useScore from "@lumines/game-components/src/hooks/useScore";
import Character from "@lumines/game-components/src/components/Charecter/Charecter";
import useSkin from "@lumines/core/src/hooks/useSkin";



const Game = () => {


    const reflection = true;

    const [
        score,
        addOne,
        multiplier,
        highScore,
        deletedBlocks,
        deleted
    ] = useScore();

    const {
        skin: {
            BackgroundComponent,
            dispenser: dispenserStyle,
            grid: gridStyle,
            score: scoreStyle,
            character: characterStyle,
            swiper: swiperStyle,
            reflection: reflectionStyle,
            paths
        }
    } = useSkin(score);



    return (
        <div className={Classes.root}>

            <BackgroundComponent />
            <div className={Classes.app + ' ' + Classes.container}>
                <GameView scoring={{ addOne, multiplier, deletedBlocks }}>
                    {({ setCurrentCube, grid, currentCube, newCube, setNewCube, tick, currentDeleted }) => (
                        <>
                            <Score
                                score={score}
                                highScore={highScore}
                                deleted={deleted}
                                styles={
                                    {
                                        scoreStyle
                                    }
                                }
                            />
                            <Grid
                                grid={grid}
                                tick={tick}
                                deleted={currentDeleted}
                                styles={
                                    {
                                        gridStyle,
                                        swiperStyle
                                    }
                                }
                                paths={paths}
                            />
                            {reflection && <Reflection
                                styles={
                                    {
                                        reflectionStyle
                                    }
                                }
                            >
                                <Grid
                                    currentCube={currentCube}
                                    grid={grid}
                                    tick={tick}
                                    rowStart={8}
                                    showSwiper={false}
                                    styles={
                                        {
                                            gridStyle
                                        }
                                    }
                                    paths={paths}
                                />
                            </Reflection>}
                            <Dispenser
                                setCurrentCube={setCurrentCube}
                                newCube={newCube}
                                setNewCube={setNewCube}
                                styles={
                                    {
                                        dispenserStyle,
                                        gridStyle
                                    }
                                }
                                paths={paths}
                            />
                            <Character
                                styles={
                                    {
                                        characterStyle
                                    }
                                }
                            />
                        </>
                    )}
                </GameView>
            </div>

        </div>
    );
};

export default Game;