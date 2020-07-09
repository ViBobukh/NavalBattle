import React, {Component} from "react";
import "./Button.scss";

function Button({children, ...props}){
    return(
        <button {...props} className="commonButton">
            {children}
        </button>
    );
}

export default Button;