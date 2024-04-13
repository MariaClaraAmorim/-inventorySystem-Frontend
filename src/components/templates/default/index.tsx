import { HTMLAttributes } from "react";
import { Header } from "../../header";
import Sidebar from "../../sidebar";

import "./style.css";

interface DefaultTemplateProps extends HTMLAttributes<HTMLDivElement> {}

function DefaultTemplate(props: DefaultTemplateProps) {
  return (
    <>
      <div className="body">
        <Header />

        <Sidebar />

        <div {...props} className="main" />
      </div>
    </>
  );
}

export { DefaultTemplate };
