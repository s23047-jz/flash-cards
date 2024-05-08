// @ts-ignore
import React from "react";
import ButtonNotMemorizedFlashCards from "./ButtonNotMemorizedFlashCards";
import '../../styles/not_memorized_flash_cards/buttons_container_not_memorized_flash_cards.scss'
// @ts-ignore
const ButtonContainerNotMemorizedFlashcards = ({onClickPrev, onClickNext, onClickRotate, onClickStopControl,onClickPrevSide ,isMicrophoneListening}) => {
    const texts = ['Prev', 'Next', 'Rotate Side', isMicrophoneListening ? 'Stop Listening' : 'Start Listening', 'Back To Deck']
    const button_colors = ['#FF2020', '#46EF31', '#9C1CFF', isMicrophoneListening ? '#f711d1' : '#075be3', '#e05a12']
    const border = '3px solid black'
    return (

        <div className={"grid-container-buttons-not-memorized"}>
            <ButtonNotMemorizedFlashCards  onClick={onClickPrev} text={texts[0]} color={button_colors[0]} border={border}/>
            <ButtonNotMemorizedFlashCards  onClick={onClickNext} text={texts[1]} color={button_colors[1]} border={border}/>
            <ButtonNotMemorizedFlashCards  onClick={onClickRotate} text={texts[2]} color={button_colors[2]} border={border}/>
            <ButtonNotMemorizedFlashCards onClick={onClickStopControl} text={texts[3]} color={button_colors[3]} border={border}/>
             <ButtonNotMemorizedFlashCards onClick={onClickPrevSide} text={texts[4]} color={button_colors[4]} border={border}/>
        </div>
    );
};

export default ButtonContainerNotMemorizedFlashcards;