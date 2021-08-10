import React from "react";

interface Props {
    href: string;
    children: JSX.Element;
}

const AnchorTag: React.FC<Props> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
);
export default AnchorTag;
