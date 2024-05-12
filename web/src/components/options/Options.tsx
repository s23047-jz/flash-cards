import React, { useState } from 'react';
import '../../styles/options/options.scss'


// @ts-ignore
const Options =({ isOpen,isDeckPublic, onShareDeck ,onResetDeck, onDeleteDeck, onCloseBox}) => {
  return (
    <div>
      {isOpen && (
        <div className="options-overlay">
          <div className="options-popup">
            <button className="options-button" onClick={onShareDeck}>{isDeckPublic ? "Unshare deck": "Share deck"}</button>
            <button className="options-button" onClick={onResetDeck}>Reset Deck</button>
            <button className="options-button" onClick={onDeleteDeck}>Delete Deck</button>
            <button className="options-button" onClick={onCloseBox}>Close Options</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;