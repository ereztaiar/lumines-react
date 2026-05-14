import React, { useEffect } from "react";
import {
  Play,
  Settings,
  Skin,
  Github,
  Scores,
} from "@lumines/menu/src/components/Menu/Items";

import menuStyle from "@lumines/menu/src/styles/menu.less";
import { useMenu } from "@lumines/menu/index";

const Menu = (props) => {
  const {} = props;

  const {
    state: { menuOrder, selected, menuLocked },
  } = useMenu();

  const menuItems = menuOrder.map((item, index) => {
    switch (item) {
      case "play": {
        return (
          <Play key={"play"} selected={index === 0 && selected === "play"} />
        );
      }
      case "setting": {
        return (
          <Settings
            key={"setting"}
            selected={index === 0 && selected === "setting"}
          />
        );
      }
      case "skin": {
        return (
          <Skin key={"skin"} selected={index === 0 && selected === "skin"} />
        );
      }
      case "github": {
        return (
          <Github
            key={"github"}
            selected={index === 0 && selected === "github"}
          />
        );
      }
      case "scores": {
        return (
          <Scores
            key={"scores"}
            selected={index === 0 && selected === "scores"}
          />
        );
      }
    }
  });

  let lockedClass;

  if (menuLocked === null) {
    lockedClass = "";
  } else if (menuLocked === true) {
    lockedClass = menuStyle.locked;
  } else if (menuLocked === false) {
    lockedClass = menuStyle.unlocked;
  }

  return (
    <div className={menuStyle.root}>
      <div className={menuStyle.menu}>
        <div className={menuStyle.title}>MENU</div>
        <div className={[menuStyle["menu-items"], lockedClass].join(" ")}>
          {menuItems}
        </div>
      </div>
    </div>
  );
};

export default Menu;
