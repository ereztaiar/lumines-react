import React, { useEffect, useReducer, useRef } from 'react';
import { FaCheck, FaTimes, FaVolumeUp, FaVolumeMute, FaTag } from 'react-icons/fa';
import { useKeys, KEYS } from '@lumines/core';
import { AVATARS, AVATAR_IDS } from '@lumines/game-components/src/components/Character/avatars';
import { getGameSettings, normalizeSettings, saveGameSettings } from 'Util/gameSettings';
import { ROW_REFLECTION, ROW_AVATAR, ROW_SOUND, ROW_SKIN_NAME, initPanelState, settingsPanelReducer } from '@lumines/menu/src/components/Menu/content/settingsPanel';
import settingsStyle from '@lumines/menu/src/styles/settings.less';

const initState = () => initPanelState({ settings: normalizeSettings(getGameSettings(), AVATAR_IDS) });

const SettingsContent = (props) => {
    const {} = props;

    const { state: { key } } = useKeys();
    const [state, dispatch] = useReducer(settingsPanelReducer, undefined, initState);
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
        saveGameSettings(state.settings);
    }, [state.settings]);

    const { row, avatarIndex, settings } = state;

    return (
        <section className={settingsStyle.panel}>
            <p>change settings</p>
            <div className={settingsStyle.row}>
                <span
                    className={`${settingsStyle.toggleButton} ${row === ROW_REFLECTION ? settingsStyle.focused : ''} ${settings.reflection ? settingsStyle.active : ''}`}
                    onMouseEnter={() => dispatch({ type: 'focus_row', row: ROW_REFLECTION })}
                    onClick={() => {
                        dispatch({ type: 'focus_row', row: ROW_REFLECTION });
                        dispatch({ type: 'activate' });
                    }}
                >
                    {settings.reflection ? <FaCheck /> : <FaTimes />}
                    <span className={settingsStyle.label}>REFLECTION</span>
                </span>
            </div>
            <div className={settingsStyle.avatarRow}>
                <span className={settingsStyle.label}>AVATAR</span>
                <div className={settingsStyle.avatars}>
                    {AVATARS.map((avatar, i) => {
                        const { id, label, Icon } = avatar;
                        const focused = row === ROW_AVATAR && i === avatarIndex;
                        const chosen = settings.avatarId === id;
                        return (
                            <span
                                key={id}
                                title={label}
                                className={`${settingsStyle.avatarTile} ${focused ? settingsStyle.focused : ''} ${chosen ? settingsStyle.chosen : ''}`}
                                onMouseEnter={() => dispatch({ type: 'focus_avatar', index: i })}
                                onClick={() => dispatch({ type: 'focus_avatar', index: i })}
                            >
                                <Icon />
                            </span>
                        );
                    })}
                </div>
            </div>
            <div className={settingsStyle.row}>
                <span
                    className={`${settingsStyle.toggleButton} ${row === ROW_SOUND ? settingsStyle.focused : ''} ${!settings.muted ? settingsStyle.active : ''}`}
                    onMouseEnter={() => dispatch({ type: 'focus_row', row: ROW_SOUND })}
                    onClick={() => {
                        dispatch({ type: 'focus_row', row: ROW_SOUND });
                        dispatch({ type: 'activate' });
                    }}
                >
                    {settings.muted ? <FaVolumeMute /> : <FaVolumeUp />}
                    <span className={settingsStyle.label}>SOUND</span>
                </span>
            </div>
            <div className={settingsStyle.row}>
                <span
                    className={`${settingsStyle.toggleButton} ${row === ROW_SKIN_NAME ? settingsStyle.focused : ''} ${settings.showSkinName ? settingsStyle.active : ''}`}
                    onMouseEnter={() => dispatch({ type: 'focus_row', row: ROW_SKIN_NAME })}
                    onClick={() => {
                        dispatch({ type: 'focus_row', row: ROW_SKIN_NAME });
                        dispatch({ type: 'activate' });
                    }}
                >
                    {settings.showSkinName ? <FaCheck /> : <FaTimes />}
                    <FaTag />
                    <span className={settingsStyle.label}>SHOW SKIN NAME</span>
                </span>
            </div>
        </section>
    );
};

export default SettingsContent;
