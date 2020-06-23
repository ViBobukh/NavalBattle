import React, {Component} from "react";

function Page({children, ...props}) {
    return(
        <div {...props} className="page">
            {children}
        </div>
    )

}

export default Page;