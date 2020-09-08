import React, {Component} from "react";
import Field from "../GameField/Field/Field";
import "./GameField.scss";
import classNames from 'classnames';


function GameField({field, myField, cellHandler, isMy, isNotMy}){

    return(
        <div className="fields">
            <div className="fieldUser">
                <h2 className="captionField">My Field</h2>
                <Field
                    className={classNames({fieldNotActive: isMy})}
                    field={myField}
                />
            </div>
            <div className="fieldEnemy">
                <h2 className="captionField">Enemy Field</h2>
                <Field
                    className={classNames({fieldNotActive: isNotMy})}
                    cellHandler={cellHandler}
                    field={field}
                />
            </div>
        </div>
    )
}

export default GameField;