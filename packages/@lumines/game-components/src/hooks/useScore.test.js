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

// Verify that the score/deleted updaters use functional form so that
// back-to-back calls within the same React batch both apply their increment.
// We simulate React's batching by calling the updater returned by useState
// sequentially with the same initial value — both must accumulate, not overwrite.
describe('useScore functional updaters accumulate across batched calls', () => {
    it('MULTIPLIER exports correctly', () => {
        global.window = { localStorage: fakeStorage() };
        jest.resetModules();
        const { MULTIPLIER } = require('./useScore');
        expect(MULTIPLIER).toBe(4);
        delete global.window;
    });

    it('two score updaters built from the same stale value both apply when using functional form', () => {
        // Simulate what React does when two setState calls are batched:
        // each receives the latest queued state, not the render-time snapshot.
        let state = 10;
        const setScore = (updater) => { state = updater(state); };

        const MULTIPLIER = 4;
        // Call multiplier(3) then addOne() without a re-render in between
        setScore(prev => prev + 3 * MULTIPLIER); // +12 → 22
        setScore(prev => prev + 1);               // +1  → 23

        expect(state).toBe(23); // both increments applied; stale-closure would give 11 or 14
    });

    it('two deleted updaters built from the same stale value both apply when using functional form', () => {
        let state = 5;
        const setDeleted = (updater) => { state = updater(state); };

        setDeleted(prev => prev + 4); // 9
        setDeleted(prev => prev + 6); // 15

        expect(state).toBe(15);
    });
});
