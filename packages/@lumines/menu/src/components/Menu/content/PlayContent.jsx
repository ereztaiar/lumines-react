import React, { useState, useEffect, useRef } from "react";
import { GiAlarmClock } from "react-icons/gi";
import { SiApplearcade } from "react-icons/si";
import { useKeys, KEYS } from "@lumines/core";
import { useRouter } from "@lumines/game-router/src/context/routerContext";
import { nextIndex, prevIndex } from "@lumines/menu/src/components/Menu/content/playFocus";
import playStyle from "@lumines/menu/src/styles/play.less";

const modes = [
    { id: "arcade", label: "ARCADE", Icon: SiApplearcade },
    { id: "time-attack", label: "TIME ATTACK", Icon: GiAlarmClock },
];

const PlayContent = (props) => {
    const {} = props;

    const { dispatch: routerDispatch } = useRouter();
    const { state: { key } } = useKeys();
    const [focusedIndex, setFocusedIndex] = useState(0);
    // the Enter that expanded the panel is still held on mount — skip it
    const firstRunRef = useRef(true);

    useEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
            return;
        }

        switch (key) {
            case KEYS.ARROW_RIGHT:
                setFocusedIndex((i) => nextIndex(i, modes.length));
                break;
            case KEYS.ARROW_LEFT:
                setFocusedIndex((i) => prevIndex(i, modes.length));
                break;
            case KEYS.ENTER:
            case KEYS.SPACE:
                routerDispatch({ type: 'start_game' });
                break;
            default:
                break;
        }
    }, [key]);

    return (
        <section className={playStyle.options}>
            {modes.map((mode, i) => (
                <span
                    key={mode.id}
                    className={`${playStyle.button} ${i === focusedIndex ? playStyle.focused : ''}`}
                    onMouseEnter={() => setFocusedIndex(i)}
                    onClick={() => { routerDispatch({ type: 'start_game' }) }}
                >
                    <mode.Icon />
                    <span className={playStyle.label}>{mode.label}</span>
                </span>
            ))}
        </section>
    );
};

export default PlayContent;
