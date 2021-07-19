import React from 'react';
import {FaRegGrinStars} from "react-icons/fa";
import {default as Styles} from '../../skins/orange/character.less';

const Character = () => {
    return (
        <div className={Styles.character}>
            <FaRegGrinStars/>
        </div>
    )
}

export default Character;