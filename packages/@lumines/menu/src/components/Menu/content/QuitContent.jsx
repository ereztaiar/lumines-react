import React, { useEffect, useRef } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useKeys, KEYS } from "@lumines/core";
import { useRouter } from "@lumines/game-router/src/context/routerContext";
import playStyle from "@lumines/menu/src/styles/play.less";

const QuitContent = (props) => {
    const {} = props;

    const { dispatch: routerDispatch } = useRouter();
    const { state: { key } } = useKeys();
    // the Enter that expanded the panel is still held on mount — skip it
    const firstRunRef = useRef(true);

    useEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
            return;
        }

        switch (key) {
            case KEYS.ENTER:
            case KEYS.SPACE:
                routerDispatch({ type: 'reset' });
                break;
            default:
                break;
        }
    }, [key]);

    return (
        <section className={playStyle.options}>
            <span
                className={`${playStyle.button} ${playStyle.focused}`}
                onClick={() => { routerDispatch({ type: 'reset' }) }}
            >
                <FaPowerOff />
                <span className={playStyle.label}>QUIT TO TITLE</span>
            </span>
        </section>
    );
};

export default QuitContent;
