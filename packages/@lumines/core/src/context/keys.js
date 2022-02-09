import React, { createContext, useContext, useEffect, useReducer } from 'react';

const KeysContext = createContext({});
const { Provider: KeysProvider } = KeysContext;

const keyReducer = (state, action) => {
    const { key, which } = action;

    switch (which) {
        case 65: {
            return { key, which };
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
    }, [])

    return (
        <KeysProvider value={value}>{children}</KeysProvider>
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