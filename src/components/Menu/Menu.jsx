import React, {useState} from 'react';
import {Play, Settings, Skin, Github} from "Components/Menu/Items";
import menuStyle from "Components/Menu/styles/menu.less";
import useKey from "Hooks/useKey";

const Menu = props => {

    const [menuItems, setMenuItems] = useState([
        <Play key={"play"}/>,
        <Settings key={"setting"}/>,
        <Skin key={"skin"}/>,
        <Github key={"Github"}/>
    ]);

    useKey(key => {
        console.log(key)
        switch (key) {
            case "Enter":
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