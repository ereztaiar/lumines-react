const { CONTROL_TABS, getControlRows } = require('./controlsData');

describe('controlsData', () => {
    it('every tab has a non-empty row list', () => {
        CONTROL_TABS.forEach(({ id }) => {
            expect(getControlRows(id).length).toBeGreaterThan(0);
        });
    });

    it('every row has both an action and an input', () => {
        CONTROL_TABS.forEach(({ id }) => {
            getControlRows(id).forEach((row) => {
                expect(row.action).toBeTruthy();
                expect(row.input).toBeTruthy();
            });
        });
    });

    it('keyboard tab documents the skin-cycle key', () => {
        expect(getControlRows('keyboard')).toEqual(
            expect.arrayContaining([{ action: 'Next Skin', input: 'S' }]),
        );
    });

    it('gamepad tab documents hard drop', () => {
        expect(getControlRows('gamepad').some((row) => row.action === 'Hard Drop')).toBe(true);
    });

    it('returns an empty array for an unknown tab', () => {
        expect(getControlRows('unknown')).toEqual([]);
    });
});
