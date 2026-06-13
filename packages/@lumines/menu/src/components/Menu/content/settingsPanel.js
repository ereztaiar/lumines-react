import { nextIndex, prevIndex } from './playFocus';
import { AVATAR_IDS } from '@lumines/game-components/src/components/Character/avatars';

const ROW_REFLECTION = 'reflection';
const ROW_AVATAR = 'avatar';
const ROW_SOUND = 'sound';

const ROWS = [ROW_REFLECTION, ROW_AVATAR, ROW_SOUND];

// settings must already be normalized
const initPanelState = ({ settings }) => ({
    row: ROW_REFLECTION,
    avatarIndex: Math.max(0, AVATAR_IDS.indexOf(settings.avatarId)),
    settings,
});

const activate = (state) => {
    const { row, settings } = state;

    switch (row) {
        case ROW_REFLECTION:
            return { ...state, settings: { ...settings, reflection: !settings.reflection } };
        case ROW_SOUND:
            return { ...state, settings: { ...settings, muted: !settings.muted } };
        default:
            return state;
    }
};

const settingsPanelReducer = (state, action) => {
    const { row, avatarIndex, settings } = state;
    const rowIndex = ROWS.indexOf(row);

    switch (action.type) {
        case 'up': {
            return { ...state, row: ROWS[prevIndex(rowIndex, ROWS.length)] };
        }
        case 'down': {
            return { ...state, row: ROWS[nextIndex(rowIndex, ROWS.length)] };
        }
        case 'left': {
            if (row !== ROW_AVATAR) return state;
            const nextAvatarIndex = prevIndex(avatarIndex, AVATAR_IDS.length);
            return { ...state, avatarIndex: nextAvatarIndex, settings: { ...settings, avatarId: AVATAR_IDS[nextAvatarIndex] } };
        }
        case 'right': {
            if (row !== ROW_AVATAR) return state;
            const nextAvatarIndex = nextIndex(avatarIndex, AVATAR_IDS.length);
            return { ...state, avatarIndex: nextAvatarIndex, settings: { ...settings, avatarId: AVATAR_IDS[nextAvatarIndex] } };
        }
        case 'activate': {
            return activate(state);
        }
        case 'focus_row': {
            return { ...state, row: action.row };
        }
        case 'focus_avatar': {
            return { ...state, row: ROW_AVATAR, avatarIndex: action.index, settings: { ...settings, avatarId: AVATAR_IDS[action.index] } };
        }
        default: {
            return state;
        }
    }
};

export { ROW_REFLECTION, ROW_AVATAR, ROW_SOUND, initPanelState, settingsPanelReducer };
