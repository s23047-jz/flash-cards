// @ts-ignore
import React from "react";
import ButtonNotMemorizedFlashCards from "../not_memorized_flashcards/ButtonNotMemorizedFlashCards";
import '../../styles/learning_mode/buttons_container_learning_mode.scss'
// @ts-ignore
const ButtonContainerNotMemorizedFlashcards = ({onClickPrev, onClickNext, onClickRotate,onClickPrevSide }) => {
    const texts = ['Not Remember', 'Remember', 'Rotate Side', 'Back To Deck']
    const button_colors = ['#FF2020', '#46EF31', '#9C1CFF', '#e05a12']
    const border = '3px solid black'
    return (

        <div className={"grid-container-buttons-learning-mode"}>
            <ButtonNotMemorizedFlashCards  onClick={onClickPrev} text={texts[0]} color={button_colors[0]} border={border}/>
            <ButtonNotMemorizedFlashCards  onClick={onClickNext} text={texts[1]} color={button_colors[1]} border={border}/>
            <ButtonNotMemorizedFlashCards  onClick={onClickRotate} text={texts[2]} color={button_colors[2]} border={border}/>
             <ButtonNotMemorizedFlashCards onClick={onClickPrevSide} text={texts[3]} color={button_colors[3]} border={border}/>
        </div>
    );
};

export default ButtonContainerNotMemorizedFlashcards;