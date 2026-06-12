import React, { useEffect, createContext, useContext, useReducer, useRef } from 'react';
import { useKeys, KEYS } from "@lumines/core";

import { useRouter } from "@lumines/game-router/src/context/routerContext";
import { menuReducer, defaultState } from "@lumines/menu/src/context/menuReducer";

const MenuContext = createContext({});
const { Provider: MenuProvider } = MenuContext;

const MENU_TIMEOUT = 600000;

const Menu = props => {
    const {
        children
    } = props;

    const [state, dispatch] = useReducer(menuReducer, defaultState);
    const { state: { key } } = useKeys();
    const { state: { isMenu }, dispatch: routerDispatch } = useRouter();
    const idleTimerRef = useRef(null);
    const value = { state, dispatch };

    useEffect(() => {
        if (!isMenu) {
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
                idleTimerRef.current = null;
            }
            dispatch({ type: 'menu_reset' });
            return;
        }

        idleTimerRef.current = setTimeout(() => {
            routerDispatch({ type: 'reset' });
        }, MENU_TIMEOUT);

        return () => {
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
                idleTimerRef.current = null;
            }
        };
    }, [isMenu, routerDispatch]);

    useEffect(() => {
        if (!isMenu) {
            return;
        }

        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = setTimeout(() => {
            routerDispatch({ type: 'reset' });
        }, 60000);

        switch (key) {
            case KEYS.ARROW_UP:
                dispatch({ type: 'menu_up' })
                break;
            case KEYS.ARROW_DOWN:
                dispatch({ type: 'menu_down' })
                break;
            case KEYS.ENTER:
            case KEYS.SPACE: {
                dispatch({ type: 'selected' })
                break;
            }
            case KEYS.ESCAPE: {
                dispatch({ type: 'menu_exit' });
                break;
            }
            default:
                break;
        }
    }, [key]);


    return (
        <MenuProvider value={value}>{children}</MenuProvider>
    );

};

const useMenu = () => {

    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within Menu provider');
    }
    return context;
}

export default Menu;

export { Menu, useMenu };