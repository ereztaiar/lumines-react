import { initialHeldDirection, pressDirection, releaseDirection } from './heldDirection.js';

describe('heldDirection', () => {
    it('starts with nothing held or active', () => {
        expect(initialHeldDirection()).toStrictEqual({ left: false, right: false, active: null });
    });

    it('press sets that direction held and active', () => {
        const state = pressDirection(initialHeldDirection(), 'left');
        expect(state).toStrictEqual({ left: true, right: false, active: 'left' });
    });

    it('pressing a second direction switches active to the latest press (last-pressed-wins)', () => {
        let state = pressDirection(initialHeldDirection(), 'left');
        state = pressDirection(state, 'right');
        expect(state).toStrictEqual({ left: true, right: true, active: 'right' });
    });

    it('releasing the active direction falls back to the other if still held', () => {
        let state = pressDirection(initialHeldDirection(), 'left');
        state = pressDirection(state, 'right');
        state = releaseDirection(state, 'right');
        expect(state).toStrictEqual({ left: true, right: false, active: 'left' });
    });

    it('releasing a direction that is not active does not change active', () => {
        let state = pressDirection(initialHeldDirection(), 'left');
        state = pressDirection(state, 'right');
        state = releaseDirection(state, 'left');
        expect(state).toStrictEqual({ left: false, right: true, active: 'right' });
    });

    it('releasing the only held direction clears active', () => {
        let state = pressDirection(initialHeldDirection(), 'left');
        state = releaseDirection(state, 'left');
        expect(state).toStrictEqual({ left: false, right: false, active: null });
    });
});
