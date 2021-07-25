import React from 'react';
import MenuItem from "Components/Menu/MenuItem";
import {FaCog, FaGamepad} from "react-icons/fa";
import menuStyle from "Components/Menu/menu.less";

const Menu = props => {

    return (
        <div className={menuStyle.root}>
            <MenuItem title={"Play Lumines!"} icon={<FaGamepad/>}>
                <section>start playing</section>
            </MenuItem>
            <MenuItem title={"Settings"} icon={<FaCog/>}>
                <section>change settings</section>
            </MenuItem>
        </div>
    );
};

export default Menu;