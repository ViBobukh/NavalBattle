import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from "../Button/Button";
import App from "../App/App";

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
            setIsOpen: false
        }
        this.subtitle = '';
    }

    openModal(){
        this.setState({modalIsOpen: true})
    }

    afterOpenModal() {
        this.subtitle.style.color = '#000';
    }

    closeModal(){
        this.setState({setIsOpen: false})
    }

    render() {
        return(
            <div>
                <Button onClick={this.openModal.bind(this)}>Connect</Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    onRequestClose={this.closeModal.bind(this)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={this.closeModal.bind(this)}>close</button>
                    <h2 ref={_subtitle => (this.subtitle = _subtitle)}>Please, enter game ID</h2>
                    <input/>
                    <button>enter</button>

                </Modal>
            </div>
        )
    }
}

export default Connect;