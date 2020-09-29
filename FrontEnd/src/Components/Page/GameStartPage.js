import React, {Component} from "react";
import Button from "../Button/Button";
import Page from "./Page";
import Connect from "../Connect/Connect";


class GameStartPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Page>
                <Button
                    className="Page_margin"
                    onClick={this.props.onBackClick}>
                    Back
                </Button>
                <Button
                    className="Page_margin"
                    onClick={this.props.onGameClick}>
                    Game
                </Button>
                <Connect/>
            </Page>
        )
    }
}

export default GameStartPage;
