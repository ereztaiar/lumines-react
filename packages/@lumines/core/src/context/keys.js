import React, { useState, createContext, useContext, useEffect, useReducer } from 'react';
import Gamepad from 'react-gamepad'
import { BUTTON_TO_KEY, axisTransitions } from './gamepadMapping';

const KeysContext = createContext({});
const { Provider: KeysProvider } = KeysContext;

const keyReducer = (state, action) => {
    const { key, which } = action;
    return { key, which };
}

const Keys = props => {
    const {
        children
    } = props;

    const [state, dispatch] = useReducer(keyReducer, { key: null, which: null });

    const value = { state, dispatch };

    const keyDownHandler = ({ key, which }) => {
        dispatch({ key, which })
    };
    const keyUpHandler = ({ key, which }) => {
        dispatch({ key: null, which: null });
    };


    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);


        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);

        }
    }, []);

    // Gamepad buttons/sticks are dispatched as real keyboard events so they
    // flow through the same window keydown/keyup listeners as physical key
    // presses — both this context and useKey (used directly by the game
    // loop) pick them up for free, with no separate gamepad-handling path.
    const dispatchKeyEvent = (type, key) => {
        window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
    };

    const buttonDownHandler = (buttonName) => {
        const key = BUTTON_TO_KEY[buttonName];
        if (key) {
            dispatchKeyEvent('keydown', key);
        }
    };

    const buttonUpHandler = (buttonName) => {
        const key = BUTTON_TO_KEY[buttonName];
        if (key) {
            dispatchKeyEvent('keyup', key);
        }
    };

    const axisChangeHandler = (axisName, value, previousValue) => {
        axisTransitions(axisName, value, previousValue).forEach(({ type, key }) => {
            dispatchKeyEvent(type, key);
        });
    };

    return (
        <Gamepad
            onButtonDown={buttonDownHandler}
            onButtonUp={buttonUpHandler}
            onAxisChange={axisChangeHandler}
        >
            <KeysProvider value={value}>{children}</KeysProvider>
        </Gamepad>
    );

};

const useKeys = () => {

    const context = useContext(KeysContext);
    if (context === undefined) {
        throw new Error('useKey must be used within Keys provider');
    }
    return context;
}

export default Keys;

export { Keys, useKeys };