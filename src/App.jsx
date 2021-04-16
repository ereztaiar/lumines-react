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

// import("./wasm/adder.wasm").then(
//     module => {
//         let array = new Int32Array(2);
//         let arrayb = new Int32Array(2);
//         array[0] = 4;
//         array[1] = 5;
//         arrayb[0] = 9;
//         arrayb[1] = 9;
//         let heap = module.malloc(array.length * array.BYTES_PER_ELEMENT);
//         let heap2 = module.malloc(arrayb.length * array.BYTES_PER_ELEMENT);
//
//         let HEAP16 = new Int32Array(2);
//         HEAP16.set(array, heap)
//         console.log(module.arraySum(heap, heap2))
//     }
// );


fetch("./wasm/adder.wasm").then(response => {
    return response.arrayBuffer()
}).then(buffer => {
    window.imports = {};
    window.module = module;
    imports.env = imports.env || {};
    imports.env.memoryBase = imports.env.memoryBase || 0;
    imports.env.tableBase = imports.env.tableBase || 0;
    if (!imports.env.memory) {
        imports.env.memory = new WebAssembly.Memory({
            initial: 256
        });
    }
    if (!imports.env.table) {
        imports.env.table = new WebAssembly.Table({
            initial: 0,
            element: 'anyfunc'
        });
    }

    imports.env.emscripten_notify_memory_growth = (...args) =>{
        console.log(args)
    };

    return  WebAssembly.instantiate(buffer, imports)
}).then(
    instance => {

        var exports = instance.instance.exports; // the exports of that instance
        var adder = exports.adder; // the "doubler" function (note "_" prefix)
        console.log(adder(8, 8))
        let array = new Int32Array(2);
        let arrayb = new Int32Array(2);
        let heap = exports.malloc(array.length * array.BYTES_PER_ELEMENT);
        let heap2 = exports.malloc(arrayb.length * arrayb.BYTES_PER_ELEMENT);

        array[0] =8;
        array.set(array, instance.instance.exports.memory.buffer)
        let HEAP16 = new Int32Array(2);
        HEAP16.set(array, instance.instance.exports.memory.buffer)
        console.log(exports.arraySum(array, array))
    }
)



const App = () => {
    const store = Store();
    const reflection = false;
    const [score, addOne, multiplier, highScore, deletedBlocks, deleted] = useScore();

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