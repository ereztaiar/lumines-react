import React, { lazy, Suspense, useEffect, useReducer } from 'react';
import Splash from "@lumines/splash";
import { default as RouterProvider, useRouter } from "@lumines/game-router/src/context/routerContext";

const Menu = lazy(() => import("@lumines/menu"));
const Game = lazy(() => import("@lumines/game-components/src/components/Game/Game"));


const Router = props => {

    const { children } = props;

    const { state } = useRouter();

    let screen = <></>;

    if (state.isSplash) {
        screen = <Splash />;
    }

    if (state.isMenu) {
        screen = <Menu />
    }

    if (state.isGame) {
        screen = <Game mode={state.mode} />
    }


    return (
        <Suspense fallback={<div>Loading...</div>}>
            {screen}
        </Suspense>
    );
}

export default Router;