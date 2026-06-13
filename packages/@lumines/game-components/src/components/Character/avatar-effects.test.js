const getAvatarEffectClass = require('./avatarEffects').default;

describe('getAvatarEffectClass', () => {
    const effectsStyle = {
        react: 'react_abcde',
        robot: 'robot_abcde',
        ghost: 'ghost_abcde',
        cat: 'cat_abcde',
        dragon: 'dragon_abcde',
        astronaut: 'astronaut_abcde',
        ninja: 'ninja_abcde',
        skull: 'skull_abcde',
        alien: 'alien_abcde',
    };

    it('returns the matching class for each known avatar id', () => {
        Object.keys(effectsStyle).forEach((avatarId) => {
            expect(getAvatarEffectClass(effectsStyle, avatarId)).toBe(effectsStyle[avatarId]);
        });
    });

    it('returns an empty string for an unknown avatar id', () => {
        expect(getAvatarEffectClass(effectsStyle, 'unknown')).toBe('');
    });
});
