import React, {Component} from "react";
import "./Button.scss";
import classNames from "classnames"

function Button({children, ...props}){
    return(
        <button {...props} className={classNames("Button", props.className)}>
            {children}
        </button>
    );
}

export default Button;