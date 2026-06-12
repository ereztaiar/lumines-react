import React, { useEffect, useReducer, useRef } from "react";
import { FaListOl, FaImage, FaRandom, FaLock, FaCheck } from "react-icons/fa";
import { useKeys, KEYS } from "@lumines/core";
import { SKINS, SKIN_IDS } from "Skins/index";
import { getSkinSettings, normalizeSettings, saveSkinSettings } from "Util/skinSettings";
import { getUnlockedSkinIds } from "Util/skinUnlocks";
import { MODES, ROW_MODES, ROW_SKINS, initPanelState, skinPanelReducer, settingsForStorage } from "@lumines/menu/src/components/Menu/content/skinPanel";
import skinStyle from "@lumines/menu/src/styles/skin.less";

const MODE_ICONS = {
    sequence: FaListOl,
    single: FaImage,
    shuffle: FaRandom,
};

const MODE_HINTS = {
    sequence: 'Play through every skin in order — new skins unlock as you reach them.',
    single: 'Pick one skin and stick with it.',
    shuffle: 'Rotate randomly through the skins you check below.',
};

const initState = () => {
    const unlockedIds = getUnlockedSkinIds();
    return initPanelState({
        settings: normalizeSettings(getSkinSettings(), SKIN_IDS, unlockedIds),
        skinIds: SKIN_IDS,
        unlockedIds,
    });
};

const SkinContent = (props) => {
    const {} = props;

    const { state: { key } } = useKeys();
    const [state, dispatch] = useReducer(skinPanelReducer, undefined, initState);
    // the Enter that expanded the panel is still held on mount — skip it
    const firstRunRef = useRef(true);
    // don't write storage just for opening the panel
    const firstSaveRef = useRef(true);

    useEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
            return;
        }

        switch (key) {
            case KEYS.ARROW_RIGHT:
                dispatch({ type: 'right' });
                break;
            case KEYS.ARROW_LEFT:
                dispatch({ type: 'left' });
                break;
            case KEYS.ARROW_UP:
                dispatch({ type: 'up' });
                break;
            case KEYS.ARROW_DOWN:
                dispatch({ type: 'down' });
                break;
            case KEYS.ENTER:
            case KEYS.SPACE:
                dispatch({ type: 'activate' });
                break;
            default:
                break;
        }
    }, [key]);

    useEffect(() => {
        if (firstSaveRef.current) {
            firstSaveRef.current = false;
            return;
        }
        saveSkinSettings(settingsForStorage(state));
    }, [state.settings]);

    const { row, modeIndex, skinFocusIndex, settings, unlockedIds } = state;

    return (
        <section className={skinStyle.panel}>
            <div className={skinStyle.modes}>
                {MODES.map((mode, i) => {
                    const Icon = MODE_ICONS[mode.id];
                    const focused = row === ROW_MODES && i === modeIndex;
                    const active = settings.mode === mode.id;
                    return (
                        <span
                            key={mode.id}
                            className={`${skinStyle.modeButton} ${focused ? skinStyle.focused : ''} ${active ? skinStyle.active : ''}`}
                            onMouseEnter={() => dispatch({ type: 'focus_mode', index: i })}
                            onClick={() => dispatch({ type: 'activate' })}
                        >
                            <Icon />
                            <span className={skinStyle.label}>{mode.label}</span>
                        </span>
                    );
                })}
            </div>
            <p className={skinStyle.hint}>{MODE_HINTS[settings.mode]}</p>
            <div className={skinStyle.skins}>
                {SKINS.map((skin, i) => {
                    const locked = !unlockedIds.includes(skin.id);
                    const focused = row === ROW_SKINS && i === skinFocusIndex;
                    const selected = settings.mode === 'single' && settings.selectedSkinId === skin.id;
                    const enabled = settings.mode === 'shuffle' && settings.enabledSkinIds.includes(skin.id);
                    return (
                        <span
                            key={skin.id}
                            className={`${skinStyle.skinTile} ${focused ? skinStyle.focused : ''} ${locked ? skinStyle.locked : ''} ${selected || enabled ? skinStyle.chosen : ''}`}
                            onMouseEnter={() => dispatch({ type: 'focus_skin', index: i })}
                            onClick={() => dispatch({ type: 'activate' })}
                        >
                            <span className={skinStyle.indicator}>
                                {locked ? <FaLock /> : (selected || enabled) ? <FaCheck /> : null}
                            </span>
                            <span className={skinStyle.label}>{locked ? '???' : skin.label}</span>
                        </span>
                    );
                })}
            </div>
        </section>
    );
};

export default SkinContent;
