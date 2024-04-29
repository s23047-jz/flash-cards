import React from 'react';
import '../../styles/alert/alert.scss';

// @ts-ignore
const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <p>{message}</p>
      <button className="closeButton" onClick={onClose}>Close</button>
    </div>
  );
};

export default Alert;