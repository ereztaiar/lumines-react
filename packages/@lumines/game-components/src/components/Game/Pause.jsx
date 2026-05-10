import React from 'react';
import { default as GameClasses } from './Game.less';

const Pause = ({ pause }) => {
    if (!pause) return null;

    return (
        <>
            <div className={GameClasses.pauseOverlay} />
            <div className={GameClasses.pauseText}>
                PAUSE
            </div>
        </>
    );
};

export default Pause;
