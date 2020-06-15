const Messages = require('./constants.js');

function createServer(handler) {
    const express = require('express');
    const app = express();

    const server = app.listen(3000);
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        socket.on(Messages.Messages.MSG_CLI_SER, (msg) => {
            handler(msg, socket);
        })
    });
}

module.exports = createServer;