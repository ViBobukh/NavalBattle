const handler = require("./components/gameControler/messageHandler.js");
const createServer = require("../server.js");

console.log(createServer(handler));