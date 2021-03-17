import React from "react";
import "./Page.scss";

function Page({children, ...props}) {
    return(
        <div {...props} className="Page">
            {children}
        </div>
    )
}

export default Page;