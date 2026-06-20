import React, { useState, useEffect, useRef } from 'react';
import { useKeys, KEYS } from "@lumines/core";
import { nextIndex, prevIndex } from "@lumines/menu/src/components/Menu/content/playFocus";
import { CONTROL_TABS, getControlRows } from "@lumines/menu/src/components/Menu/content/controlsData";
import controlsStyle from '@lumines/menu/src/styles/controls.less';

const ControlsContent = (props) => {
    const {} = props;

    const { state: { key } } = useKeys();
    const [tabIndex, setTabIndex] = useState(0);
    // the Enter that expanded the panel is still held on mount — skip it
    const firstRunRef = useRef(true);

    useEffect(() => {
        if (firstRunRef.current) {
            firstRunRef.current = false;
            return;
        }

        switch (key) {
            case KEYS.ARROW_RIGHT:
                setTabIndex((i) => nextIndex(i, CONTROL_TABS.length));
                break;
            case KEYS.ARROW_LEFT:
                setTabIndex((i) => prevIndex(i, CONTROL_TABS.length));
                break;
            default:
                break;
        }
    }, [key]);

    const tab = CONTROL_TABS[tabIndex];
    const rows = getControlRows(tab.id);

    return (
        <section>
            <div className={controlsStyle.tabs}>
                {CONTROL_TABS.map((t, i) => (
                    <span
                        key={t.id}
                        className={`${controlsStyle.tab} ${i === tabIndex ? controlsStyle.activeTab : ''}`}
                        onClick={() => setTabIndex(i)}
                    >
                        {t.label}
                    </span>
                ))}
            </div>
            <table className={controlsStyle.table}>
                <thead>
                    <tr>
                        <th>ACTION</th>
                        <th>INPUT</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.action}>
                            <td>{row.action}</td>
                            <td>{row.input}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default ControlsContent;
