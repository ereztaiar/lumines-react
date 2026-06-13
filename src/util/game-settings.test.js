const {
    DEFAULT_SETTINGS,
    normalizeSettings,
    getGameSettings,
    saveGameSettings,
} = require('./gameSettings');

const AVATAR_IDS = ['react', 'robot', 'ghost', 'cat', 'dragon', 'astronaut', 'ninja', 'skull', 'alien'];

const fakeStorage = (initial = {}) => {
    const data = { ...initial };
    return {
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => { data[key] = value; },
        data,
    };
};

describe('gameSettings', () => {
    describe('normalizeSettings', () => {
        it('keeps valid settings untouched', () => {
            const raw = { reflection: false, avatarId: 'robot', muted: true };
            expect(normalizeSettings(raw, AVATAR_IDS)).toEqual(raw);
        });

        it('normalizes undefined raw settings to defaults', () => {
            expect(normalizeSettings(undefined, AVATAR_IDS)).toEqual(DEFAULT_SETTINGS);
        });

        it('replaces an unknown avatarId with the default avatar', () => {
            const result = normalizeSettings({ avatarId: 'removed-avatar' }, AVATAR_IDS);
            expect(result.avatarId).toBe(DEFAULT_SETTINGS.avatarId);
        });

        it('falls back to defaults for non-boolean reflection/muted', () => {
            const result = normalizeSettings({ reflection: 'nope', muted: 'nope' }, AVATAR_IDS);
            expect(result.reflection).toBe(DEFAULT_SETTINGS.reflection);
            expect(result.muted).toBe(DEFAULT_SETTINGS.muted);
        });
    });

    describe('getGameSettings / saveGameSettings', () => {
        it('returns defaults for empty storage', () => {
            expect(getGameSettings(fakeStorage())).toEqual(DEFAULT_SETTINGS);
        });

        it('returns defaults for corrupt JSON', () => {
            const storage = fakeStorage({ gameSettings: '{broken' });
            expect(getGameSettings(storage)).toEqual(DEFAULT_SETTINGS);
        });

        it('round-trips saved settings', () => {
            const storage = fakeStorage();
            const settings = { reflection: false, avatarId: 'ghost', muted: true };
            saveGameSettings(settings, storage);
            expect(getGameSettings(storage)).toEqual(settings);
        });

        it('fills missing fields with defaults on read', () => {
            const storage = fakeStorage({ gameSettings: JSON.stringify({ muted: true }) });
            expect(getGameSettings(storage)).toEqual({ ...DEFAULT_SETTINGS, muted: true });
        });

        it('handles missing storage (node env)', () => {
            expect(getGameSettings(null)).toEqual(DEFAULT_SETTINGS);
            expect(() => saveGameSettings(DEFAULT_SETTINGS, null)).not.toThrow();
        });
    });
});
