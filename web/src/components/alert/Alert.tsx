import React from 'react';
import '../../styles/alert/alert.scss';

// @ts-ignore
const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-box">
      <p className="text-alert">{message}</p>
      <button className="button-alert" onClick={onClose}>Close</button>
    </div>
  );
};

export default Alert;