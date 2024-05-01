import React, {useState} from 'react';
import '../../styles/flash_cards/flash_card_field.scss';

const FlashCard: React.FC<{ front_text: string; back_text: string, icon: string }> = ({
                                                                                          front_text,
                                                                                          back_text,
                                                                                          icon
                                                                                      }) => {

    return (
        <div className={"flashcard-field"}>
            <div className={"flashcard-field-grid"}>
                <div className="front">{front_text}</div>
                <div className={"back-side"}>
                    <div className="back">{back_text}</div>

                </div>
            </div>
            <img src={icon} alt="loudspeaker" className="icon-field"/>
        </div>
    );
};

export default FlashCard;