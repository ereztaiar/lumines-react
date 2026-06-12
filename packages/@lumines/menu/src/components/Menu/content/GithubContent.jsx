import React from 'react';
import { githubLink } from "Assets/paths/";

const GithubContent = (props) => {
    const {} = props;

    return (
        <section>
            <p>
                <a href={"https://github.com/ereztaiar/lumines-react"} target={"_blank"}>Github repository</a>
            </p>
            <p>
                <img
                    src={githubLink}
                    alt="QR Code" />
            </p>
        </section>
    );
};

export default GithubContent;
