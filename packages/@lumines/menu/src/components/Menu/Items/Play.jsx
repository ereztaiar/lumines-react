import React from "react";
import {FaGamepad} from "react-icons/fa";
import MenuItem from "@lumines/menu/src/components/Menu/MenuItem";

const Play = props => {
    const { selected } = props;
    return (
        <MenuItem icon={<FaGamepad />} color={"#e6af6e"} active={selected}>
            <section>start playing</section>
        </MenuItem>
    );
};

export default Play;