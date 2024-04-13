import { HTMLAttributes } from "react";
import { Header } from "../../header";
import "./style.css";

interface DefaultTemplateUserProps extends HTMLAttributes<HTMLDivElement> { }

function DefaultTemplateUser(props: DefaultTemplateUserProps) {
    return (
        <>
            <div className="body">
                <Header />

                <div {...props} className="main" />
            </div>
        </>
    );
}

export { DefaultTemplateUser };
