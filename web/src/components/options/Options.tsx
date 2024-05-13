import React, { useState } from 'react';
import '../../styles/options/options.scss'

// @ts-ignore
const Options = ({ isOpen, isDeckPublic, onShareDeck, onResetDeck, onDeleteDeck, onCloseBox }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="options-overlay">
          <div className="options-popup">
            <button className="options-button" onClick={onShareDeck}>
              {isDeckPublic ? "Unshare deck" : "Share deck"}
            </button>
            <button className="options-button" onClick={onResetDeck}>Reset Deck</button>
            <button className="options-button" onClick={openDeleteDialog}>Delete Deck</button>
            <button className="options-button" onClick={onCloseBox}>Close Options</button>
          </div>
          {isDeleteDialogOpen && (
            <div className="delete-dialog">
              <p>Are you sure you want to delete this deck?</p>
              <button className="delete-dialog-button accept" onClick={onDeleteDeck}>Accept</button>
              <button className="delete-dialog-button reject" onClick={closeDeleteDialog}>Reject</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Options;