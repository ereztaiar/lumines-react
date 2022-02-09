import React from 'react';
import { FaCogs } from "react-icons/fa";
import MenuItem from "@lumines/menu/src/components/Menu/MenuItem";

const Settings = props =>{
    return (
        <MenuItem icon={<FaCogs/>} color={"#75e5e7"} active={false}>
            <section>change settings</section>
        </MenuItem>
    );
};

export default Settings;