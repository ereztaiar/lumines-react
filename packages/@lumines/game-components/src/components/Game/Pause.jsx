import React, { useState, useEffect } from 'react';
import { FaPlay, FaVolumeUp, FaVolumeMute, FaSignOutAlt } from 'react-icons/fa';
import { default as GameClasses } from './Game.less';
import { useGame } from "@lumines/game-components/src/contexts";
import { useRouter } from "@lumines/game-router/src/context/routerContext";
import { useKeys, KEYS } from "@lumines/core";
import * as audioEngine from 'Util/audioEngine';

const NAV_SOUND = { notes: [392.00, 493.88], duration: 0.14, volume: 0.07, type: 'triangle' };
const SELECT_SOUND = { notes: [523.25, 659.25, 783.99], duration: 0.20, volume: 0.09, type: 'triangle' };

const Pause = (props) => {
    const { pause } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { togglePause, resetScore, muted, toggleMuted } = useGame();
    const { dispatch } = useRouter();
    const { state: { key } } = useKeys();

    const menuItems = [
        {
            label: 'CONTINUE',
            Icon: FaPlay,
            color: '#8ce173',
            action: () => togglePause(false),
        },
        {
            label: muted ? 'UNMUTE' : 'MUTE',
            Icon: muted ? FaVolumeMute : FaVolumeUp,
            color: '#75e5e7',
            action: () => {
                if (!muted) audioEngine.playChord(SELECT_SOUND.notes, SELECT_SOUND);
                toggleMuted();
            },
        },
        {
            label: 'EXIT',
            Icon: FaSignOutAlt,
            color: '#e06c75',
            action: () => {
                if (!muted) audioEngine.playChord(SELECT_SOUND.notes, SELECT_SOUND);
                resetScore();
                dispatch({ type: 'menu' });
            },
        },
    ];

    useEffect(() => {
        if (!pause) return;

        switch (key) {
            case KEYS.ARROW_LEFT:
                setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
                if (!muted) audioEngine.playChord(NAV_SOUND.notes, NAV_SOUND);
                break;
            case KEYS.ARROW_RIGHT:
                setSelectedIndex((prev) => (prev + 1) % menuItems.length);
                if (!muted) audioEngine.playChord(NAV_SOUND.notes, NAV_SOUND);
                break;
            case KEYS.ENTER:
            case KEYS.SPACE:
                menuItems[selectedIndex].action();
                break;
            default:
                break;
        }
    }, [key, pause]);

    useEffect(() => {
        if (pause) {
            setSelectedIndex(0);
        }
    }, [pause]);

    if (!pause) return null;

    return (
        <>
            <div className={GameClasses.pauseOverlay} />
            <div className={GameClasses.pauseText}>PAUSE</div>
            <div className={GameClasses.pauseMenu}>
                {menuItems.map((item, index) => {
                    const { Icon, label, color } = item;
                    const isSelected = selectedIndex === index;
                    return (
                        <button
                            key={index}
                            className={`${GameClasses.pauseMenuTile} ${isSelected ? GameClasses.pauseMenuTileSelected : ''}`}
                            style={{ '--tile-color': color }}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <Icon size={42} />
                            <div className={GameClasses.pauseMenuTileBanner}>{label}</div>
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default Pause;
