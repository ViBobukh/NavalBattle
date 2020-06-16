import React, {Component} from "react";
import ReactDOM from "react-dom";
import StartPage from "./StartPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamePage from "./GamePage";
import SettingPage from "./SettingPage";
import "./App.scss";

function App() {
    return(
        <>
            <h1 className="captionMain">Naval Battle</h1>
            <label className="startPage">
                <Router>
                    <Route path="/" exact component={StartPage}/>
                    <Route path="/gamePage" component={GamePage}/>
                    <Route path="/settingPage" component={SettingPage}/>
                </Router>
            </label>
        </>
    )
}

export default App;