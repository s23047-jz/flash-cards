// @ts-ignore
import React from "react";
import ButtonLearningModes from "./ButtonLearningModes";
import '../../styles/all_flash_cards_page/container_learning_modes.scss'
// @ts-ignore
import red_cards from '../../assets/Red_cards.png'
// @ts-ignore
import blue_cards from '../../assets/light_blue_cards.png'
// @ts-ignore
import green_cards from '../../assets/light_green_cards.png'
// @ts-ignore
import yellow_cards from '../../assets/Yellow_cards.png'
// @ts-ignore
import pink_cards from '../../assets/dark_pink_cards.png'
// @ts-ignore
const ButtonsContainer = ({onClickLearn,onClickMemorized, onClickNotMemorized, onClickVoiceControl,onClickOptions}) => {
    const button_colors = ['#007AFF', '#0060FF','#0042FF','#0024FF','#0100FF']
    const border = '3px solid black'
    return (
        <div className={"grid-container-buttons-learning-modes"}>
            <ButtonLearningModes image={red_cards} onClick={onClickLearn} text={"Learn"} color={button_colors[0]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={green_cards} onClick={onClickMemorized} text={"Memorized Flashcards"}
                                 color={button_colors[1]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={yellow_cards} onClick={onClickNotMemorized} text={"Not Memorized Flashcards"}
                                 color={button_colors[2]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={blue_cards} onClick={onClickVoiceControl} text={"Voice Control"}
                                 color={button_colors[3]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={pink_cards} onClick={onClickOptions} text={"Options"} color={button_colors[4]}
                                 border={border}></ButtonLearningModes>
        </div>
    );
};

export default ButtonsContainer;