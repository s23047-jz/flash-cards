import React from 'react';
// @ts-ignore
import logo from '../../assets/logo.png'
// @ts-ignore
import '../../styles/loading_spinner/loading_spinner.scss'
const LoadingSpinner = () => {
    return (
        <>
            <div className="loading-spinner-container">
                <div className="loading-spinner"><img className={'img-spinner'} src={logo} alt="icon"/></div>
                <p className={'loading-text'}>Loading...</p>
            </div>

        </>


    );
};

export default LoadingSpinner;