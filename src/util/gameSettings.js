const STORAGE_KEY = 'gameSettings';

const DEFAULT_SETTINGS = {
    reflection: true,
    avatarId: 'react',
    muted: false,
    showSkinName: false,
};

const defaultStorage = () => (typeof localStorage !== 'undefined' ? localStorage : null);

// Pure. Self-heals stale persisted state: unknown avatar ids and non-boolean
// flags fall back to defaults.
const normalizeSettings = (raw, avatarIds) => {
    const settings = { ...DEFAULT_SETTINGS, ...raw };

    const avatarId = avatarIds.includes(settings.avatarId)
        ? settings.avatarId
        : DEFAULT_SETTINGS.avatarId;

    const reflection = typeof settings.reflection === 'boolean' ? settings.reflection : DEFAULT_SETTINGS.reflection;
    const muted = typeof settings.muted === 'boolean' ? settings.muted : DEFAULT_SETTINGS.muted;
    const showSkinName = typeof settings.showSkinName === 'boolean' ? settings.showSkinName : DEFAULT_SETTINGS.showSkinName;

    return { reflection, avatarId, muted, showSkinName };
};

const getGameSettings = (storage = defaultStorage()) => {
    try {
        const raw = storage && storage.getItem(STORAGE_KEY);
        if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
        // localStorage read/write failure is best-effort — silently ignore
    }
    return { ...DEFAULT_SETTINGS };
};

const saveGameSettings = (settings, storage = defaultStorage()) => {
    try {
        if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
        // localStorage read/write failure is best-effort — silently ignore
    }
};

export { DEFAULT_SETTINGS, normalizeSettings, getGameSettings, saveGameSettings };
