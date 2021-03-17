import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from "../Button/Button";
import "./Connect.scss";
import {ActionConst, sendMessage} from "../../lib/client";

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(232, 232, 232, 0.9)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        transform             : 'translate(-50%, -50%)',
    }
};

Modal.setAppElement('#root');

class Connect extends Component{
    constructor(props) {
        super(props);
        this.state={
            modalIsOpen: false,
            gameId: ''
        }
        this.subtitle = '';
    }

    inputValue(event){
        this.setState({gameId: event.target.value})
    }

    createConnect(){
        sendMessage(ActionConst.CONNECT, {gameId: this.state.gameId, userId: this.state.userId})
    }

    openModal(){
        this.setState({modalIsOpen: true})
    }

    afterOpenModal() {
        this.subtitle.style.color = '#000';
    }

    closeModal(){
        this.setState({modalIsOpen: false})
    }

    render() {
        return(
            <>
                <Button className="Page_margin" onClick={this.openModal.bind(this)}>Connect</Button>
                <div className="Connect">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal.bind(this)}
                        onRequestClose={this.closeModal.bind(this)}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <button className="Connect-CloseButton" onClick={this.closeModal.bind(this)}>X</button>
                        <h2 className="Connect-Caption" ref={_subtitle => (this.subtitle = _subtitle)}>Please, enter game ID</h2>
                        <input onInput={this.inputValue.bind(this)} className="Connect-Input"/>
                        <button onClick={this.createConnect.bind(this)} className="Connect-EnterButton">
                            Start
                        </button>
                    </Modal>
                </div>
            </>
        )
    }
}

export default Connect;