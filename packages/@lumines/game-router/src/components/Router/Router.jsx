import React, { useEffect, useReducer } from 'react';
import Splash from "@lumines/splash";
import Menu, { useMenu } from "@lumines/menu";
import { useKeys, KEYS, CODES } from "@lumines/core";


const gameFlow = (prevState, action) => {
    const { type } = action;
    switch (type) {
        case 'reset': {
            return { ...defaultState }
        }
        case 'menu': {
            return {
                ...prevState,
                isSplash: false,
                isMenu: true
            }
        }
        default: {
            return prevState;
        }
    }
};

const defaultState = {
    isSplash: true,
    isMenu: false
};

const Router = props => {

    const { children } = props;



    const [state, dispatch] = useReducer(gameFlow, defaultState);

    const { state: { key, which } } = useKeys();

    useEffect(() => {
        if (state.isSplash && key === KEYS.SPACE) {
            dispatch({ type: 'menu' });
        } else if (which === CODES.RESET) {
            dispatch({ type: 'reset' });
        }
    }, [key]);

    if (state.isSplash) {
        return <Splash />;
    }

    if (state.isMenu) {
        return <Menu/>
    }


    return (
        <>no splash</>
    );
}

export default Router;