import React, {Component} from "react";
import Field from "../GameField/Field/Field";
import "./GameField.scss";


function GameField({field, myField, cellHandler, isMy, isNotMy}){

    return(
        <div className="GameField">
            <div className="GameField-User">
                <h2 className="GameField-Caption">My Field</h2>
                <Field
                    isActive={isMy}
                    field={myField}
                />
            </div>
            <div className="GameField-Enemy">
                <h2 className="GameField-Caption">Enemy Field</h2>
                <Field
                    isActive={isNotMy}
                    cellHandler={cellHandler}
                    field={field}
                />
            </div>
        </div>
    )
}

export default GameField;