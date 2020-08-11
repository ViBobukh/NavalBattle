import React, {Component} from "react";
import StartPage from "../Page/StartPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamePage from "../Page/GamePage";
import SettingPage from "../Page/SettingPage";
import "./App.scss";
import SetField from "../GameField/SetField/SetField";
import {ActionConst, sendMessage, subscribe} from "../../lib/client";
import GameField from "../FieldsGames/GameField";
import {createField} from "../GameField/CreateLine/CreateLine";
import {ships} from "./hardcoreShips";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: createField(),
            myField: createField(),
            action: {message: "none"},
            ships: ships,
            currentPerformer: false
        }
    }

    shipsEnter(){
        sendMessage(ActionConst.SHIPS_ARE_PLACED,
            {userShips : {deck : this.state.ships}, gameId: "3f6koa6cgkb0gki3e"});
    }

    createGame(){
        sendMessage(ActionConst.CREATE_GAME)
    }

    shipsHandler(action){

        let allShip = [];
        let newUser = this.state.myField;

        if(action.data){
            if(action.data.ships){
                this.setState({currentPerformer: action.data.nextPerformer})
                for(let i = 1; i < 5; ++i){
                    allShip.push(action.data.ships.deck[`${i}`])
                }
            }
        }

        if(allShip.length > 1){
            allShip.map((ships)=>{
                ships.map((ship)=>{
                    ship.map((deck)=>{
                        newUser[Number(deck.line)].cells[Number(deck.cell)].cellState = deck.cellState;
                    })
                })
            })
        }
        this.setState({myField: newUser})
    }

    cellHandler(cell){
        if(cell.cellState === "empty"){
            sendMessage(ActionConst.STEP, {stepCoord : [cell], gameId: "3f6koa6cgkb0gki3e"})
        }
    }

    componentDidMount() {
        this.subscribeServer();
    }

    subscribeServer(){
        subscribe((msg)=>{
            let resultParse = JSON.parse(msg);
            if(resultParse.data.ships){
                this.shipsHandler(resultParse);
            }
            this.setState({
                ...this.state,
                action: resultParse
            });
        });
    }

    render() {
        return(
            <>
                <h1 className="captionMain">Naval Battle</h1>
                <label className="startPage">
                    <Router>
                        <Route path="/" exact
                               render={() => <StartPage createGame={this.createGame.bind(this)}/>}/>
                        <Route path="/gamePage"
                               render={() => <GamePage history={history}/>}
                        />
                        <Route path="/settingPage" component={SettingPage}/>
                        <Route path="/setField"
                               render={() => <SetField
                                   field={this.state.user}
                                   message={this.state.action.data}
                                   shipsEnter={this.shipsEnter.bind(this)}
                               />}
                        />
                        <Route path="/gameField"
                               render={()=> <GameField
                                   currentPerformer={this.state.currentPerformer}
                                   data={this.state.action.data}
                                   field={this.state.user}
                                   myField={this.state.myField}
                                   cellHandler={this.cellHandler.bind(this)}
                               />}
                        />
                    </Router>
                </label>
            </>
        )
    }
}

export default App;
