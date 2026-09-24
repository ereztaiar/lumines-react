import React from 'react';
import { githubLink, linkedinLink } from "Assets/paths/";

const LINKS = [
    { label: 'Github repository', href: 'https://github.com/ereztaiar/lumines-react', qr: githubLink },
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/erez-taiar/', qr: linkedinLink },
];

const GithubContent = (props) => {
    const {} = props;

    return (
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {LINKS.map(({ label, href, qr }) => (
                <div key={href}>
                    <p>
                        <a href={href} target={"_blank"} rel={"noopener noreferrer"}>{label}</a>
                    </p>
                    <p>
                        <img src={qr} alt={`${label} QR code`} width={180} height={180} />
                    </p>
                </div>
            ))}
        </section>
    );
};

export default GithubContent;
