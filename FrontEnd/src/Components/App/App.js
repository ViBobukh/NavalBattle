import React, {Component} from "react";
import StartPage from "../Page/StartPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamePage from "../Page/GamePage";
import SettingPage from "../Page/SettingPage";
import "./App.scss";
import SetField from "../GameField/SetField/SetField";
import {ActionConst, sendMessage, subscribe} from "../../lib/client";
import GameField from "../FieldsGames/GameField";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            action: "",
            ships: {
                '1': [
                    {line: "1",  cell: "1", cellState: "ship"},{line: "10",  cell: "10", cellState: "ship"},
                    {line: "1",  cell: "10", cellState: "ship"},{line: "10",  cell: "1", cellState: "ship"}
                ],
                '2': [
                    [{line: "3",  cell: "3", cellState: "ship"},{line: "3",  cell: "4", cellState: "ship"}],
                    [{line: "6",  cell: "3", cellState: "ship"},{line: "6",  cell: "4", cellState: "ship"}],
                    [{line: "8",  cell: "3", cellState: "ship"},{line: "8",  cell: "4", cellState: "ship"}]
                ],
                '3': [
                    [{line: "2",  cell: "8", cellState: "ship"},{line: "3",  cell: "8", cellState: "ship"},
                        {line: "4",  cell: "8", cellState: "ship"}],
                    [{line: "7",  cell: "8", cellState: "ship"},{line: "8",  cell: "8", cellState: "ship"},
                        {line: "9",  cell: "8", cellState: "ship"}]
                ],
                '4': [
                    {line: "4", cell: "10", cellState: "ship"},{line: "5", cell: "10", cellState: "ship"},
                    {line: "6", cell: "10", cellState: "ship"},{line: "7", cell: "10", cellState: "ship"}
                ]
            }
        }
    }

    shipsEnter(){
        sendMessage(ActionConst.SHIPS_ARE_PLACED,
            {userShips : {deck : this.state.ships}, gameId: "3f6koa6cgkb0gki3e"});
    }

    createGame(){
        sendMessage(ActionConst.CREATE_GAME)
    }

    subscribeServer(){
        subscribe((msg)=>{
            let resultParse = JSON.parse(msg);
            this.setState({
                ...this.state,
                action: resultParse
            });
        });
    }

    render() {
        this.subscribeServer();
        return(
            <>
                <h1 className="captionMain">Naval Battle</h1>
                <label className="startPage">
                    <Router>
                        <Route path="/" exact render={() => <StartPage createGame={this.createGame.bind(this)}/>}/>
                        <Route path="/gamePage"
                               render={() => <GamePage history={history}/>}
                        />
                        <Route path="/settingPage" component={SettingPage}/>
                        <Route path="/setField"
                               render={() => <SetField message={this.state.action.data} shipsEnter={this.shipsEnter.bind(this)}/>}
                        />
                        <Route path="/gameField" component={GameField}/>
                    </Router>
                </label>
            </>
        )
    }
}

export default App;