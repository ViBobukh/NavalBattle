import React, {Component} from "react";
import Line from "./Line";

class Field extends Component{
    constructor(props) {
        super(props);
        this.state={
            user1: [
                {
                    value: "1",
                    key: "line1"
                },
                {
                    value: "2",
                    key: "line2"
                },
                {
                    value: "3",
                    key: "line3"
                },
                {
                    value: "4",
                    key: "line4"
                },
                {
                    value: "5",
                    key: "line5"
                },
                {
                    value: "6",
                    key: "line6"
                },
                {
                    value: "7",
                    key: "line7"
                },
                {
                    value: "8",
                    key: "line8"
                },
                {
                    value: "9",
                    key: "line9"
                },
                {
                    value: "10",
                    key: "line10"
                }
            ]
        }
    }


    render() {
        let lines = this.state.user1.map((line)=>{
            return <Line key={line.key}>{line.value}</Line>
        });

        return(
            <>
                <table className="field">
                    <tbody>
                        {lines}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Field;