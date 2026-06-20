import { FaGamepad, FaCogs, FaBuffer, FaKeyboard, FaGithub, FaTrophy, FaPowerOff } from "react-icons/fa";

import { MENU_ITEMS } from "@lumines/menu/src/config/menuConfig";
import PlayContent from "@lumines/menu/src/components/Menu/content/PlayContent";
import SettingsContent from "@lumines/menu/src/components/Menu/content/SettingsContent";
import SkinContent from "@lumines/menu/src/components/Menu/content/SkinContent";
import ControlsContent from "@lumines/menu/src/components/Menu/content/ControlsContent";
import GithubContent from "@lumines/menu/src/components/Menu/content/GithubContent";
import ScoresContent from "@lumines/menu/src/components/Menu/content/ScoresContent";
import QuitContent from "@lumines/menu/src/components/Menu/content/QuitContent";

const ITEM_REGISTRY = {
    play: { Icon: FaGamepad, Content: PlayContent },
    setting: { Icon: FaCogs, Content: SettingsContent },
    skin: { Icon: FaBuffer, Content: SkinContent },
    controls: { Icon: FaKeyboard, Content: ControlsContent },
    github: { Icon: FaGithub, Content: GithubContent },
    scores: { Icon: FaTrophy, Content: ScoresContent },
    quit: { Icon: FaPowerOff, Content: QuitContent },
};

const getMenuItems = () => MENU_ITEMS.map((item) => ({ ...item, ...ITEM_REGISTRY[item.name] }));

export { getMenuItems };
