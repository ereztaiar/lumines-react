const fakeStorage = () => {
    const data = {};
    return {
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => { data[key] = value; },
    };
};

describe('leaderboard', () => {
    let getLeaderboard, isEligible, addEntry;

    beforeEach(() => {
        global.localStorage = fakeStorage();
        jest.resetModules();
        ({ getLeaderboard, isEligible, addEntry } = require('./leaderboard'));
    });

    afterEach(() => {
        delete global.localStorage;
    });

    it('keeps arcade and time-attack leaderboards separate', () => {
        addEntry('AAA', 5000, 'arcade');
        addEntry('BBB', 1000, 'time-attack');

        const arcadeBoard = getLeaderboard('arcade');
        const timeAttackBoard = getLeaderboard('time-attack');

        expect(arcadeBoard.find((e) => e.name === 'AAA').score).toBe(5000);
        expect(timeAttackBoard.find((e) => e.name === 'BBB').score).toBe(1000);
        expect(timeAttackBoard.find((e) => e.name === 'AAA')).toBeUndefined();
    });

    it('uses mode-specific dummy entries when nothing is stored', () => {
        const arcadeBoard = getLeaderboard('arcade');
        const timeAttackBoard = getLeaderboard('time-attack');

        expect(arcadeBoard).not.toEqual(timeAttackBoard);
    });

    it('eligibility is evaluated against the matching mode leaderboard', () => {
        // 300 beats the lowest time-attack dummy entry (200) but not arcade's (800)
        expect(isEligible(300, 'time-attack')).toBe(true);
        expect(isEligible(300, 'arcade')).toBe(false);
        expect(isEligible(0, 'arcade')).toBe(false);
    });
});
