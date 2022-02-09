import React from 'react';
import { FaReact } from "react-icons/fa";

const Character = props => {

    const {
        styles:{
            characterStyle
        }
    } = props;

    return (
        <div className={characterStyle.character}>
            <FaReact/>
        </div>
    )
}

export default Character;