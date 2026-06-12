const { nextIndex, prevIndex } = require('./playFocus');

describe('playFocus', () => {
    describe('nextIndex', () => {
        it('steps forward', () => {
            expect(nextIndex(0, 2)).toBe(1);
        });

        it('wraps from last to first', () => {
            expect(nextIndex(1, 2)).toBe(0);
        });

        it('works for longer lists', () => {
            expect(nextIndex(1, 3)).toBe(2);
            expect(nextIndex(2, 3)).toBe(0);
        });
    });

    describe('prevIndex', () => {
        it('steps backward', () => {
            expect(prevIndex(1, 2)).toBe(0);
        });

        it('wraps from first to last', () => {
            expect(prevIndex(0, 2)).toBe(1);
        });

        it('works for longer lists', () => {
            expect(prevIndex(2, 3)).toBe(1);
            expect(prevIndex(0, 3)).toBe(2);
        });
    });
});
