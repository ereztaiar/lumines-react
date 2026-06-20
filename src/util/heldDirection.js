const initialHeldDirection = () => ({ left: false, right: false, active: null });

const pressDirection = (state, direction) => ({ ...state, [direction]: true, active: direction });

const releaseDirection = (state, direction) => {
    const next = { ...state, [direction]: false };
    if (state.active === direction) {
        next.active = next.left ? 'left' : next.right ? 'right' : null;
    }
    return next;
};

export { initialHeldDirection, pressDirection, releaseDirection };
