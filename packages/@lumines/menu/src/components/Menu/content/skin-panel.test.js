const { MODES, ROW_MODES, ROW_SKINS, initPanelState, skinPanelReducer, settingsForStorage } = require('./skinPanel');

const SKIN_IDS = ['default', 'purple', 'yellow', 'sakura'];
const UNLOCKED = ['default', 'purple', 'yellow'];

const makeState = (settings = {}, overrides = {}) =>
    ({
        ...initPanelState({
            settings: {
                mode: 'sequence',
                selectedSkinId: 'default',
                enabledSkinIds: ['default', 'purple', 'yellow'],
                ...settings,
            },
            skinIds: SKIN_IDS,
            unlockedIds: UNLOCKED,
        }),
        ...overrides,
    });

describe('skinPanel', () => {
    describe('initPanelState', () => {
        it('starts on the modes row with the stored mode focused', () => {
            const state = makeState({ mode: 'shuffle' });
            expect(state.row).toBe(ROW_MODES);
            expect(MODES[state.modeIndex].id).toBe('shuffle');
            expect(state.skinFocusIndex).toBe(0);
        });
    });

    describe('row switching', () => {
        it('up and down toggle between modes and skins rows', () => {
            const state = makeState();
            const onSkins = skinPanelReducer(state, { type: 'down' });
            expect(onSkins.row).toBe(ROW_SKINS);
            expect(skinPanelReducer(onSkins, { type: 'down' }).row).toBe(ROW_MODES);
            expect(skinPanelReducer(state, { type: 'up' }).row).toBe(ROW_SKINS);
        });
    });

    describe('horizontal navigation', () => {
        it('moves and wraps within the modes row', () => {
            let state = makeState(); // sequence -> modeIndex 0
            state = skinPanelReducer(state, { type: 'left' });
            expect(state.modeIndex).toBe(MODES.length - 1);
            state = skinPanelReducer(state, { type: 'right' });
            expect(state.modeIndex).toBe(0);
            expect(state.skinFocusIndex).toBe(0);
        });

        it('moves and wraps within the skins row', () => {
            let state = makeState({}, { row: ROW_SKINS });
            state = skinPanelReducer(state, { type: 'left' });
            expect(state.skinFocusIndex).toBe(SKIN_IDS.length - 1);
            state = skinPanelReducer(state, { type: 'right' });
            expect(state.skinFocusIndex).toBe(0);
            expect(state.modeIndex).toBe(0);
        });
    });

    describe('mode activation', () => {
        it('sets the focused mode on activate', () => {
            let state = makeState();
            state = skinPanelReducer(state, { type: 'right' }); // single
            state = skinPanelReducer(state, { type: 'activate' });
            expect(state.settings.mode).toBe('single');
        });
    });

    describe('single mode skin selection', () => {
        it('selects the focused unlocked skin', () => {
            let state = makeState({ mode: 'single' }, { row: ROW_SKINS, skinFocusIndex: 1 });
            state = skinPanelReducer(state, { type: 'activate' });
            expect(state.settings.selectedSkinId).toBe('purple');
        });

        it('ignores activation on a locked skin', () => {
            const state = makeState({ mode: 'single' }, { row: ROW_SKINS, skinFocusIndex: 3 });
            expect(skinPanelReducer(state, { type: 'activate' })).toBe(state);
        });
    });

    describe('shuffle mode skin toggling', () => {
        it('removes an enabled skin', () => {
            let state = makeState({ mode: 'shuffle' }, { row: ROW_SKINS, skinFocusIndex: 1 });
            state = skinPanelReducer(state, { type: 'activate' });
            expect(state.settings.enabledSkinIds).toEqual(['default', 'yellow']);
        });

        it('adds a disabled skin back in registry order', () => {
            let state = makeState(
                { mode: 'shuffle', enabledSkinIds: ['default', 'yellow'] },
                { row: ROW_SKINS, skinFocusIndex: 1 }
            );
            state = skinPanelReducer(state, { type: 'activate' });
            expect(state.settings.enabledSkinIds).toEqual(['default', 'purple', 'yellow']);
        });

        it('refuses to remove the last enabled skin', () => {
            const state = makeState(
                { mode: 'shuffle', enabledSkinIds: ['purple'] },
                { row: ROW_SKINS, skinFocusIndex: 1 }
            );
            expect(skinPanelReducer(state, { type: 'activate' }).settings.enabledSkinIds).toEqual(['purple']);
        });

        it('ignores toggling a locked skin', () => {
            const state = makeState({ mode: 'shuffle' }, { row: ROW_SKINS, skinFocusIndex: 3 });
            expect(skinPanelReducer(state, { type: 'activate' })).toBe(state);
        });
    });

    describe('sequence mode', () => {
        it('skin activation is a no-op', () => {
            const state = makeState({ mode: 'sequence' }, { row: ROW_SKINS, skinFocusIndex: 1 });
            expect(skinPanelReducer(state, { type: 'activate' })).toBe(state);
        });
    });

    describe('mouse focus', () => {
        it('focus_mode focuses the modes row at an index', () => {
            const state = skinPanelReducer(makeState({}, { row: ROW_SKINS }), { type: 'focus_mode', index: 2 });
            expect(state.row).toBe(ROW_MODES);
            expect(state.modeIndex).toBe(2);
        });

        it('focus_skin focuses the skins row at an index', () => {
            const state = skinPanelReducer(makeState(), { type: 'focus_skin', index: 2 });
            expect(state.row).toBe(ROW_SKINS);
            expect(state.skinFocusIndex).toBe(2);
        });
    });

    describe('settingsForStorage', () => {
        it('stores [] when every unlocked skin is enabled, so future unlocks join automatically', () => {
            const state = makeState({ enabledSkinIds: ['default', 'purple', 'yellow'] });
            expect(settingsForStorage(state).enabledSkinIds).toEqual([]);
        });

        it('stores the explicit subset once the user customizes it', () => {
            const state = makeState({ enabledSkinIds: ['purple', 'yellow'] });
            expect(settingsForStorage(state).enabledSkinIds).toEqual(['purple', 'yellow']);
        });
    });

    describe('unlock_all', () => {
        it('unlocks every registered skin id', () => {
            const state = makeState({}, { unlockedIds: ['default'] });
            const result = skinPanelReducer(state, { type: 'unlock_all' });
            expect(result.unlockedIds).toEqual(SKIN_IDS);
        });
    });

    describe('unknown actions', () => {
        it('returns the same state', () => {
            const state = makeState();
            expect(skinPanelReducer(state, { type: 'nope' })).toBe(state);
        });
    });
});
