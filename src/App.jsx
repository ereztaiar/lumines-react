import React from 'react';
import { default as Classes } from 'Skins/common.less';
import Dispenser from "Components/Dispenser";
import { Grid } from "Components/Board";
import GameView from "Components/GameView";
import Reflection from "Components/Reflection";
import { Score, useScore } from "Components/Score";
import Character from "Components/Charecter";
import useSkin from "Hooks/useSkin";


import Keys from "@lumines/core";
import Menu from "@lumines/menu/src/context/menu";

import Router from "@lumines/game-router";


const App = () => {


    return (
        <Keys>
            <Menu>
                <Router />
            </Menu>
        </Keys>
    );

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

export default App;