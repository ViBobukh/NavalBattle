function checkCellState(idCell, idLine, state) {
    return  state.user1.find((i)=>{
        return i.value === idLine;
    }).cells[idCell].cellState;
}


export {};