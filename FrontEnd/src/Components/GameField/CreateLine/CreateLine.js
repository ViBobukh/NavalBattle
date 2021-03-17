import React, {Component} from "react";

function createLine(num) {
    return {
        value: `${num}`,
        key: `${num}`,
        cells: [{value: `${num}`, line: `${num}`,  key: "num"},
            {line: `${num}`, cell: "1", cellState: "empty"}, {line: `${num}`, cell: "2", cellState: "empty"},
            {line: `${num}`, cell: "3", cellState: "empty"}, {line: `${num}`, cell: "4", cellState: "empty"},
            {line: `${num}`, cell: "5", cellState: "empty"}, {line: `${num}`, cell: "6", cellState: "empty"},
            {line: `${num}`, cell: "7", cellState: "empty"}, {line: `${num}`, cell: "8", cellState: "empty"},
            {line: `${num}`, cell: "9", cellState: "empty"}, {line: `${num}`, cell: "10", cellState: "empty"}
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
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let allLine=[createLineLetters()];
    for (let i=1; i <= 10; ++i) {
        allLine.push(createLine(i))
    }
    return allLine;
}

export {createField};