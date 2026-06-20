// Metadata only — id/label for the menu picker and in-game label tag.
// The heavy per-skin module (BackgroundComponent, .less styles, SVG paths,
// sounds) is loaded on demand via loadSkinModule() so only the active skin's
// chunk ships to a given session (see useSkin.js).
const SKINS = [
    { id: 'default', label: 'DEFAULT' },
    { id: 'purple', label: 'PURPLE' },
    { id: 'yellow', label: 'YELLOW' },
    { id: 'midnight-neon', label: 'MIDNIGHT NEON' },
    { id: 'cherry-blossom', label: 'CHERRY BLOSSOM' },
    { id: 'poker', label: 'POKER' },
    { id: 'sakura', label: 'SAKURA' },
    { id: 'tropical', label: 'TROPICAL' },
    { id: 'guitar', label: 'GUITAR' },
    { id: 'synthwave', label: 'SYNTHWAVE' },
    { id: 'deep-sea', label: 'DEEP SEA' },
    { id: 'forest-zen', label: 'FOREST ZEN' },
    { id: 'halloween', label: 'HALLOWEEN' },
    { id: 'galaxy', label: 'GALAXY' },
    { id: 'time', label: 'TIME' },
    { id: 'notes', label: 'NOTES' },
    { id: 'bubblegum', label: 'BUBBLEGUM' },
    { id: 'disco', label: 'DISCO' },
    { id: 'volcano', label: 'VOLCANO' },
    { id: 'arctic', label: 'ARCTIC' },
    { id: 'carnival', label: 'CARNIVAL' },
    { id: 'desert', label: 'DESERT' },
    { id: 'rainbow', label: 'RAINBOW' },
    { id: 'arcade', label: 'ARCADE' },
    { id: 'safari', label: 'SAFARI' },
    { id: 'fireworks', label: 'FIREWORKS' },
    { id: 'coral-reef', label: 'CORAL REEF' },
    { id: 'autumn', label: 'AUTUMN' },
    { id: 'honeycomb', label: 'HONEYCOMB' },
    { id: 'pirate', label: 'PIRATE' },
    { id: 'aurora', label: 'AURORA' },
];

const SKIN_IDS = SKINS.map((skin) => skin.id);
const DEFAULT_SKIN_ID = SKIN_IDS[0];
const SKINS_BY_ID = SKINS.reduce((map, skin) => {
    map[skin.id] = skin;
    return map;
}, {});

// One chunk per skin id — webpack resolves the `Skins` alias to a directory
// of per-skin folders, so this template-literal import becomes a context
// module covering all of them.
const loadSkinModule = (id) =>
    import(/* webpackChunkName: "skin-[request]" */ `Skins/${id}`);

export { SKINS, SKIN_IDS, SKINS_BY_ID, DEFAULT_SKIN_ID, loadSkinModule };
