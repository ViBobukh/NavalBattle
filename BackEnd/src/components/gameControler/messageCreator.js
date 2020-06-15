//create game

function messageCreateGame(userId,gameId){return JSON.stringify({
    actionType: "createGame",
    data: {
        userId: userId,
        gameId: gameId
    }
})}

//connect

function messageConnectSuccess(userId, gameId){
    return JSON.stringify({
        actionType: "connect",
        data: {
           userId: userId,
           gameId: gameId
        }
    })
}

function messageConnectError(gameId){
    return JSON.stringify({
        actionType: "connect",
        data: {
            gameId: gameId,
            message: "You don't connect to game"
        }
    })
}

//ships are placed

function messageCheckShips(gameId){
    return JSON.stringify({
        actionType: "shipsArePlaced",
        data: {
            gameId: gameId,
            message: "Start of the game"
        }
    })
}

//step

function stepErrorMessage(gameId){
    return JSON.stringify({
        actionType: "step",
        data: {
            gameId: gameId,
            message: "You step next"
        }
    })
}
function messageGameOver(gameId){
    return JSON.stringify({
    actionType: "step",
    data: {
        gameId: gameId,
        message: "Game Over"
    }
    });
}

function createClientStepMessage(current, next, user, gameId) {
    return JSON.stringify({
        actionType: "step",
        data: {
            gameId: gameId,
            step: {
                currentPerformer : current === user,
                nextPerformer : next === user
            }
        }
    });
}

module.exports = {
    createClientStepMessage,
    messageGameOver,
    stepErrorMessage,
    messageCheckShips,
    messageConnectError,
    messageConnectSuccess,
    messageCreateGame
}