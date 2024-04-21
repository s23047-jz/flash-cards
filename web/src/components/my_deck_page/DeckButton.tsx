// @ts-ignore
import React, {useState} from 'react';
import '../../styles/my_decks/deck_button.scss';

interface ButtonProps {
    frontTextUpper: string;
    frontTextLower: string;
    image: string;
    backText: string;
    onClick: () => void;
}

const DeckButton: React.FC<ButtonProps> = ({frontTextUpper, frontTextLower, image, backText, onClick}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="button-container-my-decks">
            <button className='custom-button' onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)} onClick={onClick}>
                <img src={image} alt="Obrazek 1" className="top-right-image"/>
                <img src={image} alt="Obrazek 2" className="bottom-left-image"/>
                <p>
                    {frontTextUpper}
                    <br/>
                    {frontTextLower}
                </p>
                <span className={hovered ? "visible-span" : "hidden-span"}>{backText}</span>
            </button>
        </div>
    );
};

export default DeckButton;