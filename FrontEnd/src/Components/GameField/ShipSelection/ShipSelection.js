import React, {Component} from "react";
import {CellWithBorderShip} from "../Cell/Cell";
import "./ShipSelection.scss";
import classNames from 'classnames';
import createShipSelection from "./createShipSelection";
import {Link} from "react-router-dom";

function Deck({info, id, shipSelectionHandler, isActive}) {
    let numberOfShips = info.numberOfShip;
    let numberOfDecks = info.numberOfDeck;
    let ship = [];
    for(let i = 0; i < numberOfDecks; ++i){
        ship.push(<CellWithBorderShip/>)
    }
    return (
        <div
            key={id}
            onClick={()=>{shipSelectionHandler(id)}}
            id={id}
            className={classNames('ship', {pinkBackground : isActive})}
        >
            <p>{`${numberOfShips} ship`}</p>
            {ship}
        </div>
    )

}

class ShipSelection extends Component{
    constructor(props) {
        super(props);
        this.state = {
            "1": createShipSelection(1, 4),
            "2": createShipSelection(2, 3),
            "3": createShipSelection(3, 2),
            "4": createShipSelection(4, 1),
            currentDeck: '1'
        }
    }

    shipSelectionHandler(id){
        this.setState({
            currentDeck: id
        });
        this.props.stateHandler(this.state);
    }

    createDecks(){
        let decks = [];
        for(let i=1; i < 5  ; ++i){
            decks.push(<Deck
                shipSelectionHandler={this.shipSelectionHandler.bind(this)}
                key={i}
                id={i}
                info={this.state[i]}
                isActive={Number(this.state.currentDeck) === i}
            />)
        }
        return decks;
    }

    render() {
        return(
            <div className="infoShips">
                <h1 className="captionShip">Ships</h1>
                {this.createDecks()}
                <div onClick={this.props.shipsEnter} className="shipSelectionButton">
                    <Link to="/gameField"
                          style={{
                              textDecoration: 'none',
                              color: 'black',
                              fontFamily: 'Raleway',
                              fontStyle: 'normal',
                              fontWeight: 'lighter',
                          }}>Start
                    </Link>
                </div>
            </div>
        )
    }
}

export default ShipSelection;