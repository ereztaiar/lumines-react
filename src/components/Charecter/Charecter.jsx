import React from 'react';
import {FaRegGrinStars} from "react-icons/fa";

const Character = props => {

    const {
        styles:{
            characterStyle
        }
    } = props;

    return (
        <div className={characterStyle.character}>
            <FaRegGrinStars/>
        </div>
    )
}

export default Character;