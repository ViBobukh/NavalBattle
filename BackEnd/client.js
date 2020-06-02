let socket = io("http://localhost:3000");

socket.on("message-from-server-to-client", function(msg) {
    document.getElementById('message').innerHTML = msg;
});

// socket.emit('message-from-client-to-server', `{"body": { "action": "createGame"}}`);

socket.emit('message-from-client-to-server', `{"body": { "action": "connect", "gameId": "3f6koa64gkarznjh0"}}`);
