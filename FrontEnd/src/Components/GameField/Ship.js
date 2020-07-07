import React, {Component} from "react";
import {CellWithBorder} from "./Cell";
import {eventHandler} from "./shipsHandler"


function SingleDeck() {
    return(
        <div className="ship4" onClick={eventHandler}>
            <p>4 ships</p>
            <CellWithBorder/>
        </div>
    )
}

function DoubleDeck() {
    return(
        <div className="ship3" onClick={eventHandler}>
            <p>3 ships</p>
            <CellWithBorder/>
            <CellWithBorder/>
        </div>
    )
}

function ThreeDeck() {
    return(
        <div className="ship2" onClick={eventHandler}>
            <p>2 ships</p>
            <CellWithBorder/>
            <CellWithBorder/>
            <CellWithBorder/>
        </div>
    )
}

function FourDeck() {
    return(
        <div className="ship1" onClick={eventHandler}>
            <p>1 ships</p>
            <CellWithBorder/>
            <CellWithBorder/>
            <CellWithBorder/>
            <CellWithBorder/>
        </div>
    )
}

function Ship() {
    return(
        <div className="infoShips">
            <h1 className="captionShip">Ships</h1>
            <FourDeck/>
            <ThreeDeck/>
            <DoubleDeck/>
            <SingleDeck/>
        </div>
    )
}

export default Ship;