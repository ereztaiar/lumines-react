import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { useKeys, KEYS } from "@lumines/core";

const MenuContext = createContext({});
const { Provider: MenuProvider } = MenuContext;

const defaultState = {
    reflection: true,
    // controlles: 'N/A'
    menuOrder: ['play', 'setting', 'skin', 'github'],
    selected: null,
    menuLocked: null,// 3 states null, true, false
};

const menuReducer = (state, action) => {
    const { type } = action;

    const { selected } = state;

    if (selected !== null && type !== 'menu_exit') {
        return {
            ...state
        };
    }

    switch (type) {
        case 'menu_up': {
            const { menuOrder } = state;
            const lastItem = menuOrder.pop();
            menuOrder.unshift(lastItem);
            return {
                ...state,
                menuOrder
            }
        }
        case 'menu_down': {
            const { menuOrder } = state;
            const lastItem = menuOrder.shift();
            menuOrder.push(lastItem);
            return {
                ...state,
                menuOrder
            }
        }
        case 'selected': {
            const { menuOrder } = state;
            return {
                ...state,
                selected: menuOrder[0],
                menuLocked: true
            }
        }
        case 'menu_exit': {
            return {
                ...state,
                selected: null,
                menuLocked: false
            }
        }
        default: {
            return { ...defaultState };
        }

    }

}

const Menu = props => {
    const {
        children
    } = props;

    const [state, dispatch] = useReducer(menuReducer, defaultState);
    const { state: { key } } = useKeys();
    const value = { state, dispatch };

    useEffect(() => {
        switch (key) {
            case KEYS.ARROW_UP:
                dispatch({ type: 'menu_up' })
                break;
            case KEYS.ARROW_DOWN:
                dispatch({ type: 'menu_down' })
                break;
            case KEYS.ENTER: {
                dispatch({ type: 'selected' })
                break;
            }
            case KEYS.ESCAPE: {
                dispatch({ type: 'menu_exit' })
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