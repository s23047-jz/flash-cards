import React from 'react';
import '../../styles/flash_cards/flash_card_field.scss';

const FlashCard: React.FC<{
    front_text: string;
    back_text: string;
    icon: string;
    icon_pencil: string;
    onClick?: () => void;
    onClickPencil: () => void
}> = ({
          front_text,
          back_text,
          icon,
          icon_pencil,
          onClick,
          onClickPencil
      }) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={"flashcard-field"}>
            <img src={icon_pencil} alt="pencil" className="icon-field-pencil" onClick={onClickPencil}/>
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

export default FlashCard;