import React, {useState} from 'react';
import '../../styles/voice_control_page/flashcard_voice_mode.scss';

interface FlashCardProps {
    front_text: string;
    back_text: string;
    left_corner_text: string;
    icon: string;
    isRotated: boolean;
    onIconClick: () => void;
    isMicrophoneListening: boolean;
}

const FlashCard: React.FC<FlashCardProps> = ({
                                                 front_text,
                                                 back_text,
                                                 icon,
                                                 isRotated,
                                                 onIconClick,
                                                 left_corner_text,
                                                 isMicrophoneListening
                                             }) => {

    return (
        <div className={`flashcard-voice-control ${isRotated ? 'flipped' : ''} ${isMicrophoneListening ? 'listening' : ''}`}>
            <div className="left-corner-text">{left_corner_text}</div>
            <img src={icon} alt="loudspeaker" className="icon" onClick={onIconClick}/>
            <div className="front">{front_text}</div>
            <div className="back">{back_text}</div>

        </div>
    );
};

export default FlashCard;