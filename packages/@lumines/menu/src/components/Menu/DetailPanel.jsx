import React from "react";

import detailStyle from "@lumines/menu/src/styles/detailPanel.less";

const DetailPanel = (props) => {
    const { item, selected, menuLocked } = props;

    const { label, description, Content } = item;

    let lockedClass = "";
    if (menuLocked === true) {
        lockedClass = detailStyle.expanded;
    } else if (menuLocked === false) {
        lockedClass = detailStyle.collapsed;
    }

    return (
        <aside className={detailStyle.root}>
            <h2 className={detailStyle.title}>{label}</h2>
            <p className={detailStyle.description}>{description}</p>
            <div className={[detailStyle.body, lockedClass].join(" ")}>
                {selected !== null && <Content />}
            </div>
        </aside>
    );
};

export default DetailPanel;
