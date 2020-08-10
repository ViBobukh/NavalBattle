import React, {Component} from "react";
import Field from "../GameField/Field/Field";
import "./GameField.scss";
import classNames from "classnames";

function GameField(props){
    return(
        <div className="fields">
            <div className="fieldUser">
                <h2 className="captionField">My Field</h2>
                <Field/>
            </div>
            <div className="fieldEnemy">
                <h2 className="captionField">Enemy Field</h2>
                <Field/>
            </div>
        </div>
    )
}

export default GameField;