const { buildPlaylist, advanceIndex, advanceIndexBy } = require('./skinRotation');

const ALL_IDS = ['default', 'purple', 'yellow', 'sakura'];

describe('skinRotation', () => {
    describe('buildPlaylist', () => {
        it('sequence mode plays every skin in registry order, locks ignored', () => {
            const settings = { mode: 'sequence', selectedSkinId: 'default', enabledSkinIds: ['default'] };
            expect(buildPlaylist(settings, ALL_IDS)).toEqual(ALL_IDS);
        });

        it('single mode plays only the selected skin', () => {
            const settings = { mode: 'single', selectedSkinId: 'purple', enabledSkinIds: ['default', 'purple'] };
            expect(buildPlaylist(settings, ALL_IDS)).toEqual(['purple']);
        });

        it('shuffle mode plays the enabled subset', () => {
            const settings = { mode: 'shuffle', selectedSkinId: 'default', enabledSkinIds: ['default', 'yellow'] };
            expect(buildPlaylist(settings, ALL_IDS)).toEqual(['default', 'yellow']);
        });

        it('returns copies, not the original arrays', () => {
            const enabledSkinIds = ['default', 'yellow'];
            const settings = { mode: 'shuffle', selectedSkinId: 'default', enabledSkinIds };
            expect(buildPlaylist(settings, ALL_IDS)).not.toBe(enabledSkinIds);
            expect(buildPlaylist({ ...settings, mode: 'sequence' }, ALL_IDS)).not.toBe(ALL_IDS);
        });
    });

    describe('advanceIndex', () => {
        it('single mode never advances', () => {
            expect(advanceIndex('single', 0, 4)).toBe(0);
            expect(advanceIndex('single', 2, 4)).toBe(2);
        });

        it('sequence mode steps forward and wraps', () => {
            expect(advanceIndex('sequence', 0, 4)).toBe(1);
            expect(advanceIndex('sequence', 3, 4)).toBe(0);
        });

        it('shuffle mode picks a different index based on rng', () => {
            // rng() = 0 -> next index; rng() near 1 -> furthest offset
            expect(advanceIndex('shuffle', 0, 4, () => 0)).toBe(1);
            expect(advanceIndex('shuffle', 0, 4, () => 0.99)).toBe(3);
            expect(advanceIndex('shuffle', 3, 4, () => 0.5)).toBe(1);
        });

        it('shuffle mode never repeats the current index when length > 1', () => {
            for (let step = 0; step < 1; step += 0.05) {
                const rng = () => step;
                for (let index = 0; index < 4; index++) {
                    expect(advanceIndex('shuffle', index, 4, rng)).not.toBe(index);
                }
            }
        });

        it('stays put for single-item playlists in every mode', () => {
            expect(advanceIndex('sequence', 0, 1)).toBe(0);
            expect(advanceIndex('shuffle', 0, 1)).toBe(0);
            expect(advanceIndex('single', 0, 1)).toBe(0);
        });
    });

    describe('advanceIndexBy', () => {
        it('advances one step per stage boundary crossed', () => {
            expect(advanceIndexBy('sequence', 0, 4, 1)).toBe(1);
            expect(advanceIndexBy('sequence', 0, 4, 3)).toBe(3);
        });

        it('wraps across multiple steps', () => {
            expect(advanceIndexBy('sequence', 3, 4, 2)).toBe(1);
        });

        it('does nothing for zero steps', () => {
            expect(advanceIndexBy('sequence', 2, 4, 0)).toBe(2);
        });

        it('single mode stays put regardless of steps', () => {
            expect(advanceIndexBy('single', 0, 4, 5)).toBe(0);
        });

        it('shuffle mode moves to a different index each step', () => {
            expect(advanceIndexBy('shuffle', 0, 4, 2, () => 0)).toBe(2);
        });
    });
});
