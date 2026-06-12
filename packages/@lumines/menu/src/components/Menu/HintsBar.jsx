import React from "react";

import hintsStyle from "@lumines/menu/src/styles/hintsBar.less";

const HintsBar = (props) => {
    const {} = props;

    return (
        <footer className={hintsStyle.root}>
            <span className={hintsStyle.hint}><kbd>↑↓</kbd> Navigate</span>
            <span className={hintsStyle.hint}><kbd>⏎</kbd> OK</span>
            <span className={hintsStyle.hint}><kbd>⎋</kbd> Back</span>
        </footer>
    );
};

export default HintsBar;
