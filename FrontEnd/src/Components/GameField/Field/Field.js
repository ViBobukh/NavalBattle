import React, {Component} from "react";
import Line from "../Line/Line";
import "./Field.scss";


function Field({cellHandler, result, className, field}){

    let lines = field.map((line)=>{
        return <Line
            result={result}
            cellHandler={cellHandler}
            info={line}
            key={line.key}
        />
    });

    return(
        <div className={className}>
            <div className="field">
                {lines}
            </div>
        </div>
    )
}

export default Field;