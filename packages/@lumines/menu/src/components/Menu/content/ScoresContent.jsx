import React, { useState, useEffect, useRef } from 'react';
import { getLeaderboard } from 'Util/leaderboard';
import { useKeys, KEYS } from "@lumines/core";
import { nextIndex, prevIndex } from "@lumines/menu/src/components/Menu/content/playFocus";
import scoresStyle from '@lumines/menu/src/styles/scores.less';

const modes = [
    { id: "arcade", label: "ARCADE" },
    { id: "time-attack", label: "TIME ATTACK" },
];

const ScoresContent = (props) => {
    const {} = props;

    const { state: { key } } = useKeys();
    const [modeIndex, setModeIndex] = useState(0);
    // the Enter that expanded the panel is still held on mount — skip it
    const firstRunRef = useRef(true);

    useEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
            return;
        }

        switch (key) {
            case KEYS.ARROW_RIGHT:
                setModeIndex((i) => nextIndex(i, modes.length));
                break;
            case KEYS.ARROW_LEFT:
                setModeIndex((i) => prevIndex(i, modes.length));
                break;
            default:
                break;
        }
    }, [key]);

    const mode = modes[modeIndex];
    const entries = getLeaderboard(mode.id);

    return (
        <section>
            <div className={scoresStyle.tabs}>
                {modes.map((m, i) => (
                    <span
                        key={m.id}
                        className={`${scoresStyle.tab} ${i === modeIndex ? scoresStyle.activeTab : ''}`}
                        onClick={() => setModeIndex(i)}
                    >
                        {m.label}
                    </span>
                ))}
            </div>
            <table className={scoresStyle.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>NAME</th>
                        <th>SCORE</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{entry.name}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ScoresContent;
