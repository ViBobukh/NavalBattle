import React, {Component} from "react";

function createLine(num) {
    return {
        value: `${num}`,
        key: `line${num}`,
        cells: [{value: `${num}`, key: "num"},
            {value: " ", key: "a", cellState: "empty"}, {value: " ", key: "b", cellState: "empty"},
            {value: " ", key: "c", cellState: "empty"}, {value: " ", key: "d", cellState: "empty"},
            {value: " ", key: "e", cellState: "empty"}, {value: " ", key: "f", cellState: "empty"},
            {value: " ", key: "g", cellState: "empty"}, {value: " ", key: "h", cellState: "empty"},
            {value: " ", key: "i", cellState: "empty"}, {value: " ", key: "j", cellState: "empty"}
            ]
    }
}

function createLineLetters() {
    return {
        value: " ",
        key:"letters",
        cells: [{value: " ", key: "num"},{value: "A", key: "a"}, {value: "B", key: "b"}, {value: "C", key: "c"},
            {value: "D", key: "d"}, {value: "E", key: "e"}, {value: "F", key: "f"},
            {value: "G", key: "g"}, {value: "H", key: "h"}, {value: "I", key: "i"}, {value: "J", key: "j"}]
    }
}

function createField() {
    let allLine=[createLineLetters()];
    for (let i=1; i <= 10; ++i){
        allLine.push(createLine(i))
    }
    return allLine;
}

export{createField};