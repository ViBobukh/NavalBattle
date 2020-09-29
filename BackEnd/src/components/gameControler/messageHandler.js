const Message = require("./messageCreator.js");
const Constants = require("../../constants.js");
let uniqid = require('uniqid');
let dotAroundShip = require("./dotAroundShip.js")
const games = [];

function createGame(socket){
    let gameId = uniqid();
    const userId = uniqid();
    games.push({
        user1: {
            socket: socket,
            steps: [],
            winSteps: [],
            userId: userId
        },
        stepPerformer: "User1",
        gameId: gameId
    });
    socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCreateGame(userId, gameId));
}

function connect(parseMsg, socket){
    const userId = uniqid();
    let game = games.find((game)=> {
        return game.gameId === parseMsg.gameId
    });
    if(game && !game.user2){
        game.user2 = {socket: socket, steps: [], winSteps: [], userId: userId};
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectSuccess(userId, parseMsg.gameId));
    }else if(game && (!game.user1)){
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectSuccess(userId, parseMsg.gameId));
    } else {
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectError(parseMsg.gameId));
    }
}

function checkShips(parseMsg, socket){
    console.log(parseMsg)
    let checkUser = games.find((game)=> {
        return game.gameId === parseMsg.gameId
    });

    switch (socket.id) {
        case checkUser.user1.socket.id:
            checkUser.user1.ships = parseMsg.userShips;
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCheckShips(parseMsg.gameId));
            break;
        case checkUser.user2.socket.id:
            checkUser.user2.ships = parseMsg.userShips;
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCheckShips(parseMsg.gameId));
            break;

    }
}

function gameReady(){
    let nextPerformerUser1 = false;
    let nextPerformerUser2 = false;

    if(games[0].stepPerformer === "User1"){
        nextPerformerUser1 = true;
    }else {
        nextPerformerUser2 = true;
    }

    if(games){
        if(games[0].user1.ships && games[0].user2.ships){
            games[0].user1.socket.emit(Constants.Messages.MSG_SER_CLI,
                Message.messageGameReady(games[0].user1.ships, nextPerformerUser1));
            games[0].user2.socket.emit(Constants.Messages.MSG_SER_CLI,
                Message.messageGameReady(games[0].user2.ships, nextPerformerUser2));
        }
    }
}

function checkStep(ships, step){
    let allShips = Object.values(ships.deck);
    const result = allShips.reduce((prevResult, allShips) => {
        return prevResult ? prevResult : allShips.find((ship) => {
            const foundCell = ship.find((cell) => {
                return (step.cell === cell.cell) && (step.line === cell.line);
            });
            if(foundCell !== undefined){
                foundCell.cellState = "hit";
            }
            return foundCell;
        });
    }, undefined);

    if(result !== undefined){
        killedShip(result)
    }

    return !!result;
}

function killedShip(ship){
    let allBorder;
    let checkCellState = 0;
    ship.map((deck) => {
        if(deck.cellState === "hit"){
            checkCellState += 1
        }
    })
    if(checkCellState === ship.length) {
        allBorder = dotAroundShip.dotAroundShip(ship);
        games[0].user1.socket.emit(Constants.Messages.MSG_SER_CLI,
            Message.messageKilledShip(allBorder, "3f6koa6cgkb0gki3e"));
        games[0].user2.socket.emit(Constants.Messages.MSG_SER_CLI,
            Message.messageKilledShip(allBorder, "3f6koa6cgkb0gki3e"));
    }
}

function gameOverCheck(steps, whoWin){
    console.log(steps.length)
    if(steps.length === 20){
        games[0].user1.socket.emit(Constants.Messages.MSG_SER_CLI,
            Message.messageGameOver(games[0].gameId, whoWin, "User1"));
        games[0].user2.socket.emit(Constants.Messages.MSG_SER_CLI,
            Message.messageGameOver(games[0].gameId, whoWin, "User2"));
        return true;
    }
}


function handlerStep(parseMsg, socket){
    let resultStep;
    let game = games.find((game) => game.gameId === parseMsg.gameId)
    if (game) {
        let currentPerformer = game.stepPerformer;
        if (socket.id === game.user1.socket.id && game.stepPerformer === "User1") {
            resultStep = !!checkStep(game.user2.ships, parseMsg.stepCoord[0]);
            if(resultStep){
                game.user1.winSteps.push(parseMsg.stepCoord)
            }
            game.stepPerformer = resultStep ? "User1" : "User2";
            game.user1.steps.push(parseMsg.stepCoord);
            if(gameOverCheck(game.user1.winSteps, "User1")){
                return;
            }
        }else if (socket.id === game.user2.socket.id && game.stepPerformer === "User2") {
            resultStep = !!checkStep(game.user1.ships, parseMsg.stepCoord[0]);
            if(resultStep){
                game.user2.winSteps.push(parseMsg.stepCoord)
            }
            game.stepPerformer = resultStep ? "User2" : "User1";
            game.user2.steps.push(parseMsg.stepCoord);
            if(gameOverCheck(game.user2.winSteps, "User2")){
                return;
            }
        }else {
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.stepErrorMessage(games[0].gameId));
        }
        game.user1.socket.emit(Constants.Messages.MSG_SER_CLI,
            Message.createClientStepMessage(currentPerformer, game.stepPerformer, "User1", resultStep,
                parseMsg.stepCoord, games[0].gameId));
        game.user2.socket.emit(Constants.Messages.MSG_SER_CLI,
            Message.createClientStepMessage(currentPerformer, game.stepPerformer, "User2", resultStep,
                parseMsg.stepCoord, games[0].gameId));
    }
}

function handler(msg, socket) {
    try{
        console.log(msg)
        let parseMsg = JSON.parse(msg);
        let message = parseMsg.body.message;
        switch (parseMsg.body.action) {
            case "createGame":
                createGame(socket);
                console.log(games)
                break;
            case "connect":
                connect(message,socket);
                console.log(games)
                break;
            case "shipsArePlaced":
                checkShips(message, socket);
                gameReady();
                console.log(games[0].user1.ships, games[0].user2.ships)
                break;
            case "step":
                handlerStep(message, socket);
                console.log(games)
                break;
        }
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = handler;