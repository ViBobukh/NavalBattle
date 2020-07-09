import React, {Component} from "react";
import classNames from 'classnames';
import "./Cell.scss";

function CellWithoutBorder({children, ...props}) {
    return(
        <div className="fieldCell borderInvisible" {...props}>{children}</div>
    )
}

function CellWithBorder({children, ...props}) {
    return(
        <div className={classNames("fieldCell", "border")} {...props}>{children}</div>
    )
}

export {CellWithBorder, CellWithoutBorder};
