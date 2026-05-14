import React from 'react';
import { FaBuffer } from "react-icons/fa";
import MenuItem from "@lumines/menu/src/components/Menu/MenuItem";

const Skin = props => {
    const { selected } = props;
    return (
        <MenuItem icon={<FaBuffer size={80}/>} color={"#8ce173"} active={selected}>
            <section>change settings</section>
        </MenuItem>
    );
};

export default Skin;