import React, {useState} from 'react';
import '../../styles/flash_cards/flash_cards.scss';

interface FlashCardProps {
    front_text: string;
    back_text: string;
    left_corner_text: string;
    icon: string;
    isRotated: boolean;
    onIconClick: () => void;
}

const FlashCard: React.FC<FlashCardProps> = ({
                                                 front_text,
                                                 back_text,
                                                 icon,
                                                 isRotated,
                                                 onIconClick,
                                                 left_corner_text
                                             }) => {

    return (
        <div className={`flashcard ${isRotated ? 'flipped' : ''}`}>
            <div className="left-corner-text">{left_corner_text}</div>
            <img src={icon} alt="loudspeaker" className="icon" onClick={onIconClick}/>
            <div className="front">{front_text}</div>
            <div className="back">{back_text}</div>

        </div>
    );
};

export default FlashCard;