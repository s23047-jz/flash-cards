import React from 'react';
import '../../styles/public_deck_flashcards/public_deck_flash_card_field.scss';

const PublicDeckFlashCardField: React.FC<{ front_text: string; back_text: string; icon: string; onClick?: () => void; }> = ({
    front_text,
    back_text,
    icon,
    onClick,
}) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={"public-deck-flashcard-field"}>
            <div className={"flashcard-field-grid"}>
                <div className="front">{front_text}</div>
                <div className={"back-side"}>
                    <div className="back">{back_text}</div>
                </div>
            </div>
            <img src={icon} alt="loudspeaker" className="icon-field-loudspeaker" onClick={handleClick}/>
        </div>
    );
};

export default PublicDeckFlashCardField;