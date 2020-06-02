
let uniqid = require('uniqid');

const express = require('express');
const app = express();

const server = app.listen(3000);
const io = require('socket.io')(server);

const games = [];

function createGame(socket, games){
    let gamesId = uniqid();
    games.push({user1 : socket, gameId: gamesId});
}

function connect(parseMsg, socket,games){
    games.find((game) => {
        if(parseMsg.body.gameId === game.gameId){
            game['user2'] = socket
            socket.emit('message-from-server-to-client', `You connect to game`);
        }
    })
}

io.on('connection', (socket) => {
    socket.on('message-from-client-to-server', (msg) => {
        let parseMsg = JSON.parse(msg);
        console.log(parseMsg.body.action)
        switch (parseMsg.body.action) {
            case "createGame":
                createGame(socket, games);
                console.log(games)
                break;
            case "connect":
                connect(parseMsg,socket, games);
                console.log(games)
                break;
        }
    })

});