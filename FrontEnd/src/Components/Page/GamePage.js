import React, {Component} from "react";
import Button from "../Button/Button";
import Page from "./Page";
import {Link} from "react-router-dom";
import Connect from "../Connect/Connect";
import {ActionConst, sendMessage} from "../../lib/client";


function GamePage({history}) {
    const createGame = () => {
        sendMessage(ActionConst.CREATE_GAME)
    }
    return(
        <Page>
            <>
                <Button
                    onClick={()=> history.go(-1)}
                >
                    Back
                </Button>
                <Button onClick={createGame}>
                    <Link to="/setField">Start</Link>
                </Button>
                <Connect/>
            </>
        </Page>
    )
}

export default GamePage;