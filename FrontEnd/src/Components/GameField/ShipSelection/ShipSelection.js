import React, {Component} from "react";
import {CellWithBorderShip} from "../Cell/Cell";
import "./ShipSelection.scss";
import classNames from 'classnames';
import uniqId from "uniqid";
import Button from "../../Button/Button";

function Deck({info, id, shipSelectionHandler, isActive}) {
    let numberOfShips = info.numberOfShip;
    let numberOfDecks = info.numberOfDeck;
    let ship = [];
    for(let i = 0; i < numberOfDecks; ++i){
        ship.push(<CellWithBorderShip key={uniqId()}/>)
    }
    return (
        <div
            onClick={()=>{shipSelectionHandler(id)}}
            id={id}
            className={classNames('ShipSelection-Ship', {'ShipSelection-Ship_pinkBackground' : isActive})}
        >
            <p>{`${numberOfShips} ship`}</p>
            {ship}
        </div>
    )

}

function ShipSelection(props){

    function shipSelectionHandler(id){
        props.stateHandler({
            ships: props.ships[id]
        });
    }

    function createDecks(){
        let decks = [];
        for(let i=1; i < 5  ; ++i){
            decks.push(<Deck
                shipSelectionHandler={shipSelectionHandler}
                key={i}
                id={i}
                info={props.ships[i]}
                isActive={Number(props.ships.currentDeck) === i}
            />)
        }
        return decks;
    }

    return(
        <div className="ShipSelection">
            <h1 className="ShipSelection-Caption">Ships</h1>
            {createDecks()}
            <Button className="Page_margin" onClick={props.shipsPlaced}>
                Ships Are Placed
            </Button>
        </div>
    )
}

export default ShipSelection;