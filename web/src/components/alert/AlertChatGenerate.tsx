import React from 'react';
import '../../styles/alert/alertChat.scss';

// @ts-ignore
const AlertChatGenerate = ({ message, onClose }) => {
  return (
    <div className="alert-box-chat">
      <p className="text-alert-chat">{message}</p>
      <button className="button-alert-chat" onClick={onClose}>Close</button>
    </div>
  );
};

export default AlertChatGenerate;