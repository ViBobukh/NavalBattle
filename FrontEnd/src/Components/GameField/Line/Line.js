import React, {Component} from "react";
import {CellWithBorder, CellWithoutBorder} from "../Cell/Cell";
import "./Line.scss";
import uniqId from "uniqid";

function Line({info, cellSelection, cellHandler}) {
    return (
        <div className="fieldLine">{
            info.cells.map((cell) => {
                    if(info.key === "letters" || cell.key === "num"){
                       return(
                            <CellWithoutBorder key={uniqId()}>
                                {cell.value}
                            </CellWithoutBorder>
                       )
                    }else{
                        return(
                            <CellWithBorder
                                key={uniqId()}
                                cell={cell}
                                cellHandler={cellHandler}
                                cellState={cell.cellState}
                                cellSelection={cellSelection}
                                idCell={cell.cell}
                                idLine={info.value}>
                                {cell.value}
                            </CellWithBorder>
                        )
                    }
            })}
        </div>
    )
}
export default Line;