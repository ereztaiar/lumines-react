import React from 'react';
import Keys from "@lumines/core";
import Menu from "@lumines/menu/src/context/menu";
import Router from "@lumines/game-router";
import { default as RouterProvider } from "@lumines/game-router/src/context/routerContext";
import { default as Classes } from 'Skins/common.less';


const App = () => {


    return (
        <Keys>
            <RouterProvider>
                <Menu>
                    <Router />
                </Menu>
            </RouterProvider>
        </Keys>
    );

};

export default App;