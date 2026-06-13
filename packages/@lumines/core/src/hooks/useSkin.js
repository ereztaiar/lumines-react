import {useEffect, useRef, useState} from "react";
import {SKINS_BY_ID, SKIN_IDS} from 'Skins/index';
import {getSkinSettings, normalizeSettings} from 'Util/skinSettings';
import {getUnlockedSkinIds, unlockSkin} from 'Util/skinUnlocks';
import {buildPlaylist, advanceIndex, advanceIndexBy} from './skinRotation';
import useKey from "@lumines/core/src/hooks/useKey";// todo: replace with context

// settings are read once per game mount — menu and game never coexist
const initRotation = () => {
    const settings = normalizeSettings(getSkinSettings(), SKIN_IDS, getUnlockedSkinIds());
    return {
        mode: settings.mode,
        playlist: buildPlaylist(settings, SKIN_IDS),
    };
};

const useSkin = props => {

    const {score = 0} = props;
    const [{mode, playlist}] = useState(initRotation);
    const [playlistIndex, setPlaylistIndex] = useState(0);

    const currentSkinId = playlist[playlistIndex % playlist.length];
    const skin = SKINS_BY_ID[currentSkinId].module;

    useKey((key, repeat, code) => {
        if (code === 'KeyS') {
            setPlaylistIndex((i) => advanceIndex(mode, i, playlist.length));
        }
    });

    useEffect(() => {
        unlockSkin(currentSkinId);
    }, [currentSkinId]);

    // score jumps by the clear size, so it rarely equals a multiple of 100 —
    // advance one skin per 100-point stage boundary crossed instead
    const stage = Math.floor(score / 100);
    const prevStageRef = useRef(0);

    useEffect(() => {
            const steps = stage - prevStageRef.current;
            prevStageRef.current = stage; // also resyncs after a score reset
            if (steps > 0) {
                setPlaylistIndex((i) => advanceIndexBy(mode, i, playlist.length, steps));
            }
        },
        [stage])

    return {
        skin,
        currentSkinId
    }
};

export default useSkin;
