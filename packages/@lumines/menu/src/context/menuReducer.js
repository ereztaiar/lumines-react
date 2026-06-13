import { MENU_ITEMS, MENU_LENGTH } from '../config/menuConfig';

const defaultState = {
    highlightIndex: 0,
    selected: null,
    menuLocked: null, // 3 states: null (pristine), true (expanded), false (collapsing)
};

const menuReducer = (state, action) => {
    const { type } = action;
    const { selected, highlightIndex } = state;

    if (selected !== null && type !== 'menu_exit' && type !== 'menu_reset') {
        return state;
    }

    switch (type) {
        case 'menu_up': {
            return {
                ...state,
                highlightIndex: (highlightIndex + MENU_LENGTH - 1) % MENU_LENGTH,
            };
        }
        case 'menu_down': {
            return {
                ...state,
                highlightIndex: (highlightIndex + 1) % MENU_LENGTH,
            };
        }
        case 'selected': {
            return {
                ...state,
                selected: MENU_ITEMS[highlightIndex].name,
                menuLocked: true,
            };
        }
        case 'menu_reset': {
            return { ...defaultState };
        }
        case 'menu_exit': {
            if (selected === null) {
                return state;
            }
            return {
                ...state,
                selected: null,
                menuLocked: false,
            };
        }
        default: {
            return { ...defaultState };
        }
    }
};

export { menuReducer, defaultState };
