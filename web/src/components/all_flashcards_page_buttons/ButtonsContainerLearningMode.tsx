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
import purple_cards from '../../assets/purple_cards.png'
// @ts-ignore
const ButtonsContainer = ({onClickPrev, onClickNext, onClickRotate}) => {
    const texts = ['Prev', 'Next', 'Rotate Side']
    const button_colors = ['#1746FF', '#228FFE']
    const border = '3px solid black'
    return (
        <div className={"grid-container-buttons-learning-modes"}>
            <ButtonLearningModes image={red_cards} onClick={onClickPrev} text={"Learn"} color={button_colors[0]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={green_cards} onClick={onClickPrev} text={"Memorized Flashcards"}
                                 color={button_colors[1]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={yellow_cards} onClick={onClickPrev} text={"Not Memorized Flashcards"}
                                 color={button_colors[0]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={blue_cards} onClick={onClickPrev} text={"Voice Control"}
                                 color={button_colors[1]}
                                 border={border}></ButtonLearningModes>
            <ButtonLearningModes image={purple_cards} onClick={onClickPrev} text={"Options"} color={button_colors[0]}
                                 border={border}></ButtonLearningModes>
        </div>
    );
};

export default ButtonsContainer;