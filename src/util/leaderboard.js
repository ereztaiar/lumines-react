const MAX_ENTRIES = 10;

const STORAGE_KEYS = {
    arcade: 'leaderboard',
    'time-attack': 'leaderboard-time-attack',
};

const DUMMY_ENTRIES = {
    arcade: [
        { name: 'ACE', score: 9500 },
        { name: 'REX', score: 8200 },
        { name: 'ZAP', score: 7800 },
        { name: 'MAX', score: 6500 },
        { name: 'NEO', score: 5900 },
        { name: 'SKY', score: 4800 },
        { name: 'FLY', score: 3700 },
        { name: 'AXE', score: 2600 },
        { name: 'SUN', score: 1500 },
        { name: 'GEM', score: 800 },
    ],
    'time-attack': [
        { name: 'ACE', score: 3200 },
        { name: 'REX', score: 2800 },
        { name: 'ZAP', score: 2400 },
        { name: 'MAX', score: 2000 },
        { name: 'NEO', score: 1700 },
        { name: 'SKY', score: 1400 },
        { name: 'FLY', score: 1100 },
        { name: 'AXE', score: 800 },
        { name: 'SUN', score: 500 },
        { name: 'GEM', score: 200 },
    ],
};

const storageKey = (mode) => STORAGE_KEYS[mode] || STORAGE_KEYS.arcade;
const dummyEntries = (mode) => DUMMY_ENTRIES[mode] || DUMMY_ENTRIES.arcade;

const getLeaderboard = (mode) => {
    try {
        const stored = localStorage.getItem(storageKey(mode));
        if (stored) return JSON.parse(stored);
    } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.warn('leaderboard: failed to parse localStorage', e);
    }
    return [...dummyEntries(mode)];
};

const isEligible = (score, mode) => {
    if (score <= 0) return false;
    const board = getLeaderboard(mode);
    return board.length < MAX_ENTRIES || score > board[board.length - 1].score;
};

const addEntry = (name, score, mode) => {
    const board = getLeaderboard(mode);
    board.push({ name: name.toUpperCase().padEnd(3, 'A').slice(0, 3), score });
    board.sort((a, b) => b.score - a.score);
    const trimmed = board.slice(0, MAX_ENTRIES);
    localStorage.setItem(storageKey(mode), JSON.stringify(trimmed));
    return trimmed;
};

export { getLeaderboard, isEligible, addEntry };
