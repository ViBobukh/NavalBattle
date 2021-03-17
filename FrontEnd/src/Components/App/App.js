import React, {Component} from "react";
import StartPage from "../Page/StartPage";
import SettingPage from "../Page/SettingPage";
import GamePage from "../Game/GamePage";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'home'
        }
    }

    setCurrentPage(newPage) {
        this.setState({
            currentPage: newPage
        });
    }

    render() {
        const { currentPage } = this.state;
        return(
            <>
                <h1 className="Caption">Naval Battle</h1>
                {currentPage === 'home' ? <StartPage
                    onStartClick={() => this.setCurrentPage('game')}
                    onSettingsClick={() => this.setCurrentPage('settings')}
                /> :
                currentPage === 'game' ? <GamePage
                    onBackClick={() => this.setCurrentPage('home')}
                /> :
                currentPage === 'settings' ? <SettingPage
                    onBackClick={() => this.setCurrentPage('home')}
                /> : null
            }
            </>
        )
    }
}

export default App;