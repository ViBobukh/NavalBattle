import React, {Component} from "react";
import Button from "../Button/Button";
import Page from "./Page";


function StartPage({onStartClick, onSettingsClick}) {
    return (
        <Page>
            <Button className="Page_margin" onClick={onStartClick}>
                Start
            </Button>
            <Button className="Page_margin" onClick={onSettingsClick}>
                Settings
            </Button>
        </Page>
    );
}

export default StartPage;