import React from 'react';
import {FaGithub} from "react-icons/fa";
import MenuItem from "@lumines/menu/src/components/Menu/MenuItem";
import {githubLink} from "Assets/paths/";

const Github = props => {
    return (
        <MenuItem icon={<FaGithub/>} color={"#a974e0"} active={false}>
            <section>
                <p>
                    <a href={"https://github.com/ereztaiar/lumines-react"} target={"_blank"}>Github repository</a>
                </p>
                <p>
                    <img
                         src={githubLink}
                         alt="QR Code"/>
                </p>
            </section>
        </MenuItem>
    );
};

export default Github;