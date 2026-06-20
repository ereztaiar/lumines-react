const { BUTTON_TO_KEY, axisTransitions } = require('./gamepadMapping');

describe('gamepadMapping', () => {
    describe('BUTTON_TO_KEY', () => {
        it('maps face/menu buttons to their keyboard equivalents', () => {
            expect(BUTTON_TO_KEY.A).toBe(' ');
            expect(BUTTON_TO_KEY.Start).toBe(' ');
            expect(BUTTON_TO_KEY.B).toBe('Escape');
            expect(BUTTON_TO_KEY.Back).toBe('Escape');
        });

        it('maps the D-Pad to arrow keys', () => {
            expect(BUTTON_TO_KEY.DPadUp).toBe('ArrowUp');
            expect(BUTTON_TO_KEY.DPadDown).toBe('ArrowDown');
            expect(BUTTON_TO_KEY.DPadLeft).toBe('ArrowLeft');
            expect(BUTTON_TO_KEY.DPadRight).toBe('ArrowRight');
        });
    });

    describe('axisTransitions', () => {
        it('fires keydown ArrowRight when LeftStickX crosses the positive threshold', () => {
            expect(axisTransitions('LeftStickX', 0.8, 0.2)).toEqual([
                { type: 'keydown', key: 'ArrowRight' },
            ]);
        });

        it('fires keyup ArrowRight when LeftStickX falls back below the positive threshold', () => {
            expect(axisTransitions('LeftStickX', 0.2, 0.8)).toEqual([
                { type: 'keyup', key: 'ArrowRight' },
            ]);
        });

        it('fires keydown ArrowLeft when LeftStickX crosses the negative threshold', () => {
            expect(axisTransitions('LeftStickX', -0.8, -0.2)).toEqual([
                { type: 'keydown', key: 'ArrowLeft' },
            ]);
        });

        it('fires keyup ArrowLeft when LeftStickX returns above the negative threshold', () => {
            expect(axisTransitions('LeftStickX', -0.2, -0.8)).toEqual([
                { type: 'keyup', key: 'ArrowLeft' },
            ]);
        });

        it('LeftStickY positive maps to ArrowUp (axis is pre-inverted upstream)', () => {
            expect(axisTransitions('LeftStickY', 0.8, 0.2)).toEqual([
                { type: 'keydown', key: 'ArrowUp' },
            ]);
        });

        it('LeftStickY negative maps to ArrowDown', () => {
            expect(axisTransitions('LeftStickY', -0.8, -0.2)).toEqual([
                { type: 'keydown', key: 'ArrowDown' },
            ]);
        });

        it('returns no events when the value stays within the threshold', () => {
            expect(axisTransitions('LeftStickX', 0.3, 0.2)).toEqual([]);
        });

        it('returns no events for axes with no key mapping (triggers, right stick)', () => {
            expect(axisTransitions('RightStickX', 0.8, 0.2)).toEqual([]);
            expect(axisTransitions('LeftTrigger', 0.8, 0.2)).toEqual([]);
        });

        it('respects a custom threshold', () => {
            expect(axisTransitions('LeftStickX', 0.5, 0.1, 0.3)).toEqual([
                { type: 'keydown', key: 'ArrowRight' },
            ]);
        });
    });
});
