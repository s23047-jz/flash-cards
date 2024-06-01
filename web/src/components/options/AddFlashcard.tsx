import React, {useState} from 'react';
import '../../styles/flash_cards/flash_card_pop_up.scss';
import {DeckService} from "../../services/decs";

// @ts-ignore
const AddFlashcard = ({onClose,}) => {
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    // @ts-ignore
    const handleFrontText = (e) => {
        setFrontText(e.target.value);
    };
    // @ts-ignore
    const handleBackText = (e) => {
        setBackText(e.target.value);
    };

    const handleSaveCard = () => {
         if (backText.length < 1 && frontText.length < 1 ) {
            setFrontText('Front text must be at least 1 characters long.');
            setBackText('Back text must be at least 1 characters long.');
            return;
        }
         else if (frontText.length < 1 ){
            setFrontText('Front text must be at least 1 characters long.');
            return;
        }
          else if (backText.length < 1 ){
            setBackText('Back text must be at least 1 characters long.');
            return;
        }
        const deckDataString = localStorage.getItem("deckData");
        // @ts-ignore
        const deckData = JSON.parse(deckDataString);
        const deck_id = deckData.id;
        const flashcard_body = {
            deck_id: deck_id,
            card_title: frontText,
            card_text: backText,
            is_memorized: false
        }

        DeckService.create_flash_card(flashcard_body)
        window.location.reload();
    }


    return (
        <div className="popup-options">
            <textarea
                value={frontText}
                onChange={handleFrontText}
                placeholder="Front Side"
                maxLength={255}
            />
            <textarea
                value={backText}
                onChange={handleBackText}
                placeholder="Back Side"
                maxLength={511}
            />
            <div className="button-container">
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSaveCard}>Add Flashcard</button>
            </div>
        </div>
    );
};

export default AddFlashcard;