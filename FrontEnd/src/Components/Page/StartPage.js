import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Button from "../Button/Button";
import Page from "./Page";

function StartPage({createGame}) {
    return (
        <Page>
            <>
                <Button onClick={createGame}>
                    <Link to="/gamePage">Game</Link>
                </Button>
                <Button>
                    <Link to="/settingPage">Setting</Link>
                </Button>
            </>
        </Page>
    )
}

export default StartPage;