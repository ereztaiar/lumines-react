const defaultState = {
    isSplash: true,
    isMenu: false,
    isGame: false,
    mode: 'arcade'
};

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
                isMenu: true,
                isGame: false
            }
        }
        case 'start_game': {
            return {
                ...prevState,
                isSplash: false,
                isMenu: false,
                isGame: true,
                mode: action.mode || prevState.mode
            }
        }
        default: {
            return prevState;
        }
    }
};

export { gameFlow, defaultState };
