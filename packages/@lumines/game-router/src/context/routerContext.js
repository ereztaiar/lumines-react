import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { useKeys, KEYS, CODES } from "@lumines/core";
import { gameFlow, defaultState } from './gameFlow';

const RouterContext = createContext({});
const { Provider: RouterProvider } = RouterContext;

const Router = props => {
    const {
        children
    } = props;

    const [state, dispatch] = useReducer(gameFlow, defaultState);

    const value = { state, dispatch };

    const { state: { key, which } } = useKeys();

    useEffect(() => {
        if (state.isSplash && key === KEYS.SPACE) {
            dispatch({ type: 'menu' });
        } else if (which === CODES.RESET) {
            dispatch({ type: 'reset' });
        }
    }, [key]);


    return (
        <RouterProvider value={value}>{children}</RouterProvider>
    );

};

const useRouter = () => {

    const context = useContext(RouterContext);
    if (context === undefined) {
        throw new Error('useRouter must be used within Router provider');
    }
    return context;
}

export default Router;

export { Router, useRouter };