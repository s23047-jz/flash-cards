import React, {useState} from 'react';
import '../../styles/options/options.scss'
import FlashCardEditDeckNameCategory from "../flash_cards/FlashCardEditDeckNameCategory";
import AddFlashcard from "./AddFlashcard";

// @ts-ignore
const Options = ({isOpen, isDeckPublic, onShareDeck, onResetDeck, onDeleteDeck, onCloseBox}) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isChangeDeck, setIsChangeDeck] = useState(false)
    const [isAddFlashcard, setIsAddFlashcard] = useState(false)
    const deckDataString = localStorage.getItem("deckData");
    const deckData = JSON.parse(deckDataString || "{}");
    const deck_title = deckData.title;
    const deck_category = deckData.deck_category;
    const openDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };
    const handleAddFlashcard = () => {
        setIsAddFlashcard(!isAddFlashcard)
    }

    const handleChangeDeck = () => {
        setIsChangeDeck(!isChangeDeck)
    }

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
                        <button className="options-button" onClick={handleChangeDeck}>Change Deck Name</button>
                        <button className="options-button" onClick={handleAddFlashcard}>Add Flashcard</button>
                        <button className="options-button" onClick={onCloseBox}>Close Options</button>
                    </div>
                    {isChangeDeck && (
                        <FlashCardEditDeckNameCategory deckCategory={deck_category} deckName={deck_title}
                                                       onClose={handleChangeDeck}/>)}
                    {isAddFlashcard && (
                        <AddFlashcard onClose={handleAddFlashcard}/>)}
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