import React, {Component} from "react";
import Button from "../Button/Button";
import Page from "./Page";

function SettingPage({onBackClick}) {
    return(
        <Page>
            <>
                <Button
                    className="Page_margin"
                    onClick={onBackClick}
                >
                    Back
                </Button>
                <Button className="Page_margin">
                    Sound
                </Button>
                <Button className="Page_margin">
                    Control
                </Button>
            </>
        </Page>
    )
}

export default SettingPage;