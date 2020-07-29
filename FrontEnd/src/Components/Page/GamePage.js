import React, {Component} from "react";
import Button from "../Button/Button";
import Page from "./Page";
import {Link} from "react-router-dom";
import "./GamePage.scss";


function GamePage({history}) {
    return(
        <Page>
            <>
                <Button
                    onClick={()=> history.go(-1)}
                >
                    Back
                </Button>
                <Button>
                    <Link to="/gameField">Start</Link>
                </Button>
                <Button>
                    Connect
                </Button>
                <input className="connectInput" type="text"/>
            </>
        </Page>
    )
}

export default GamePage;