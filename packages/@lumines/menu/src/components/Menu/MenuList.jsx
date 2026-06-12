import React from "react";

import listStyle from "@lumines/menu/src/styles/menuList.less";

const MenuList = (props) => {
    const { items, highlightIndex, dimmed } = props;

    return (
        <nav className={[listStyle.root, dimmed ? listStyle.dimmed : ""].join(" ")}>
            {items.map((item, index) => (
                <div
                    key={item.name}
                    className={[
                        listStyle.item,
                        index === highlightIndex ? listStyle.highlighted : "",
                    ].join(" ")}
                >
                    {item.label}
                </div>
            ))}
        </nav>
    );
};

export default MenuList;
