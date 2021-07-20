import React from 'react';
import {FaRegGrinStars} from "react-icons/fa";
import useSkin from "../../hooks/useSkin";

const Character = () => {

    const {skin: {character: characterStyle}} = useSkin();

    return (
        <div className={characterStyle.character}>
            <FaRegGrinStars/>
        </div>
    )
}

export default Character;