import React from 'react';
import Context from './context.js';
import Store from './store.js';
import main from './styles/main.less';
import Background from "./components/Background";
import Dispenser from "./components/Dispenser";
import {Grid} from "./components/Board";
import GameView from "./components/GameView";
import Reflection from "./components/Reflection";
import {Score, useScore} from "./components/Score";
import Character from "./components/Charecter";

const App = () => {
    const store = Store();
    const reflection = false;
    const [score, addOne, multiplier, highScore, deletedBlocks,deleted] = useScore();

    return (
        <Context.Provider value={store}>
            <Background/>
            <div className="app container">
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
    );
};

export default App;