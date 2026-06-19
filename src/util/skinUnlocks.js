const STORAGE_KEY = 'skinUnlocks';
const ALWAYS_UNLOCKED = ['default'];

const defaultStorage = () => (typeof localStorage !== 'undefined' ? localStorage : null);

const getUnlockedSkinIds = (storage = defaultStorage()) => {
    let stored = [];
    try {
        const raw = storage && storage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) stored = parsed;
        }
    } catch {
        // localStorage read/write failure is best-effort — silently ignore
    }
    return [...new Set([...ALWAYS_UNLOCKED, ...stored])];
};

const unlockSkin = (id, storage = defaultStorage()) => {
    const unlocked = getUnlockedSkinIds(storage);
    if (unlocked.includes(id)) return unlocked;
    unlocked.push(id);
    try {
        if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
    } catch {
        // localStorage read/write failure is best-effort — silently ignore
    }
    return unlocked;
};

const isUnlocked = (id, storage = defaultStorage()) => getUnlockedSkinIds(storage).includes(id);

export { getUnlockedSkinIds, unlockSkin, isUnlocked };
