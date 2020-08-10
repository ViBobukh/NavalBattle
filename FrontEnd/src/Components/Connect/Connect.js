import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from "../Button/Button";
import "./Connect.scss";
import {ActionConst, sendMessage} from "../../lib/client";
import {Link} from "react-router-dom";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
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
                <Button onClick={this.openModal.bind(this)}>Connect</Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    onRequestClose={this.closeModal.bind(this)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button className="closeButton" onClick={this.closeModal.bind(this)}>X</button>
                    <h2 className="connectCaption" ref={_subtitle => (this.subtitle = _subtitle)}>Please, enter game ID</h2>
                    <input onInput={this.inputValue.bind(this)} className="connectInput"/>
                    <button onClick={this.createConnect.bind(this)} className="enterButton">
                        <Link to="/setField">Enter</Link>
                    </button>
                </Modal>
            </>
        )
    }
}

export default Connect;