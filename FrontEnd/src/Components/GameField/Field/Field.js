import React, {Component} from "react";
import Line from "../Line/Line";
import "./Field.scss";
import classNames from 'classnames';


function Field({cellHandler, isActive, result, field}){

    let lines = field.map((line)=>{
        return <Line
            result={result}
            cellHandler={cellHandler}
            info={line}
            key={line.key}
        />
    });

    return(
        <div className={classNames("Field", {"Field_isActive": isActive})}>
            {lines}
        </div>
    )
}

export default Field;