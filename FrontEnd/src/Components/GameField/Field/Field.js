import React, {Component} from "react";
import Line from "../Line/Line";
import {createField} from "../CreateLine/CreateLine";
import "./Field.scss";

function Field({cellHandler}){
    let user = createField();

    let lines = user.map((line)=>{
        return <Line
            cellHandler={cellHandler}
            info={line}
            key={line.key}
        />
    });

    return(
        <div className="mainDivField">
            <div className="field">
                {lines}
            </div>
        </div>
    )
}

export default Field;