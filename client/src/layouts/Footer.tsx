import React from "react";
import { AnchorTag } from "src/components/general";
import GitHubIcon from "@material-ui/icons/GitHub";
interface Props {}

const Footer: React.FC<Props> = () => {
    return (
        <div className="footer">
            <AnchorTag
                href={"https://github.com/zzid"}
                children={<GitHubIcon />}
            />
        </div>
    );
};
export default Footer;
