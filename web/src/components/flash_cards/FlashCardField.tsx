import React from 'react';
import '../../styles/flash_cards/flash_card_field.scss';

const FlashCard: React.FC<{ front_text: string; back_text: string; icon: string; onClick?: () => void }> = ({
    front_text,
    back_text,
    icon,
    onClick
}) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={"flashcard-field"}>
            <div className={"flashcard-field-grid"}>
                <div className="front">{front_text}</div>
                <div className={"back-side"}>
                    <div className="back">{back_text}</div>
                </div>
            </div>
            <img src={icon} alt="loudspeaker" className="icon-field" onClick={handleClick} />
        </div>
    );
};

export default FlashCard;