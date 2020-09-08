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
            ships: ships,
            action: {message: "none"},
            currentPerformer: false,
            isMyFieldActive: false,
            isOpponentFieldActive: false
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
                this.setState({currentPerformer: action.data.nextPerformer,
                    isMyFieldActive: action.data.nextPerformer,
                    isOpponentFieldActive: !action.data.nextPerformer})
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

    resultStepHandler(action){
        this.setState({currentPerformer: action.data.step.nextPerformer,
            isMyFieldActive: action.data.step.nextPerformer,
            isOpponentFieldActive: !action.data.step.nextPerformer});
        let myField = this.state.myField;
        let newUser = this.state.user;
        let line = action.data.step.stepCoord[0].line;
        let cell = action.data.step.stepCoord[0].cell;
        if(action.data.step.result && action.data.step.currentPerformer){
            newUser[line].cells[cell].cellState = "hit";
            this.setState({user: newUser})
        }else if(!action.data.step.result && action.data.step.currentPerformer){
            newUser[line].cells[cell].cellState = "missed";
            this.setState({user: newUser})
        }else if(!action.data.step.currentPerformer && action.data.step.result){
            myField[line].cells[cell].cellState = "hit";
            this.setState({myField: myField})
        }else if(!action.data.step.currentPerformer && !action.data.step.result){
            myField[line].cells[cell].cellState = "missed";
            this.setState({myField: myField})
        }
    }

    cellHandler(cell){
        if(cell.cellState === "empty"){
            sendMessage(ActionConst.STEP, {stepCoord : [cell], gameId: "3f6koa6cgkb0gki3e"})
        }
    }

    borderHandler(action){
        let newUser = this.state.user;
        let myField = this.state.myField;
        let result = action.data.ship.map((oneShip)=>{
            return oneShip.map((cells)=>{
                let line = cells.line;
                let cell = cells.cell;
                if(this.state.currentPerformer){
                    newUser[line].cells[cell].cellState = cells.cellState;
                    this.setState({user: newUser})
                }else if(!this.state.currentPerformer){
                    myField[line].cells[cell].cellState = cells.cellState;
                    this.setState({myField: myField})
                }
            })
        })
    }

    gameOver(message){
        this.setState({
            currentPerformer: message.data.win,
            isMyFieldActive: true,
            isOpponentFieldActive: true
        })
        if(message.data.whoWin === "User1" && this.state.currentPerformer){
            alert("You Win")
        }else if(message.data.whoWin === "User1" && !this.state.currentPerformer){
            alert("You Lose")
        }else if(message.data.whoWin === "User2" && this.state.currentPerformer){
            alert("You Win")
        }else if(message.data.whoWin === "User2" && !this.state.currentPerformer){
            alert("You Lose")
        }
    }

    componentDidMount() {
        this.subscribeServer();
    }

    subscribeServer(){
        subscribe((msg)=>{
            let resultParse = JSON.parse(msg);
            switch (resultParse.actionType){
                case "gameReady":
                    this.shipsHandler(resultParse);
                    break;
                case "step":
                    this.resultStepHandler(resultParse);
                    break;
                case "killedShip":
                    this.borderHandler(resultParse);
                    break;
                case "gameOver":
                    this.gameOver(resultParse)
                    break;
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
                                   isMy={this.state.isMyFieldActive}
                                   isNotMy={this.state.isOpponentFieldActive}
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
