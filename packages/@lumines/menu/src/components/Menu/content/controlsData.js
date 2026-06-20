const CONTROL_TABS = [
    { id: 'keyboard', label: 'KEYBOARD' },
    { id: 'gamepad', label: 'GAMEPAD' },
];

const CONTROLS_BY_TAB = {
    keyboard: [
        { action: 'Move', input: '← →' },
        { action: 'Rotate', input: '↑ / Space' },
        { action: 'Hard Drop', input: '↓' },
        { action: 'Pause', input: 'Esc / P' },
        { action: 'Confirm', input: 'Enter / Space' },
        { action: 'Back', input: 'Esc' },
        { action: 'Next Skin', input: 'S' },
    ],
    gamepad: [
        { action: 'Move', input: 'D-Pad / Left Stick ← →' },
        { action: 'Rotate', input: 'D-Pad / Left Stick ↑' },
        { action: 'Hard Drop', input: 'D-Pad / Left Stick ↓' },
        { action: 'Confirm', input: 'A / Start' },
        { action: 'Back / Pause', input: 'B / Back' },
    ],
};

const getControlRows = (tabId) => CONTROLS_BY_TAB[tabId] || [];

export { CONTROL_TABS, getControlRows };
