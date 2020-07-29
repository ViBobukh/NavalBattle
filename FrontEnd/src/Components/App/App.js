import React, {Component} from "react";
import StartPage from "../Page/StartPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamePage from "../Page/GamePage";
import SettingPage from "../Page/SettingPage";
import "./App.scss";
import SetField from "../GameField/SetField/SetField";
import {ActionConst, sendMessage, subscribe} from "../../lib/client";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            action: "",
            ships: {
                '1': [
                    {line: "1",  cell: "1", cellState: "ship"}, {line: "10",  cell: "10", cellState: "ship"},
                    {line: "1",  cell: "10", cellState: "ship"}, {line: "10",  cell: "1", cellState: "ship"}
                ],
                '2': [
                    [{line: "3",  cell: "3", cellState: "ship"}, {line: "3",  cell: "4", cellState: "ship"}],
                    [{line: "6",  cell: "3", cellState: "ship"}, {line: "6",  cell: "4", cellState: "ship"}],
                    [{line: "8",  cell: "3", cellState: "ship"}, {line: "8",  cell: "4", cellState: "ship"}]
                ],
                '3': [
                    [{line: "2",  cell: "8", cellState: "ship"},{line: "3",  cell: "8", cellState: "ship"},
                        {line: "4",  cell: "8", cellState: "ship"}],
                    [{line: "7",  cell: "8", cellState: "ship"},{line: "8",  cell: "8", cellState: "ship"},
                        {line: "9",  cell: "8", cellState: "ship"}]
                ],
                '4': [
                    {line: "4",  cell: "10", cellState: "ship"}, {line: "5",  cell: "10", cellState: "ship"},
                    {line: "6",  cell: "10", cellState: "ship"},{line: "7",  cell: "10", cellState: "ship"}
                ]
            }
        }
    }

    shipsEnter(){
        sendMessage(ActionConst.SHIPS_ARE_PLACED, this.state.ships)
    }

    subscribeServer(){
        subscribe((msg)=>{
            let resultParse = JSON.parse(msg);
            this.setState({
                ...this.state,
                action: resultParse
            });
        });
        console.log(this.state.action)
    }

    render() {
        this.subscribeServer();
        return(
            <>
                <h1 className="captionMain">Naval Battle</h1>
                <label className="startPage">
                    <Router>
                        <Route path="/" exact component={StartPage}/>
                        <Route path="/gamePage" component={GamePage}/>
                        <Route path="/settingPage" component={SettingPage}/>
                        <Route path="/gameField"
                               render={() => <SetField shipsEnter={this.shipsEnter.bind(this)}/>}
                        />
                    </Router>
                </label>
            </>
        )
    }
}

export default App;