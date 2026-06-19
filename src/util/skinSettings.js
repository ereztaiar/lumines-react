const STORAGE_KEY = 'skinSettings';

const MODES = ['sequence', 'single', 'shuffle'];

const DEFAULT_SETTINGS = {
    mode: 'sequence',
    selectedSkinId: 'default',
    enabledSkinIds: [],
};

// Pure. Self-heals stale persisted state: unknown modes, locked or removed
// skin ids, and empty shuffle selections all fall back to safe values.
const normalizeSettings = (raw, allIds, unlockedIds) => {
    const settings = { ...DEFAULT_SETTINGS, ...raw };
    const playable = allIds.filter((id) => unlockedIds.includes(id));

    const mode = MODES.includes(settings.mode) ? settings.mode : DEFAULT_SETTINGS.mode;

    const selectedSkinId = playable.includes(settings.selectedSkinId)
        ? settings.selectedSkinId
        : playable[0];

    const enabledRaw = Array.isArray(settings.enabledSkinIds) ? settings.enabledSkinIds : [];
    const enabled = playable.filter((id) => enabledRaw.includes(id));
    const enabledSkinIds = enabled.length > 0 ? enabled : [...playable];

    return { mode, selectedSkinId, enabledSkinIds };
};

const defaultStorage = () => (typeof localStorage !== 'undefined' ? localStorage : null);

const getSkinSettings = (storage = defaultStorage()) => {
    try {
        const raw = storage && storage.getItem(STORAGE_KEY);
        if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.warn('skinSettings: failed to parse localStorage', e);
    }
    return { ...DEFAULT_SETTINGS };
};

const saveSkinSettings = (settings, storage = defaultStorage()) => {
    try {
        if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
};

export { MODES, DEFAULT_SETTINGS, normalizeSettings, getSkinSettings, saveSkinSettings };
