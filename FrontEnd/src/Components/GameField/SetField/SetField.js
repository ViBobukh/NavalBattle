import Field from "../Field/Field";
import ShipSelection from "../ShipSelection/ShipSelection";
import React, {Component} from "react";
import "./SetField.scss";

class SetField extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentId: 1,
            currentShip: [],
            numberOfShips: 4,
            numberOfDecks: 1
        };
    }

    stateHandler(info){
        this.setState({
            ...this.state,
            currentId: info.currentDeck,
            numberOfDecks: info[info.currentDeck].numberOfDeck,
            numberOfShips: info[info.currentDeck].numberOfShip
        })
    }

    cellHandler(cells){
        console.log(cells)
    }


    render() {
        return(
            <div className="gameField">
                <Field
                    cellHandler={this.cellHandler.bind(this)}
                />
                <ShipSelection
                    stateHandler={this.stateHandler.bind(this)}
                    shipsEnter={this.props.shipsEnter}
                />
            </div>
        )
    }
}

export default SetField;