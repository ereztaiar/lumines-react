import React, { useState, useEffect } from 'react';
import { default as GameClasses } from './Game.less';
import { useGame } from "@lumines/game-components/src/contexts";
import { useRouter } from "@lumines/game-router/src/context/routerContext";
import { useKeys, KEYS } from "@lumines/core";

const Pause = ({ pause }) => {
    if (!pause) return null;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const { togglePause, resetScore } = useGame();
    const { dispatch } = useRouter();
    const { state: { key } } = useKeys();

    const menuItems = [
        { label: 'CONTINUE', action: () => togglePause(false) },
        { label: 'QUIT', action: () => {
            resetScore();
            dispatch({ type: 'menu' });
        } }
    ];

    useEffect(() => {
        if (!pause) return;

        switch (key) {
            case KEYS.ARROW_UP:
                setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
                break;
            case KEYS.ARROW_DOWN:
                setSelectedIndex((prev) => (prev + 1) % menuItems.length);
                break;
            case KEYS.ENTER:
            case KEYS.SPACE:
                menuItems[selectedIndex].action();
                break;
            case KEYS.ESCAPE:
                togglePause(false);
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

    return (
        <>
            <div className={GameClasses.pauseOverlay} />
            <div className={GameClasses.pauseText}>
                PAUSE
            </div>
            <div className={GameClasses.pauseMenu}>
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`${GameClasses.pauseMenuItem} ${selectedIndex === index ? GameClasses.pauseMenuItemSelected : ''}`}
                        onClick={item.action}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Pause;
