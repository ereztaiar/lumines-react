const { getUnlockedSkinIds, unlockSkin, isUnlocked } = require('./skinUnlocks');

const fakeStorage = (initial = {}) => {
    const data = { ...initial };
    return {
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => { data[key] = value; },
        data,
    };
};

describe('skinUnlocks', () => {
    describe('getUnlockedSkinIds', () => {
        it('always includes default, even with empty storage', () => {
            expect(getUnlockedSkinIds(fakeStorage())).toEqual(['default']);
        });

        it('returns stored unlocks merged with default', () => {
            const storage = fakeStorage({ skinUnlocks: JSON.stringify(['purple', 'yellow']) });
            expect(getUnlockedSkinIds(storage)).toEqual(['default', 'purple', 'yellow']);
        });

        it('deduplicates default if it was persisted', () => {
            const storage = fakeStorage({ skinUnlocks: JSON.stringify(['default', 'purple']) });
            expect(getUnlockedSkinIds(storage)).toEqual(['default', 'purple']);
        });

        it('falls back to default-only on corrupt JSON', () => {
            const storage = fakeStorage({ skinUnlocks: 'not-json{' });
            expect(getUnlockedSkinIds(storage)).toEqual(['default']);
        });

        it('falls back to default-only when stored value is not an array', () => {
            const storage = fakeStorage({ skinUnlocks: JSON.stringify({ purple: true }) });
            expect(getUnlockedSkinIds(storage)).toEqual(['default']);
        });

        it('handles missing storage (node env)', () => {
            expect(getUnlockedSkinIds(null)).toEqual(['default']);
        });
    });

    describe('unlockSkin', () => {
        it('appends a new unlock and persists it', () => {
            const storage = fakeStorage();
            const result = unlockSkin('purple', storage);
            expect(result).toEqual(['default', 'purple']);
            expect(JSON.parse(storage.data.skinUnlocks)).toEqual(['default', 'purple']);
        });

        it('is idempotent and does not rewrite storage', () => {
            const storage = fakeStorage({ skinUnlocks: JSON.stringify(['default', 'purple']) });
            const before = storage.data.skinUnlocks;
            const result = unlockSkin('purple', storage);
            expect(result).toEqual(['default', 'purple']);
            expect(storage.data.skinUnlocks).toBe(before);
        });

        it('accumulates unlocks across calls', () => {
            const storage = fakeStorage();
            unlockSkin('purple', storage);
            unlockSkin('yellow', storage);
            expect(getUnlockedSkinIds(storage)).toEqual(['default', 'purple', 'yellow']);
        });
    });

    describe('isUnlocked', () => {
        it('reports default as always unlocked', () => {
            expect(isUnlocked('default', fakeStorage())).toBe(true);
        });

        it('reports locked skins as locked', () => {
            expect(isUnlocked('sakura', fakeStorage())).toBe(false);
        });

        it('reports persisted unlocks as unlocked', () => {
            const storage = fakeStorage({ skinUnlocks: JSON.stringify(['sakura']) });
            expect(isUnlocked('sakura', storage)).toBe(true);
        });
    });
});
