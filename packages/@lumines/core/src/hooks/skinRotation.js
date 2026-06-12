// Pure rotation logic for useSkin. Settings must already be normalized
// (see Util/skinSettings normalizeSettings), so playlists are never empty.

const buildPlaylist = (settings, allIds) => {
    switch (settings.mode) {
        case 'single':
            return [settings.selectedSkinId];
        case 'shuffle':
            return [...settings.enabledSkinIds];
        case 'sequence':
        default:
            // full progression through every skin — this is the unlock path
            return [...allIds];
    }
};

const advanceIndex = (mode, index, length, rng = Math.random) => {
    if (mode === 'single' || length <= 1) {
        return index;
    }
    if (mode === 'shuffle') {
        // random index guaranteed different from the current one
        return (index + 1 + Math.floor(rng() * (length - 1))) % length;
    }
    return (index + 1) % length;
};

// score jumps in multiples of the clear size, so it rarely lands exactly on a
// stage boundary — advance once per boundary crossed, not on score % 100 === 0
const advanceIndexBy = (mode, index, length, steps, rng = Math.random) => {
    let next = index;
    for (let i = 0; i < steps; i++) {
        next = advanceIndex(mode, next, length, rng);
    }
    return next;
};

export { buildPlaylist, advanceIndex, advanceIndexBy };
