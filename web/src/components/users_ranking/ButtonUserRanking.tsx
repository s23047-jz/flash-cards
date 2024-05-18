// @ts-ignore
import React, {useState} from 'react';
import '../../styles/users_ranking/button_user_ranking.scss';

// @ts-ignore
const ButtonUserRanking = ({rankingPosition, frontTextUpper, frontTextLower, image, backText, onClick}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="button-container-users-ranking">
            <button className='custom-button' onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)} onClick={onClick}>
                <img src={image} alt="avatar" className="image-mid"/>
                <div className={"position-container"}>
                    <p className={"top-right-ranking-position"}>{rankingPosition}</p>
                    <p className={"bottom-left-ranking-position"}>{rankingPosition}</p>
                </div>

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

export default ButtonUserRanking;