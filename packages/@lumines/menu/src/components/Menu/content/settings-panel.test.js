const { ROW_REFLECTION, ROW_AVATAR, ROW_SOUND, initPanelState, settingsPanelReducer } = require('./settingsPanel');
const { AVATAR_IDS } = require('@lumines/game-components/src/components/Character/avatars');

const makeState = (settings = {}, overrides = {}) =>
    ({
        ...initPanelState({
            settings: {
                reflection: true,
                avatarId: 'react',
                muted: false,
                ...settings,
            },
        }),
        ...overrides,
    });

describe('settingsPanel', () => {
    describe('initPanelState', () => {
        it('starts on the reflection row with the stored avatar focused', () => {
            const state = makeState({ avatarId: 'robot' });
            expect(state.row).toBe(ROW_REFLECTION);
            expect(AVATAR_IDS[state.avatarIndex]).toBe('robot');
        });
    });

    describe('row switching', () => {
        it('down cycles reflection -> avatar -> sound -> reflection', () => {
            let state = makeState();
            state = settingsPanelReducer(state, { type: 'down' });
            expect(state.row).toBe(ROW_AVATAR);
            state = settingsPanelReducer(state, { type: 'down' });
            expect(state.row).toBe(ROW_SOUND);
            state = settingsPanelReducer(state, { type: 'down' });
            expect(state.row).toBe(ROW_REFLECTION);
        });

        it('up cycles reflection -> sound -> avatar -> reflection', () => {
            let state = makeState();
            state = settingsPanelReducer(state, { type: 'up' });
            expect(state.row).toBe(ROW_SOUND);
            state = settingsPanelReducer(state, { type: 'up' });
            expect(state.row).toBe(ROW_AVATAR);
            state = settingsPanelReducer(state, { type: 'up' });
            expect(state.row).toBe(ROW_REFLECTION);
        });
    });

    describe('left/right navigation', () => {
        it('is a no-op outside the avatar row', () => {
            const state = makeState();
            expect(settingsPanelReducer(state, { type: 'left' })).toBe(state);
            expect(settingsPanelReducer(state, { type: 'right' })).toBe(state);
        });

        it('cycles and wraps the avatar selection on the avatar row', () => {
            let state = makeState({}, { row: ROW_AVATAR });
            state = settingsPanelReducer(state, { type: 'left' });
            expect(state.avatarIndex).toBe(AVATAR_IDS.length - 1);
            expect(state.settings.avatarId).toBe(AVATAR_IDS[AVATAR_IDS.length - 1]);
            state = settingsPanelReducer(state, { type: 'right' });
            expect(state.avatarIndex).toBe(0);
            expect(state.settings.avatarId).toBe(AVATAR_IDS[0]);
        });
    });

    describe('activate', () => {
        it('toggles reflection on the reflection row', () => {
            const state = makeState({ reflection: true });
            expect(settingsPanelReducer(state, { type: 'activate' }).settings.reflection).toBe(false);
        });

        it('toggles muted on the sound row', () => {
            const state = makeState({ muted: false }, { row: ROW_SOUND });
            expect(settingsPanelReducer(state, { type: 'activate' }).settings.muted).toBe(true);
        });

        it('is a no-op on the avatar row', () => {
            const state = makeState({}, { row: ROW_AVATAR });
            expect(settingsPanelReducer(state, { type: 'activate' })).toBe(state);
        });
    });

    describe('mouse focus', () => {
        it('focus_row focuses the given row', () => {
            const state = settingsPanelReducer(makeState(), { type: 'focus_row', row: ROW_SOUND });
            expect(state.row).toBe(ROW_SOUND);
        });

        it('focus_avatar focuses the avatar row and selects the avatar', () => {
            const state = settingsPanelReducer(makeState(), { type: 'focus_avatar', index: 2 });
            expect(state.row).toBe(ROW_AVATAR);
            expect(state.avatarIndex).toBe(2);
            expect(state.settings.avatarId).toBe(AVATAR_IDS[2]);
        });
    });

    describe('unknown actions', () => {
        it('returns the same state', () => {
            const state = makeState();
            expect(settingsPanelReducer(state, { type: 'nope' })).toBe(state);
        });
    });
});
