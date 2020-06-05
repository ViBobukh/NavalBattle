let socket = io("http://localhost:3000");

let action = document.getElementById("action");
let enterAction = document.getElementById('enterAction');
enterAction.addEventListener('click', ()=> choseAction(action.value));


socket.on("message-from-server-to-client", function (msg) {
   document.getElementById('msg').innerText = msg;
});

function choseAction(action) {
   switch (action) {
      case "createGame":
         socket.emit('message-from-client-to-server', `{"body": { "action": "createGame"}}`);
         break;
      case "connect":
         socket.emit('message-from-client-to-server', `{"body": { "action": "connect", "gameId": "3f6koa6cgkb0gki3e"}}`);
         break;
      case "shipsArePlaced":
         socket.emit('message-from-client-to-server', `{"body": { "action": "shipsArePlaced", "userShips" : {"deck" : "[]"}, "gameId": "3f6koa6cgkb0gki3e"}}`);
         break;
      case "step":
         socket.emit('message-from-client-to-server', `{"body": { "action": "step", "stepCoord" : ['2222']}}`);
         break;
   }
}
