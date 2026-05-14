import React from "react";
import { FaGamepad } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { SiApplearcade  } from "react-icons/si";
import MenuItem from "@lumines/menu/src/components/Menu/MenuItem";
import { useMenu } from "@lumines/menu/src/context/menu";
import { useRouter } from "@lumines/game-router/src/context/routerContext";
import playStyle from "@lumines/menu/src/styles/play.less";

const Play = props => {
    const { selected } = props;

    const { state, dispatch } = useMenu();
    const { state: { isMenu }, dispatch: routerDispatch } = useRouter();
    return (
        <MenuItem icon={<FaGamepad size={80}/>} color={"#e6af6e"} active={selected}>
            <section className={playStyle.options}>
                <span className={playStyle.button} onClick={() => { routerDispatch({ type: 'start_game' }) }}><SiApplearcade /></span>
                <span className={playStyle.button} onClick={() => { routerDispatch({ type: 'start_game' }) }}><GiAlarmClock /></span>
            </section>
        </MenuItem>
    );
};

export default Play;