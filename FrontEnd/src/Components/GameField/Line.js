import React, {Component} from "react";

function Line({children, ...props}) {
    return(
        <tr className="fieldLine">{children}</tr>
    )
}

export default Line;