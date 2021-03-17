import React, {Component} from "react";
import "./GamePage.scss";
import {ActionConst, sendMessage, subscribe} from "../../lib/client";
import {createField} from "../GameField/CreateLine/CreateLine";
import SetField from "../GameField/SetField/SetField";
import GameField from "../FieldsGames/GameField";
import Connect from "../Connect/Connect";
import GameStartPage from "../Page/GameStartPage";

class GamePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: createField(),
            myField: createField(),
            ships: [],
            action: {message: "none"},
            currentPerformer: false,
            isMyFieldActive: false,
            isOpponentFieldActive: false,
            gameReady: false,
            currentPage: 'gamePage',
            gameId: ""
        }
    }

    createGame(){
        sendMessage(ActionConst.CREATE_GAME)
    }

    shipsEnter(ships){
        this.setState({ships: ships})
        sendMessage(ActionConst.SHIPS_ARE_PLACED,
            {userShips : {deck : ships}, gameId: this.state.gameId});
    }

    shipsHandler(action){

        let allShip = [];
        let newUser = this.state.myField;

        if(action.data){
            if(action.data.ships){
                this.setState({currentPerformer: action.data.nextPerformer,
                    isMyFieldActive: action.data.nextPerformer,
                    isOpponentFieldActive: !action.data.nextPerformer,
                    gameReady: true})
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
            sendMessage(ActionConst.STEP, {stepCoord : [cell], gameId: this.state.gameId})
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

    gameOver(message) {
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

    subscribeServer() {
        subscribe((msg) => {
            let resultParse = JSON.parse(msg);
            switch (resultParse.actionType){
                case "createGame":
                    this.setState({gameId: resultParse.data.gameId});
                    this.setCurrentPage("setField");
                    break;
                case "connect":
                    this.setState({gameId: resultParse.data.gameId});
                    this.setCurrentPage("setField");
                    break;
                case "shipsArePlaced":
                    break;
                case "gameReady":
                    this.setCurrentPage("gameField");
                    this.shipsHandler(resultParse);
                    break;
                case "stepNext":
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

    setCurrentPage(newPage) {
        this.setState({
            currentPage: newPage
        });
    }

    render() {
        const { currentPage, action, myField, user, gameReady, isMyFieldActive, isOpponentFieldActive } = this.state;
        return(
            <>
                {
                    currentPage === "gamePage" ? <GameStartPage
                        onGameClick={() => this.createGame()}
                        onBackClick={this.props.onBackClick}
                    /> :
                    currentPage === 'setField' ? <SetField
                        onGameFieldClick={() => this.setCurrentPage('gameField')}
                        message={action.data}
                        shipsEnter={this.shipsEnter.bind(this)}
                        gameReady={gameReady}
                        gameId={this.state.gameId}
                    /> :
                    currentPage === 'gameField' ? <GameField
                        isMy={isMyFieldActive}
                        isNotMy={isOpponentFieldActive}
                        data={action.data}
                        field={user}
                        myField={myField}
                        cellHandler={this.cellHandler.bind(this)}
                    /> :
                    currentPage === 'connect' ? <Connect/> :
                        null
                }
            </>
        )
    }
}
export default GamePage;