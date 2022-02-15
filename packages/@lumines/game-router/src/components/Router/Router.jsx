import React, { useEffect, useReducer } from 'react';
import Splash from "@lumines/splash";
import Menu, { useMenu } from "@lumines/menu";

import { default as RouterProvider, useRouter } from "@lumines/game-router/src/context/routerContext";



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


    return (
        screen
    );
}

export default Router;