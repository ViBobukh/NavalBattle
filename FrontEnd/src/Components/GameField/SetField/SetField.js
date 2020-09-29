import Field from "../Field/Field";
import ShipSelection from "../ShipSelection/ShipSelection";
import React, {Component} from "react";
import "./SetField.scss";
import classNames from 'classnames';
import createShipSelection from "../ShipSelection/createShipSelection";
import {createField} from "../CreateLine/CreateLine";
import shouldBeCellAdded from "./shipAdd.js";

class SetField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            field: createField(),
            ships: {
                1: createShipSelection(1, 4),
                2: createShipSelection(2, 3),
                3: createShipSelection(3, 2),
                4: createShipSelection(4, 1),
                currentDeck: 1
            },
            currentShip : [],
            allShipUser : {
                "1" : [], "2" : [], "3" : [], "4" : []
            }
        };
    }

    stateHandler(ships){
        this.setState({
            ships: {
                ...this.state.ships,
                currentDeck: ships.ships.id
            }
        })
    }

    shipsPlacedActivate(){
        this.props.shipsEnter(this.state.allShipUser)
    }

    cellHandler(cell){
        const {
            ships, currentShip, allShipUser
        } = this.state;
        const currentDeck = ships.currentDeck;
        const { numberOfDeck, numberOfShip } = ships[currentDeck];

        let shouldBeAdded = shouldBeCellAdded(cell, numberOfDeck, currentShip);

        if(shouldBeAdded && numberOfShip > 0){
            cell.cellState = "ship";
            let newAllShipUser = this.state.allShipUser;
            let newShips = this.state.ships;
            let newCurrentShip = [
                ...currentShip,
                cell
            ];
            if(newCurrentShip.length === numberOfDeck){
                newShips = {
                    ...ships,
                    [currentDeck]: {
                        ...ships[currentDeck],
                        numberOfShip: numberOfShip - 1
                    }
                }
                newAllShipUser = {
                    ...allShipUser,
                    [currentDeck]: [
                        ...allShipUser[currentDeck],
                        newCurrentShip
                    ]
                };
                newCurrentShip = [];
            }

            this.setState({
                currentShip: newCurrentShip,
                allShipUser: newAllShipUser,
                ships: newShips
            })
        }
    }

    render() {
        return(
            <div className="SetField">
                <p className="SetField-GameId">Your Game Id : {this.props.gameId}</p>
                <div className="SetField-GameField">
                    <Field
                        field={this.state.field}
                        cellHandler={this.cellHandler.bind(this)}
                    />
                    {this.props.gameReady ? this.props.onGameFieldClick : null}
                    <ShipSelection
                        shipsPlaced={this.shipsPlacedActivate.bind(this)}
                        ships={this.state.ships}
                        stateHandler={this.stateHandler.bind(this)}
                        message={this.props.message}
                    />
                </div>
            </div>
        )
    }
}

export default SetField;