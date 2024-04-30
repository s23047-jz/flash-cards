import React, { useState } from 'react';
import '../../styles/flash_cards/flash_cards.scss';

const FlashCard: React.FC<{ front: string; back: string }> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="front">{front}</div>
      <div className="back">{back}</div>
    </div>
  );
};

export default FlashCard;