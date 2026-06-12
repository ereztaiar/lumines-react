const { gameFlow, defaultState } = require('./gameFlow');

describe('gameFlow', () => {
    it('defaults to arcade mode', () => {
        expect(defaultState.mode).toBe('arcade');
    });

    it('start_game stores the requested mode', () => {
        const state = gameFlow(defaultState, { type: 'start_game', mode: 'time-attack' });
        expect(state.isGame).toBe(true);
        expect(state.mode).toBe('time-attack');
    });

    it('start_game without a mode keeps the previous mode', () => {
        const withMode = { ...defaultState, mode: 'time-attack' };
        const state = gameFlow(withMode, { type: 'start_game' });
        expect(state.mode).toBe('time-attack');
    });

    it('reset returns to the default state including arcade mode', () => {
        const inGame = { ...defaultState, isGame: true, mode: 'time-attack' };
        const state = gameFlow(inGame, { type: 'reset' });
        expect(state).toEqual(defaultState);
    });
});
