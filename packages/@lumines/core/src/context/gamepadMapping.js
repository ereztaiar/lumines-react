// react-gamepad's default XBOX layout follows the W3C Standard Gamepad button
// order, so Xbox and PS4 controllers (browser-remapped to that standard) and a
// Steam Deck with Steam Input set to emulate a gamepad all line up with it.
const BUTTON_TO_KEY = {
    A: ' ',
    X: ' ',
    Start: ' ',
    B: 'Escape',
    Back: 'Escape',
    DPadUp: 'ArrowUp',
    DPadDown: 'ArrowDown',
    DPadLeft: 'ArrowLeft',
    DPadRight: 'ArrowRight',
};

const STICK_THRESHOLD = 0.5;

// react-gamepad inverts LeftStickY, so positive == stick pushed up.
const AXIS_KEYS = {
    LeftStickX: { positive: 'ArrowRight', negative: 'ArrowLeft' },
    LeftStickY: { positive: 'ArrowUp', negative: 'ArrowDown' },
};

// Left stick has no discrete press/release like a button — a key only
// "exists" while the stick is held past the threshold, so each render of an
// axis value must be diffed against its previous value to synthesize the
// keydown/keyup edge that crossing the threshold represents.
const axisTransitions = (axisName, value, previousValue, threshold = STICK_THRESHOLD) => {
    const keys = AXIS_KEYS[axisName];
    if (!keys) {
        return [];
    }

    const events = [];
    if (previousValue <= threshold && value > threshold) {
        events.push({ type: 'keydown', key: keys.positive });
    }
    if (previousValue > threshold && value <= threshold) {
        events.push({ type: 'keyup', key: keys.positive });
    }
    if (previousValue >= -threshold && value < -threshold) {
        events.push({ type: 'keydown', key: keys.negative });
    }
    if (previousValue < -threshold && value >= -threshold) {
        events.push({ type: 'keyup', key: keys.negative });
    }
    return events;
};

export { BUTTON_TO_KEY, STICK_THRESHOLD, axisTransitions };
