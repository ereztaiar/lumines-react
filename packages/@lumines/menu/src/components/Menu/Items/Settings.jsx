import React from 'react';
import { FaCogs } from "react-icons/fa";
import MenuItem from "@lumines/menu/src/components/Menu/MenuItem";

const Settings = props => {
    const { selected } = props;

    return (
        <MenuItem icon={<FaCogs size={80}/>} color={"#75e5e7"} active={selected}>
            <section>change settings</section>
            <input type="checkbox" /> use reflection
        </MenuItem>
    );
};

export default Settings;