import React, {Component} from "react";
import {CellWithBorder} from "./Cell";
import "./Ship.scss";
import classNames from 'classnames';

function Deck({isActive, id, numberOfDecks, numberOfShips, shipSelection}) {
    let ship = [];
    for(let i = 0; i < numberOfDecks; ++i){
        ship.push(<CellWithBorder key={i+numberOfDecks+numberOfShips}/>)
    }
    return (
        <div
            onClick={() => {shipSelection(id)}}
            id={id}
            className={classNames('ship', {pinkBackground : isActive})}
        >
            <p>{numberOfShips} ship</p>
            {ship}
        </div>
    )
}

function Ship({ decks, shipSelection }) {
    return(
        <div className="infoShips">
            <h1 className="captionShip">Ships</h1>
            {decks.map(deckInfo => {
                return <Deck
                    shipSelection={shipSelection}
                    id={deckInfo.id}
                    isActive={deckInfo.isActive}
                    numberOfDecks={deckInfo.numberOfDecks}
                    numberOfShips={deckInfo.numberOfShips}
                />;
            })}
        </div>
    )
}

export default Ship;