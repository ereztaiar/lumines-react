import React from 'react';
import flare from "../../assets/images/flare.png";
import {FaRegGrinStars} from "react-icons/fa";

const Character = () =>{
    return (
        <div className={"character"}>
            <img src={flare} alt={"flare"}/>
            <FaRegGrinStars/>
        </div>
    )
}

export default Character;