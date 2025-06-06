// @ts-ignore
import React from "react";
import ButtonFlashAllFlashCards from "../all_flashcards_page_buttons/ButtonFlashAllFlashCards";
import '../../styles/voice_control_page/buttons_container_voice_mode.scss'
// @ts-ignore
const ButtonsContainerVoiceMode = ({onClickPrev, onClickNext, onClickRotate, onClickStopControl,onClickPrevSide ,isMicrophoneListening}) => {
    const texts = ['Prev', 'Next', 'Rotate Side', isMicrophoneListening ? 'Stop Listening' : 'Start Listening', 'Back To Deck']
    const button_colors = ['#FF2020', '#46EF31', '#9C1CFF', isMicrophoneListening ? '#f711d1' : '#075be3', '#e05a12']
    const border = '3px solid black'
    return (

        <div className={"grid-container-buttons-not-memorized"}>
            <ButtonFlashAllFlashCards  onClick={onClickPrev} text={texts[0]} color={button_colors[0]} border={border}/>
            <ButtonFlashAllFlashCards  onClick={onClickNext} text={texts[1]} color={button_colors[1]} border={border}/>
            <ButtonFlashAllFlashCards  onClick={onClickRotate} text={texts[2]} color={button_colors[2]} border={border}/>
            <ButtonFlashAllFlashCards onClick={onClickStopControl} text={texts[3]} color={button_colors[3]} border={border}/>
             <ButtonFlashAllFlashCards onClick={onClickPrevSide} text={texts[4]} color={button_colors[4]} border={border}/>
        </div>
    );
};

export default ButtonsContainerVoiceMode;