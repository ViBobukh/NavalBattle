const Message = require("./messageCreator.js");
const Constants = require("../../constants.js");
let uniqid = require('uniqid');
const games = [];

function createGame(socket){
    let gameId = uniqid();
    const userId = uniqid();
    games.push({
        user1: {
            socket: socket,
            steps: [],
            userId: userId
        },
        stepPerformer: "User1",
        gameId: '3f6koa6cgkb0gki3e'
    });
    socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCreateGame(userId, "3f6koa6cgkb0gki3e"));
}

function connect(parseMsg, socket){
    const userId = uniqid();
    let game = games.find((game)=> {
        return game.gameId === parseMsg.body.gameId
    });
    if(game && !game.user2){
        game.user2 = {socket: socket, steps: [], userId: userId};
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectSuccess(userId, "3f6koa6cgkb0gki3e"));
    }else {
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectError("3f6koa6cgkb0gki3e"));
    }
}

function checkShips(parseMsg, socket){
    let checkUser = games.find((game)=> {
        return game.gameId === parseMsg.gameId
    });
    switch (socket.id) {
        case checkUser.user1.socket.id:
            checkUser.user1.ships = parseMsg.userShips;
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCheckShips("3f6koa6cgkb0gki3e"));
            break;
        case checkUser.user2.socket.id:
            checkUser.user2.ships = parseMsg.userShips;
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCheckShips("3f6koa6cgkb0gki3e"));
            break;

    }
}

let stepCheck = 0;

function handlerStep(parseMsg, socket){
    let game = games.find((game) => game.gameId === parseMsg.gameId)
    if (game) {
        let currentPerformer = game.stepPerformer;
        if (socket.id === game.user1.socket.id && game.stepPerformer === "User1") {
            stepCheck += 1;
            game.stepPerformer = "User2";
            game.user1.steps.push(parseMsg.stepCoord);
        }else if (socket.id === game.user2.socket.id && game.stepPerformer === "User2") {
            stepCheck += 1;
            game.stepPerformer = "User1";
            game.user2.steps.push(parseMsg.stepCoord);
        }
        console.log(stepCheck)
        if(stepCheck > 0 && stepCheck <= 2){
            game.user1.socket.emit(Constants.Messages.MSG_SER_CLI,
                Message.createClientStepMessage(currentPerformer, game.stepPerformer, "User1"));
            game.user2.socket.emit(Constants.Messages.MSG_SER_CLI,
                Message.createClientStepMessage(currentPerformer, game.stepPerformer, "User2"));
        }else if(stepCheck > 2){
            game.user1.socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageGameOver("3f6koa6cgkb0gki3e"));
            game.user2.socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageGameOver("3f6koa6cgkb0gki3e"));
        }else {
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.stepErrorMessage("3f6koa6cgkb0gki3e"));
        }
    }
}

function handler(msg, socket) {
    console.log(msg)
    let parseMsg = JSON.parse(msg);
    switch (parseMsg.body.action) {
        case "createGame":
            createGame(socket);
            console.log(games)
            break;
        case "connect":
            connect(parseMsg,socket);
            console.log(games)
            break;
        case "shipsArePlaced":
            checkShips(parseMsg.body, socket);
            console.log(games)
            break;
        case "step":
            handlerStep(parseMsg.body, socket);
            console.log(games)
            break;
    }
}

module.exports = handler;