import React from 'react';
// @ts-ignore
import logo from '../../assets/logo.png'
// @ts-ignore
import '../../styles/loading_spinner/loading_spinner_chat.scss'
const LoadingSpinnerChat = () => {
    return (
        <>
            <div className="loading-spinner-chat-container">
                <div className="loading-spinner"><img className={'img-spinner'} src={logo} alt="icon"/></div>
                <p className={'loading-text'}>Loading chat response...</p>
            </div>

        </>


    );
};

export default LoadingSpinnerChat;