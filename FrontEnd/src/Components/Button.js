import React, {Component} from "react";

function Button({children, ...props}){
    return(
        <button {...props} className="commonButton">
            {children}
        </button>
    );
}

export default Button;