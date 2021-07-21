import React, {useEffect} from 'react';
import Context from './context.js';
import Store from './store.js';
import {default as Classes} from 'Skins/common.less';
import Dispenser from "Components/Dispenser";
import {Grid} from "Components/Board";
import GameView from "Components/GameView";
import Reflection from "Components/Reflection";
import {Score, useScore} from "Components/Score";
import Character from "Components/Charecter";
import useSkin from "Hooks/useSkin";

const App = () => {
    const store = Store();
    const reflection = false;
    const [score, addOne, multiplier, highScore, deletedBlocks, deleted] = useScore();

    const {skin: {BackgroundComponent}} = useSkin();

    useEffect(() =>{

    },[BackgroundComponent])

    return (
        <div className={Classes.root}>
            <Context.Provider value={store}>
                <BackgroundComponent/>
                <div className={Classes.app + ' ' + Classes.container}>
                    <GameView scoring={{addOne, multiplier, deletedBlocks}}>
                        {({setCurrentCube, grid, currentCube, newCube, setNewCube, tick, currentDeleted}) => (
                            <>
                                <Score score={score} highScore={highScore} deleted={deleted}/>
                                <Grid grid={grid} tick={tick} deleted={currentDeleted}/>
                                {reflection && <Reflection>
                                    <Grid currentCube={currentCube} grid={grid} rowStart={8} showSwiper={false}/>
                                </Reflection>}
                                <Dispenser setCurrentCube={setCurrentCube} newCube={newCube} setNewCube={setNewCube}/>
                                <Character/>
                            </>
                        )}
                    </GameView>
                </div>
            </Context.Provider>
        </div>
    );
};

export default App;