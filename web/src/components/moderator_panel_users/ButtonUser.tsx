// @ts-ignore
import React, {useState} from 'react';
import '../../styles/moderator_panel_users/button_users.scss';

// @ts-ignore
const ButtonUserModeratorPanel = ({frontTextUpper, frontTextLower, image, backText, onClick}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="button-container-user-moderator-panel">
            <button className='custom-button' onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)} onClick={onClick}>
                <img src={image} alt="avatar" className="image-mid"/>


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

export default ButtonUserModeratorPanel;