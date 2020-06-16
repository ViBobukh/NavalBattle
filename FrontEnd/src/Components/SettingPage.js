import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link} from "react-router-dom";

function SettingPage() {
    return(
        <label className="settingPage">
            <button className="settingPageBack"><Link to="/">Back</Link></button>
            <button className="settingPageSound">Sound</button>
            <button className="settingPageControl">Control</button>
        </label>
    )
}

export default SettingPage;