import { nextIndex, prevIndex } from './playFocus';

const MODES = [
    { id: 'sequence', label: 'SEQUENCE' },
    { id: 'single', label: 'SINGLE' },
    { id: 'shuffle', label: 'SHUFFLE' },
];

const ROW_MODES = 'modes';
const ROW_SKINS = 'skins';

// settings must already be normalized; skinIds/unlockedIds are captured
// when the panel opens and stay static while it is up
const initPanelState = ({ settings, skinIds, unlockedIds }) => ({
    row: ROW_MODES,
    modeIndex: Math.max(0, MODES.findIndex((mode) => mode.id === settings.mode)),
    skinFocusIndex: 0,
    settings,
    skinIds,
    unlockedIds,
});

const toggleEnabled = (settings, skinIds, id) => {
    const enabled = settings.enabledSkinIds;
    if (enabled.includes(id)) {
        if (enabled.length === 1) return settings; // never empty the rotation
        return { ...settings, enabledSkinIds: enabled.filter((skinId) => skinId !== id) };
    }
    // keep registry order so the stored list stays stable
    return { ...settings, enabledSkinIds: skinIds.filter((skinId) => skinId === id || enabled.includes(skinId)) };
};

const activate = (state) => {
    const { row, modeIndex, skinFocusIndex, settings, skinIds, unlockedIds } = state;

    if (row === ROW_MODES) {
        return { ...state, settings: { ...settings, mode: MODES[modeIndex].id } };
    }

    const id = skinIds[skinFocusIndex];
    if (!unlockedIds.includes(id)) {
        return state;
    }

    switch (settings.mode) {
        case 'single':
            return { ...state, settings: { ...settings, selectedSkinId: id } };
        case 'shuffle':
            return { ...state, settings: toggleEnabled(settings, skinIds, id) };
        default:
            return state; // sequence: the list is informational
    }
};

// when every unlocked skin is enabled, persist [] ("all") so skins unlocked
// later join the rotation automatically until the user customizes the subset
const settingsForStorage = (state) => {
    const { settings, skinIds, unlockedIds } = state;
    const playable = skinIds.filter((id) => unlockedIds.includes(id));
    const allEnabled = playable.every((id) => settings.enabledSkinIds.includes(id));
    return allEnabled ? { ...settings, enabledSkinIds: [] } : settings;
};

const skinPanelReducer = (state, action) => {
    const { row, modeIndex, skinFocusIndex, skinIds } = state;
    const inModes = row === ROW_MODES;

    switch (action.type) {
        case 'left': {
            return inModes
                ? { ...state, modeIndex: prevIndex(modeIndex, MODES.length) }
                : { ...state, skinFocusIndex: prevIndex(skinFocusIndex, skinIds.length) };
        }
        case 'right': {
            return inModes
                ? { ...state, modeIndex: nextIndex(modeIndex, MODES.length) }
                : { ...state, skinFocusIndex: nextIndex(skinFocusIndex, skinIds.length) };
        }
        case 'up':
        case 'down': {
            return { ...state, row: inModes ? ROW_SKINS : ROW_MODES };
        }
        case 'activate': {
            return activate(state);
        }
        case 'focus_mode': {
            return { ...state, row: ROW_MODES, modeIndex: action.index };
        }
        case 'focus_skin': {
            return { ...state, row: ROW_SKINS, skinFocusIndex: action.index };
        }
        default: {
            return state;
        }
    }
};

export { MODES, ROW_MODES, ROW_SKINS, initPanelState, skinPanelReducer, settingsForStorage };
