import React, {Component} from "react";
import {Link, Route} from 'react-router-dom';

function StartPage() {
    return (
        <>
            <label className="startPage">
                <button className="startPageGame"><Link to="/gamePage">Game</Link></button>
                <button className="startPageSetting"><Link to="/settingPage">Setting</Link></button>
            </label>
        </>
    )
}

export default StartPage;