import * as io from "socket.io-client"

let socket = io("http://localhost:3000");

export const ActionConst = {
    CREATE_GAME: "createGame",
    CONNECT: "connect",
    SHIPS_ARE_PLACED: "shipsArePlaced",
    STEP: "step"
}

export function subscribe(callback) {
    socket.on("message-from-server-to-client", callback);
}

export function sendMessage(message, typeMsg) {
    console.log(message)
    socket.emit('message-from-client-to-server', `{"body": { "action": ${typeMsg}, "message": ${message}`);
}