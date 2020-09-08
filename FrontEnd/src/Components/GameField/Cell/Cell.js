import React, {Component} from "react";
import classNames from 'classnames';
import "./Cell.scss";

function CellWithoutBorder({children, ...props}) {
    return(
        <div className="fieldCell borderInvisible" {...props}>{children}</div>
    )
}

function CellWithBorderShip({children, id}) {
    return(
        <div
            id={id}
            className={classNames("fieldCell", "border")}
        >
            {children}
        </div>
    )
}

function CellWithBorder({children, cellState, cell, idLine, idCell, cellHandler}) {
    let cellStateShip = false;
    let hit = false;
    let missed = false;
    switch (cellState) {
        case "ship":
            cellStateShip = true;
            break;
        case "hit":
            hit = true;
            break;
        case "missed":
            missed = true;
            break;
    }

    return(
        <div
            id={idLine+idCell}
            className={classNames("fieldCell", "border", {pinkBackground: cellStateShip, hit: hit, missed: missed})}
            onClick={()=>{cellHandler(cell)}}
        >
            {children}
        </div>
    )
}

export { CellWithBorder, CellWithBorderShip, CellWithoutBorder};
