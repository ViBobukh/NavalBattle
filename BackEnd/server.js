let uniqid = require('uniqid');

const express = require('express');
const app = express();

const server = app.listen(3000);
const io = require('socket.io')(server);

const games = [];

function createGame(socket){
    let gameId = (uniqid());
    const userId = uniqid();
    games.push({user1 : {socket: socket, steps: [], userId: userId} , gameId: '3f6koa6cgkb0gki3e'});
    socket.emit('message-from-server-to-client', `{"userId": "${userId}"}`);
}

function connect(parseMsg, socket){
    let game = games.find((game)=> {
        return game.gameId === parseMsg.body.gameId
    });
    if(game && !game.user2){
        const userId = uniqid();
        game.user2 = {socket: socket, steps: [], userId: userId};
        socket.emit('message-from-server-to-client', `{"userId": "${userId}"}`);
    }else {
        socket.emit('message-from-server-to-client', `You don't connect to game`);
    }
}

function checkShips(parseMsg, socket){
    let checkUser = games.find((game)=> {
        return game.gameId === parseMsg.gameId
    });
    switch (socket.id) {
        case checkUser.user1.socket.id:
            checkUser.user1.ships = parseMsg.userShips;
            socket.emit('message-from-server-to-client', `Start of the game`);
            break;
        case checkUser.user2.socket.id:
            checkUser.user2.ships = parseMsg.userShips;
            socket.emit('message-from-server-to-client', `Start of the game`);
            break;

    }
}

function handlerStep(parseMsg, socket,){
    let game = games.find((game) => game.gameId === parseMsg.gameId)
    if(game){
        switch (socket) {
            case game.user1.socket:
                game.user1.steps.push(parseMsg.stepCoord);
                break;
            case game.user2.socket:
                game.user2.steps.push(parseMsg.stepCoord);
                break;
        }
    }
}

io.on('connection', (socket) => {
    socket.on('message-from-client-to-server', (msg) => {
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
    })

});