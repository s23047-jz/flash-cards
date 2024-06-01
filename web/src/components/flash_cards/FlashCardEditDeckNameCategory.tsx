import React, {useState} from 'react';
import '../../styles/flash_cards/flash_card_pop_up.scss';
import {DeckService} from "../../services/decs";

// @ts-ignore
const FlashCardEditDeckNameCategory = ({deckName, deckCategory, onClose,
                                       }) => {
    const [editedDeckName, setEditedDeckName] = useState(deckName);
    const [editedDeckCategory, setEditedDeckCategory] = useState(deckCategory);
    // @ts-ignore
    const handleNameChange = (e) => {
        setEditedDeckName(e.target.value);
    };
    // @ts-ignore
    const handleCategoryChange = (e) => {
        setEditedDeckCategory(e.target.value);
    };

    const handleSaveCard = () => {
        const deckDataString = localStorage.getItem("deckData");
        // @ts-ignore
        const deckData = JSON.parse(deckDataString);
        const deck_id = deckData.id;
        const deck_body = {
            title: editedDeckName,
            deck_category: editedDeckCategory,
        }



        deckData.title = editedDeckName;
        deckData.deck_category = editedDeckCategory;
        localStorage.setItem("deckData", JSON.stringify(deckData));
        // @ts-ignore
        DeckService.update_deck_title_category(deck_id, deck_body)
        window.location.reload();
    }


    return (
        <div className="popup-options">
            <textarea
                value={editedDeckName}
                onChange={handleNameChange}
                placeholder="Deck Title"
                maxLength={29}
            />
            <textarea
                value={editedDeckCategory}
                onChange={handleCategoryChange}
                placeholder="Deck Category"
                maxLength={29}
            />
            <div className="button-container">
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSaveCard}>Save Changes</button>
            </div>
        </div>
    );
};

export default FlashCardEditDeckNameCategory;