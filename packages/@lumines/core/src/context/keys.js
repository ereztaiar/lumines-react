import React, { createContext, useContext } from 'react';

const KeysContext = createContext({});
const { Provider: KeysProvider } = KeysContext;
const Keys = props => {
    const {
        children
    } = props;



    return (
        <KeysProvider>{children}</KeysProvider>
    );

};

const useKeys = () => {

    const context = useContext(KeysContext);
    if (context === undefined) {
        throw new Error('useKey must be used within Keys provider');
    }
    return context;
}

export default keys;

export { Keys, useKeys };