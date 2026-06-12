import { FaGamepad, FaCogs, FaBuffer, FaGithub, FaTrophy } from "react-icons/fa";

import { MENU_ITEMS } from "@lumines/menu/src/config/menuConfig";
import PlayContent from "@lumines/menu/src/components/Menu/content/PlayContent";
import SettingsContent from "@lumines/menu/src/components/Menu/content/SettingsContent";
import SkinContent from "@lumines/menu/src/components/Menu/content/SkinContent";
import GithubContent from "@lumines/menu/src/components/Menu/content/GithubContent";
import ScoresContent from "@lumines/menu/src/components/Menu/content/ScoresContent";

const ITEM_REGISTRY = {
    play: { Icon: FaGamepad, Content: PlayContent },
    setting: { Icon: FaCogs, Content: SettingsContent },
    skin: { Icon: FaBuffer, Content: SkinContent },
    github: { Icon: FaGithub, Content: GithubContent },
    scores: { Icon: FaTrophy, Content: ScoresContent },
};

const getMenuItems = () => MENU_ITEMS.map((item) => ({ ...item, ...ITEM_REGISTRY[item.name] }));

export { getMenuItems };
