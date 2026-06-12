const {
    DEFAULT_SETTINGS,
    normalizeSettings,
    getSkinSettings,
    saveSkinSettings,
} = require('./skinSettings');

const ALL_IDS = ['default', 'purple', 'yellow', 'sakura'];
const UNLOCKED = ['default', 'purple'];

const fakeStorage = (initial = {}) => {
    const data = { ...initial };
    return {
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => { data[key] = value; },
        data,
    };
};

describe('skinSettings', () => {
    describe('normalizeSettings', () => {
        it('keeps valid settings untouched', () => {
            const raw = { mode: 'single', selectedSkinId: 'purple', enabledSkinIds: ['default', 'purple'] };
            expect(normalizeSettings(raw, ALL_IDS, UNLOCKED)).toEqual(raw);
        });

        it('falls back to sequence mode for unknown modes', () => {
            const result = normalizeSettings({ mode: 'disco' }, ALL_IDS, UNLOCKED);
            expect(result.mode).toBe('sequence');
        });

        it('normalizes undefined raw settings to defaults', () => {
            const result = normalizeSettings(undefined, ALL_IDS, UNLOCKED);
            expect(result.mode).toBe('sequence');
            expect(result.selectedSkinId).toBe('default');
            expect(result.enabledSkinIds).toEqual(UNLOCKED);
        });

        it('replaces a locked selectedSkinId with the first unlocked skin', () => {
            const result = normalizeSettings({ selectedSkinId: 'sakura' }, ALL_IDS, UNLOCKED);
            expect(result.selectedSkinId).toBe('default');
        });

        it('replaces an unknown selectedSkinId with the first unlocked skin', () => {
            const result = normalizeSettings({ selectedSkinId: 'removed-skin' }, ALL_IDS, UNLOCKED);
            expect(result.selectedSkinId).toBe('default');
        });

        it('removes locked and unknown ids from enabledSkinIds', () => {
            const raw = { enabledSkinIds: ['purple', 'sakura', 'removed-skin'] };
            const result = normalizeSettings(raw, ALL_IDS, UNLOCKED);
            expect(result.enabledSkinIds).toEqual(['purple']);
        });

        it('falls back to all unlocked skins when enabledSkinIds empties out', () => {
            const raw = { enabledSkinIds: ['sakura'] };
            const result = normalizeSettings(raw, ALL_IDS, UNLOCKED);
            expect(result.enabledSkinIds).toEqual(UNLOCKED);
        });

        it('falls back to all unlocked skins when enabledSkinIds is not an array', () => {
            const raw = { enabledSkinIds: 'purple' };
            const result = normalizeSettings(raw, ALL_IDS, UNLOCKED);
            expect(result.enabledSkinIds).toEqual(UNLOCKED);
        });

        it('keeps enabledSkinIds in registry order regardless of stored order', () => {
            const raw = { enabledSkinIds: ['purple', 'default'] };
            const result = normalizeSettings(raw, ALL_IDS, UNLOCKED);
            expect(result.enabledSkinIds).toEqual(['default', 'purple']);
        });
    });

    describe('getSkinSettings / saveSkinSettings', () => {
        it('returns defaults for empty storage', () => {
            expect(getSkinSettings(fakeStorage())).toEqual(DEFAULT_SETTINGS);
        });

        it('returns defaults for corrupt JSON', () => {
            const storage = fakeStorage({ skinSettings: '{broken' });
            expect(getSkinSettings(storage)).toEqual(DEFAULT_SETTINGS);
        });

        it('round-trips saved settings', () => {
            const storage = fakeStorage();
            const settings = { mode: 'shuffle', selectedSkinId: 'purple', enabledSkinIds: ['purple'] };
            saveSkinSettings(settings, storage);
            expect(getSkinSettings(storage)).toEqual(settings);
        });

        it('fills missing fields with defaults on read', () => {
            const storage = fakeStorage({ skinSettings: JSON.stringify({ mode: 'single' }) });
            expect(getSkinSettings(storage)).toEqual({ ...DEFAULT_SETTINGS, mode: 'single' });
        });

        it('handles missing storage (node env)', () => {
            expect(getSkinSettings(null)).toEqual(DEFAULT_SETTINGS);
            expect(() => saveSkinSettings(DEFAULT_SETTINGS, null)).not.toThrow();
        });
    });
});
