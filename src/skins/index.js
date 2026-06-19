import * as defaultSkin from 'Skins/default';
import * as purple from 'Skins/purple';
import * as yellow from 'Skins/yellow';
import * as midnightNeon from 'Skins/midnight-neon';
import * as cherryBlossom from 'Skins/cherry-blossom';
import * as poker from 'Skins/poker';
import * as sakura from 'Skins/sakura';
import * as tropical from 'Skins/tropical';
import * as guitar from 'Skins/guitar';
import * as synthwave from 'Skins/synthwave';
import * as deepSea from 'Skins/deep-sea';
import * as forestZen from 'Skins/forest-zen';
import * as halloween from 'Skins/halloween';
import * as galaxy from 'Skins/galaxy';
import * as time from 'Skins/time';
import * as notes from 'Skins/notes';

const SKINS = [
    { id: 'default', label: 'DEFAULT', module: defaultSkin },
    { id: 'purple', label: 'PURPLE', module: purple },
    { id: 'yellow', label: 'YELLOW', module: yellow },
    { id: 'midnight-neon', label: 'MIDNIGHT NEON', module: midnightNeon },
    { id: 'cherry-blossom', label: 'CHERRY BLOSSOM', module: cherryBlossom },
    { id: 'poker', label: 'POKER', module: poker },
    { id: 'sakura', label: 'SAKURA', module: sakura },
    { id: 'tropical', label: 'TROPICAL', module: tropical },
    { id: 'guitar', label: 'GUITAR', module: guitar },
    { id: 'synthwave', label: 'SYNTHWAVE', module: synthwave },
    { id: 'deep-sea', label: 'DEEP SEA', module: deepSea },
    { id: 'forest-zen', label: 'FOREST ZEN', module: forestZen },
    { id: 'halloween', label: 'HALLOWEEN', module: halloween },
    { id: 'galaxy', label: 'GALAXY', module: galaxy },
    { id: 'time', label: 'TIME', module: time },
    { id: 'notes', label: 'NOTES', module: notes },
];

const SKIN_IDS = SKINS.map((skin) => skin.id);
const DEFAULT_SKIN_ID = SKIN_IDS[0];
const SKINS_BY_ID = SKINS.reduce((map, skin) => {
    map[skin.id] = skin;
    return map;
}, {});

export { SKINS, SKIN_IDS, SKINS_BY_ID, DEFAULT_SKIN_ID };
