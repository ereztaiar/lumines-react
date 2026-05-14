const STORAGE_KEY = 'leaderboard';
const MAX_ENTRIES = 10;

const DUMMY_ENTRIES = [
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
];

const getLeaderboard = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch {}
    return [...DUMMY_ENTRIES];
};

const isEligible = (score) => {
    if (score <= 0) return false;
    const board = getLeaderboard();
    return board.length < MAX_ENTRIES || score > board[board.length - 1].score;
};

const addEntry = (name, score) => {
    const board = getLeaderboard();
    board.push({ name: name.toUpperCase().padEnd(3, 'A').slice(0, 3), score });
    board.sort((a, b) => b.score - a.score);
    const trimmed = board.slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    return trimmed;
};

export { getLeaderboard, isEligible, addEntry };
