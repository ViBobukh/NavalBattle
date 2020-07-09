import React, {Component} from "react";

function deckSet() {
    return[
        {
            id: 1,
            isActive: false,
            numberOfShips: 4,
            numberOfDecks: 1,
        },
        {
            id: 2,
            isActive: false,
            numberOfShips: 3,
            numberOfDecks: 2,
        },
        {
            id: 3,
            isActive: false,
            numberOfShips: 2,
            numberOfDecks: 3,
        },
        {
            id: 4,
            isActive: false,
            numberOfShips: 1,
            numberOfDecks: 4,
        },
    ]
}

export default deckSet;