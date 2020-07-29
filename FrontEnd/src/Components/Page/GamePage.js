import React, {Component} from "react";
import Button from "../Button/Button";
import Page from "./Page";
import {Link} from "react-router-dom";
import Connect from "../Connect/Connect";


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
                <Connect/>
            </>
        </Page>
    )
}

export default GamePage;