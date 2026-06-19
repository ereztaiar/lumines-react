import { advanceChain, resetChainIfNoClear } from './chain.js';


describe('advanceChain', () => {
    it('increments the chain count by one', () => {
        expect(advanceChain(0)).toBe(1);
        expect(advanceChain(3)).toBe(4);
    });
});

describe('resetChainIfNoClear', () => {
    it('keeps the chain count when the lap had a clear', () => {
        expect(resetChainIfNoClear(5, true)).toBe(5);
    });

    it('resets the chain count to zero when the lap had no clear', () => {
        expect(resetChainIfNoClear(5, false)).toBe(0);
    });

    it('is a no-op on an already-zero chain with no clear', () => {
        expect(resetChainIfNoClear(0, false)).toBe(0);
    });
});
