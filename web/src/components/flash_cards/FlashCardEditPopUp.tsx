import React, {useState} from 'react';
import '../../styles/flash_cards/flash_card_pop_up.scss';
import {DeckService} from "../../services/decs";
import {useNavigate} from 'react-router-dom';
// @ts-ignore
const FlashCardEditPopUp = ({frontText, backText, onSaveChanges, onDeleteCard, onClose, flashcardId, numberOfFlashcards
                            }) => {
    const [editedFrontText, setEditedFrontText] = useState(frontText);
    const [editedBackText, setEditedBackText] = useState(backText);
    const navigate = useNavigate();
    // @ts-ignore
    const handleFrontTextChange = (e) => {
        setEditedFrontText(e.target.value);
    };
    // @ts-ignore
    const handleBackTextChange = (e) => {
        setEditedBackText(e.target.value);
    };


    const handleDeleteFlashCard = () => {
        if (numberOfFlashcards > 1) {
            DeckService.deleteFlashCard(flashcardId)
            window.location.reload();
        } else {
            const deckDataString = localStorage.getItem("deckData");
            // @ts-ignore
            const deckData = JSON.parse(deckDataString);
            const deckId = deckData.id;
            DeckService.deleteDeck(deckId)
            navigate('/my_decks')

        }

    };

    const handleSaveCard = () => {
        const flashcard_body = {
            card_title : editedFrontText,
            card_text : editedBackText,
        }
        // @ts-ignore
        DeckService.update_single_flash_card(flashcardId,flashcard_body)
        window.location.reload();
    }


    return (
        <div className="popup-options">
            <textarea
                value={editedFrontText}
                onChange={handleFrontTextChange}
                placeholder="Front Text"
                maxLength={255}
            />
            <textarea
                value={editedBackText}
                onChange={handleBackTextChange}
                placeholder="Back Text"
                maxLength={511}
            />
            <div className="button-container">
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSaveCard}>Save Changes</button>
                <button onClick={handleDeleteFlashCard}>Delete Card</button>
            </div>
        </div>
    );
};

export default FlashCardEditPopUp;