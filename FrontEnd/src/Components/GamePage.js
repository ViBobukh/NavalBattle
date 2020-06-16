import React, {Component} from "react";
import {withRouter} from 'react-router';


function GamePage({history}) {
    return(
        <label className="gamePage">
            <button className="gamePageBack" onClick={()=> history.go(-1)}>Back</button>
            <button className="gamePageStart">Start</button>
            <button className="gamePageConnect">Connect</button>
            <input className="gamePageConnectInput" type="text"/>
        </label>
    )
}

export default GamePage;