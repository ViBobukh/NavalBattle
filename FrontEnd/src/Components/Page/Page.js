import React, {Component} from "react";
import "./Page.scss";

function Page({children, ...props}) {
    return(
        <div {...props} className="page">
            {children}
        </div>
    )

}

export default Page;