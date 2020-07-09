import React, {Component} from "react";
import {CellWithBorder, CellWithoutBorder} from "./Cell";
import "./Line.scss";

function Line({info}) {
    return (
        <div className="fieldLine">{
            info.cells.map((cell) => {
                    if(info.key === "letters" || cell.key === "num"){
                       return(
                            <CellWithoutBorder  key={cell.key + info.key}>
                                {cell.value}
                            </CellWithoutBorder>
                       )
                    }else{
                        return(
                            <CellWithBorder id={cell.key+info.value} key={cell.key + info.key}>
                                {cell.value}
                            </CellWithBorder>
                        )
                    }
            })}
        </div>
    )
}
export default Line;