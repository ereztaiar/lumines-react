import React, { useState, createContext, useContext, useEffect, useReducer } from 'react';
import Gamepad from 'react-gamepad'

const KeysContext = createContext({});
const { Provider: KeysProvider } = KeysContext;

const keyReducer = (state, action) => {
    const { key, which } = action;

    switch (which) {
        case 65: {
            return { key, which };
        }
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

    const connectHandler = (gamepadIndex) => {
        //console.log(`Gamepad ${gamepadIndex} connected !`)
    }

    const disconnectHandler = (gamepadIndex) => {
        //console.log(`Gamepad ${gamepadIndex} disconnected !`)
    }

    const buttonChangeHandler = (buttonName, down) => {
        //console.log(buttonName, down)
    }

    const buttonDownHandler = (buttonName) => {
        dispatch({ key: buttonName, which: buttonName })
    }

    const buttonUpHandler = (buttonName) => {
        dispatch({ key: null, which: null })
    }

    const axisChangeHandler = (axisName, value, previousValue) => {
        //console.log(axisName, value)
    }

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