import React, {Component} from "react";
import Line from "./Line";
import Ship from "./Ship";
import {createField} from "./CreateLine";
import deckSet from "./CreateDeck";
import "./GameField.scss"

class Field extends Component{
    constructor(props) {
        super(props);
        this.state = {
            decks: deckSet(),
            user1: createField()
        }
    }

    shipSelection(id){
        const nextDecks = this.state.decks.map(deckInfo => {
            return {
                ...deckInfo,
                isActive: deckInfo.id === id
            }
        });
        this.setState({decks: nextDecks});
    }

    render() {
        let lines = this.state.user1.map((line)=>{
            return <Line info={line} key={line.key}/>
        });

        return(
            <div className="mainDivField">
                <div className="field">
                    {lines}
                </div>
                <Ship shipSelection={this.shipSelection.bind(this)} decks={this.state.decks}/>
            </div>
        )
    }
}

export default Field;