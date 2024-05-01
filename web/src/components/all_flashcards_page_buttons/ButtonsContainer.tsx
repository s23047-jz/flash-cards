// @ts-ignore
import React from "react";
import ButtonFlashAllFlashCards from "./ButtonFlashAllFlashCards";
import '../../styles/all_flash_cards_page/decks_container.scss'
// @ts-ignore
const ButtonsContainer = ({onClickPrev, onClickNext, onClickRotate}) => {
    const texts = ['Prev', 'Next', 'Rotate Side']
    const button_colors = ['#FF2020', '#46EF31', '#9C1CFF']
    const border = '3px solid black'
    return (
        <div className={"grid-container-buttons"}>
            <ButtonFlashAllFlashCards onClick={onClickPrev} text={texts[0]} color={button_colors[0]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickNext} text={texts[1]} color={button_colors[1]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickRotate} text={texts[2]} color={button_colors[2]} border={border}></ButtonFlashAllFlashCards>
        </div>
    );
};

export default ButtonsContainer;