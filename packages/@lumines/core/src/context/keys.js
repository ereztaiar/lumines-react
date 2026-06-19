import React, { useState, createContext, useContext, useEffect, useReducer } from 'react';
import Gamepad from 'react-gamepad'

const KeysContext = createContext({});
const { Provider: KeysProvider } = KeysContext;

const keyReducer = (state, action) => {
    const { key, which } = action;

    switch (which) {
        case 'Start': {
            return { key: ' ', which: null }
        }
        default: {
            return { key, which };
        }

    }

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

    // Gamepad handler placeholders — wired to <Gamepad> props for future controller support
    const connectHandler = (gamepadIndex) => {}
    const disconnectHandler = (gamepadIndex) => {}
    const buttonChangeHandler = (buttonName, down) => {}

    const buttonDownHandler = (buttonName) => {
        dispatch({ key: buttonName, which: buttonName })
    }

    const buttonUpHandler = (buttonName) => {
        dispatch({ key: null, which: null })
    }

    const axisChangeHandler = (axisName, value, previousValue) => {}

    return (
        <Gamepad
            onConnect={connectHandler}
            onDisconnect={disconnectHandler}

            onButtonChange={buttonChangeHandler}
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