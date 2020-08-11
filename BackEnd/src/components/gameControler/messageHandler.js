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
        return game.gameId === parseMsg.gameId
    });
    if(game && !game.user2){
        game.user2 = {socket: socket, steps: [], userId: userId};
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectSuccess(userId, "3f6koa6cgkb0gki3e"));
    }else if(game && (!game.user1)){
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectSuccess(userId, "3f6koa6cgkb0gki3e"));
    } else {
        socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageConnectError("3f6koa6cgkb0gki3e"));
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
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCheckShips("3f6koa6cgkb0gki3e"));
            break;
        case checkUser.user2.socket.id:
            checkUser.user2.ships = parseMsg.userShips;
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageCheckShips("3f6koa6cgkb0gki3e"));
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
        if(stepCheck > 0 && stepCheck <= 8){
            game.user1.socket.emit(Constants.Messages.MSG_SER_CLI,
                Message.createClientStepMessage(currentPerformer, game.stepPerformer, "User1"));
            game.user2.socket.emit(Constants.Messages.MSG_SER_CLI,
                Message.createClientStepMessage(currentPerformer, game.stepPerformer, "User2"));
        }else if(stepCheck > 8){
            game.user1.socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageGameOver("3f6koa6cgkb0gki3e"));
            game.user2.socket.emit(Constants.Messages.MSG_SER_CLI, Message.messageGameOver("3f6koa6cgkb0gki3e"));
        }else {
            socket.emit(Constants.Messages.MSG_SER_CLI, Message.stepErrorMessage("3f6koa6cgkb0gki3e"));
        }
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
                console.log(games)
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