import React from "react";

import tileStyle from "@lumines/menu/src/styles/menuTile.less";

const MenuTile = (props) => {
    const { item } = props;

    const { Icon, label, name } = item;

    return (
        <div className={tileStyle.root}>
            <div key={name} className={tileStyle.card}>
                <Icon size={96} />
                <div className={tileStyle.banner}>{label}</div>
            </div>
        </div>
    );
};

export default MenuTile;
