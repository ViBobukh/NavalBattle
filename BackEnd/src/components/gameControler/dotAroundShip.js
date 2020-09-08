function cellCreation(line, cell){
    return {line: line, cell: cell, cellState: "missed"}
}

function createDotAround(line, cell){
    let coordinates = [[line-1, cell-1], [line, cell-1], [line-1, cell+1], [line-1, cell],
        [line+1, cell], [line+1, cell-1], [line, cell+1], [line+1, cell+1]];

    return coordinates.map((coordinate)=>{
        return cellCreation(coordinate[0], coordinate[1])
    })
}

function addDotShip(ship){
    let newShip = [];
    let ships = {};

    for(let deck = 0; deck < ship.length; ++deck){
        ships[deck] = createDotAround(Number(ship[deck].line), Number(ship[deck].cell));
    }

    for(let i = 0; i < 4; ++i){
        for (let a = 0; a < 10; ++a) {
            if (ships[i] && ships[i][a]) {
                newShip.push(ships[i][a])
            }
        }
    }

    newShip = newShip.filter(( deck, index, inputArray ) => {
        return inputArray.findIndex((sh) => {
            return (Number(deck.line) === Number(sh.line)) && (Number(deck.cell) === Number(sh.cell));
        }) === index;
    }).filter((deck) => {
        return ((deck.line !== 0) && (deck.cell !== 0) && (deck.line !== 11) && (deck.cell !== 11));
    }).filter((deck) => {
        return !ship.find((sh) => {
            return (Number(deck.line) === Number(sh.line)) && (Number(deck.cell) === Number(sh.cell));
        });
    });

    return newShip;
}

function dotAroundShip(ship) {
    let newShip = [];
    if(ship.length >= 1 && ship.length < 5){
        newShip.push(addDotShip(ship))
    }
    return newShip;
}

module.exports = {
    dotAroundShip
}