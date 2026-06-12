const fakeStorage = () => {
    const data = {};
    return {
        getItem: (key) => (key in data ? data[key] : null),
        setItem: (key, value) => { data[key] = value; },
    };
};

describe('useScore high score storage', () => {
    let getHighScore, storeHighScore;

    beforeEach(() => {
        global.window = { localStorage: fakeStorage() };
        jest.resetModules();
        ({ getHighScore, storeHighScore } = require('./useScore'));
    });

    afterEach(() => {
        delete global.window;
    });

    it('stores arcade and time-attack high scores under separate keys', () => {
        storeHighScore(5000, 'arcade');
        storeHighScore(1200, 'time-attack');

        expect(getHighScore('arcade')).toBe(5000);
        expect(getHighScore('time-attack')).toBe(1200);
        expect(window.localStorage.getItem('highScore')).toBe('5000');
        expect(window.localStorage.getItem('highScore-time-attack')).toBe('1200');
    });
});
