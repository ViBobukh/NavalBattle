function shouldBeCellAdded(cell, deck, currentShip){
    let result = false;
    if(cell.cellState === "empty"){
        if (currentShip.length === 0) {
            result = true;
        } else if (currentShip.length <= deck) {
            currentShip.map((deck) => {
                if ((deck.line === cell.line) &&
                    ((Number(deck.cell) + 1 === Number(cell.cell)) || (Number(deck.cell) - 1 === Number(cell.cell)))) {
                    result = true;
                } else if ((deck.cell === cell.cell) &&
                    ((Number(deck.line) + 1 === Number(cell.line)) || (Number(deck.line) - 1 === Number(cell.line)))) {
                    result = true;
                }
            })
        }
    }

    return result;
}

export default shouldBeCellAdded;