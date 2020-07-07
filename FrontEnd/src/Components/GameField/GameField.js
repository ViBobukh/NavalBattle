import React, {Component} from "react";
import Line from "./Line";
import Ship from "./Ship";

class Field extends Component{
    constructor(props) {
        super(props);
        this.state={
            user1: [
                {
                    value: " ",
                    key:"letters",
                    cells: [{value: " ", key: "num"},{value: "A", key: "a"}, {value: "B", key: "b"}, {value: "C", key: "c"},
                        {value: "D", key: "d"}, {value: "E", key: "e"}, {value: "F", key: "f"},
                        {value: "G", key: "g"}, {value: "H", key: "h"}, {value: "I", key: "i"}, {value: "J", key: "j"}]
                },
                {
                    value: "1",
                    key: "line1",
                    cells: [{value: "1", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "2",
                    key: "line2",
                    cells: [{value: "2", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "3",
                    key: "line3",
                    cells: [{value: "3", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "4",
                    key: "line4",
                    cells: [{value: "4", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "5",
                    key: "line5",
                    cells: [{value: "5", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "6",
                    key: "line6",
                    cells: [{value: "6", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "7",
                    key: "line7",
                    cells: [{value: "7", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "8",
                    key: "line8",
                    cells: [{value: "8", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "9",
                    key: "line9",
                    cells: [{value: "9", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                },
                {
                    value: "10",
                    key: "line10",
                    cells: [{value: "10", key: "num"},{value: " ", key: "a"}, {value: " ", key: "b"}, {value: " ", key: "c"},
                        {value: " ", key: "d"}, {value: " ", key: "e"}, {value: " ", key: "f"},
                        {value: " ", key: "g"}, {value: " ", key: "h"}, {value: " ", key: "i"}, {value: " ", key: "j"}]
                }
            ]
        }
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
                <Ship/>
            </div>
        )
    }
}

export default Field;