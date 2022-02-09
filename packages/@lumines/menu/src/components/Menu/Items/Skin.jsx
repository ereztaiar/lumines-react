import React from 'react';
import { FaBuffer } from "react-icons/fa";
import MenuItem from "@lumines/menu/src/components/Menu/MenuItem";

const Skin = props =>{
    return (
        <MenuItem icon={<FaBuffer/>} color={"#8ce173"} active={false}>
            <section>change settings</section>
        </MenuItem>
    );
};

export default Skin;