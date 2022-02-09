import React, { useState } from 'react';
import { Play, Settings, Skin, Github } from "@lumines/menu/src/components/Menu/Items";
import menuStyle from "@lumines/menu/src/styles/menu.less";
import useKey from "Hooks/useKey";

const Menu = props => {

    const {setMenuActive} = props;

    const [menuItems, setMenuItems] = useState([
        <Play key={"play"}/>,
        <Settings key={"setting"}/>,
        <Skin key={"skin"}/>,
        <Github key={"Github"}/>
    ]);

    useKey(key => {
        switch (key) {
            case "Escape":
            case "Enter":
                setMenuActive(false);
                break;
            case "ArrowUp":
                const lastItem = menuItems.pop();
                menuItems.unshift(lastItem);
                break;
            case "ArrowDown":
                const firstItem = menuItems.shift();
                menuItems.push(firstItem);
                break;
            default:
                break;
        }
        setMenuItems([...menuItems]);
    });


    return (
        <div className={menuStyle.root}>
            <div className={menuStyle.title}>MENU</div>
            <div className={menuStyle["menu-items"]}>
                {menuItems}
            </div>
        </div>
    );
};

export default Menu;