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
           gameId: gameId,
           message: '',
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
            message: "User are placed ships"
        }
    })
}

//game ready

function messageGameReady(ships, nextPerformer){
    return JSON.stringify({
        actionType: "gameReady",
        data: {
            message: "Start of the game",
            ships: ships,
            nextPerformer: nextPerformer
        }
    })
}

//step

function stepErrorMessage(gameId){
    return JSON.stringify({
        actionType: "stepNext",
        data: {
            gameId: gameId,
            message: "You step next"
        }
    })
}

function messageGameOver(gameId, whoWin, user){
    return JSON.stringify({
        actionType: "gameOver",
        data: {
            win: user === whoWin,
            whoWin: whoWin,
            gameId: gameId,
            message: "Game Over"
        }
    });
}

function messageKilledShip(ship, gameId, ) {
    return JSON.stringify({
        actionType: "killedShip",
        data: {
            gameId: gameId,
            message: "This ship was kill",
            ship: ship
        }
    });
}

function createClientStepMessage(current, next, user, result,stepCoord, gameId) {
    return JSON.stringify({
        actionType: "step",
        data: {
            gameId: gameId,
            step: {
                currentPerformer : current === user,
                nextPerformer : next === user,
                result: result,
                stepCoord: stepCoord
            }
        }
    });
}

module.exports = {
    createClientStepMessage,
    messageGameOver,
    stepErrorMessage,
    messageGameReady,
    messageCheckShips,
    messageConnectError,
    messageConnectSuccess,
    messageCreateGame,
    messageKilledShip
}