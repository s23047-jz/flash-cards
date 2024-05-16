// @ts-ignore
import React, {useState} from 'react';
import '../../styles/decks_ranking/button_deck_ranking.scss';

// @ts-ignore
const ButtonDeckRanking = ({rankingPosition, frontTextUpper, frontTextLower, backText, onClick}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="button-container-deck-ranking">
            <button className='custom-button' onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)} onClick={onClick}>
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

export default ButtonDeckRanking;