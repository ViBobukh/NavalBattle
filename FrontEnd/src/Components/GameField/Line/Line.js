import React, {Component} from "react";
import {CellWithBorder, CellWithoutBorder} from "../Cell/Cell";
import "./Line.scss";

function Line({info, cellSelection, cellHandler}) {
    return (
        <div className="fieldLine">{
            info.cells.map((cell) => {
                    if(info.key === "letters" || cell.key === "num"){
                       return(
                            <CellWithoutBorder key={cell.cell+info.line}>
                                {cell.value}
                            </CellWithoutBorder>
                       )
                    }else{
                        return(
                            <CellWithBorder
                                cell={cell}
                                cellHandler={cellHandler}
                                cellState={cell.cellState}
                                cellSelection={cellSelection}
                                idCell={cell.cell}
                                idLine={info.value}
                                key={cell.cell+info.line}>
                                {cell.value}
                            </CellWithBorder>
                        )
                    }
            })}
        </div>
    )
}
export default Line;