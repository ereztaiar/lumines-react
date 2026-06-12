import React from "react";

import MenuList from "@lumines/menu/src/components/Menu/MenuList";
import MenuTile from "@lumines/menu/src/components/Menu/MenuTile";
import DetailPanel from "@lumines/menu/src/components/Menu/DetailPanel";
import HintsBar from "@lumines/menu/src/components/Menu/HintsBar";
import { getMenuItems } from "@lumines/menu/src/components/Menu/itemRegistry";

import menuStyle from "@lumines/menu/src/styles/menu.less";
import { useMenu } from "@lumines/menu/index";

const menuItems = getMenuItems();

const Menu = (props) => {
  const {} = props;

  const {
    state: { highlightIndex, selected, menuLocked },
  } = useMenu();

  const activeItem = menuItems[highlightIndex];

  return (
    <div className={menuStyle.root} style={{ "--accent": activeItem.color }}>
      <div className={menuStyle.accentSeam}></div>
      <div className={menuStyle.logo}>LUMINES</div>
      <MenuList
        items={menuItems}
        highlightIndex={highlightIndex}
        dimmed={menuLocked === true}
      />
      <MenuTile item={activeItem} />
      <DetailPanel item={activeItem} selected={selected} menuLocked={menuLocked} />
      <HintsBar />
    </div>
  );
};

export default Menu;
