// @ts-ignore
import React, { useState } from 'react';
import '../../styles/button/button_home_page.scss';

interface ButtonProps {
    frontText: string;
    image: string;
    backText: string;
    onClick: () => void;
}

const ButtonHomePage: React.FC<ButtonProps> = ({ frontText, image, backText, onClick }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="button-container" >
            <button className='custom-button' onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)} onClick={onClick}>
                <img src={image} alt="Obrazek 1" className="top-right-image" />
                <img src={image} alt="Obrazek 2" className="bottom-left-image" />
                <p>
                    {frontText}
                </p>
                <span className={hovered ? "visible-span" : "hidden-span"}>{backText}</span>
            </button>
        </div>
    );
};

export default ButtonHomePage;