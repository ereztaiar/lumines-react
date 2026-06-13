import { FaReact, FaRobot, FaGhost, FaCat, FaDragon, FaUserAstronaut, FaUserNinja, FaSkull, FaRedditAlien } from 'react-icons/fa';

const AVATARS = [
    { id: 'react', label: 'REACT', Icon: FaReact },
    { id: 'robot', label: 'ROBOT', Icon: FaRobot },
    { id: 'ghost', label: 'GHOST', Icon: FaGhost },
    { id: 'cat', label: 'CAT', Icon: FaCat },
    { id: 'dragon', label: 'DRAGON', Icon: FaDragon },
    { id: 'astronaut', label: 'ASTRONAUT', Icon: FaUserAstronaut },
    { id: 'ninja', label: 'NINJA', Icon: FaUserNinja },
    { id: 'skull', label: 'SKULL', Icon: FaSkull },
    { id: 'alien', label: 'ALIEN', Icon: FaRedditAlien },
];

const AVATAR_IDS = AVATARS.map((avatar) => avatar.id);

const AVATARS_BY_ID = AVATARS.reduce((acc, avatar) => {
    acc[avatar.id] = avatar;
    return acc;
}, {});

export { AVATARS, AVATAR_IDS, AVATARS_BY_ID };
