import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import Page from "./Page";

function SettingPage() {
    return(
        <Page>
            <>
                <Button>
                    <Link to="/">Back</Link>
                </Button>
                <Button>
                    Sound
                </Button>
                <Button>
                    Control
                </Button>
            </>
        </Page>
    )
}

export default SettingPage;