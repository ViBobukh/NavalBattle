import Field from "../Field/Field";
import ShipSelection from "../ShipSelection/ShipSelection";
import React, {Component} from "react";
import "./SetField.scss";
import classNames from 'classnames';

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
                    className={classNames('marginSetField', 'mainDivField')}
                    cellHandler={this.cellHandler.bind(this)}
                />
                <ShipSelection
                    stateHandler={this.stateHandler.bind(this)}
                    shipsEnter={this.props.shipsEnter}
                    message={this.props.message}
                />
            </div>
        )
    }
}

export default SetField;