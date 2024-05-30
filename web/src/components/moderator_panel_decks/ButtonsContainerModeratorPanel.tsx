// @ts-ignore
import React from "react";
import ButtonFlashAllFlashCards from "../all_flashcards_page_buttons/ButtonFlashAllFlashCards";
import '../../styles/moderator_panel_decks/buttons_container_moderator_panel.scss'
// @ts-ignore
const ButtonsContainerModeratorPanel = ({onClickPrev, onClickNext, onClickRotate, onClickBackToDecks, onClickDeleteDeckFromApp, onClickDeleteDeckFromReportedList}) => {
    const texts = ['Prev', 'Next', 'Rotate Side', 'back to decks', 'remove from reported list', 'deleted from app']
    const button_colors = ['#FF2020', '#46EF31', '#9C1CFF', '#e05a12', '#c22593', '#0d298f']
    const border = '3px solid black'
    return (
        <div className={"grid-container-moderator-panel-buttons"}>
            <ButtonFlashAllFlashCards onClick={onClickPrev} text={texts[0]} color={button_colors[0]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickNext} text={texts[1]} color={button_colors[1]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickRotate} text={texts[2]} color={button_colors[2]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickBackToDecks} text={texts[3]} color={button_colors[3]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickDeleteDeckFromReportedList} text={texts[4]} color={button_colors[4]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickDeleteDeckFromApp} text={texts[5]} color={button_colors[5]} border={border}></ButtonFlashAllFlashCards>
        </div>
    );
};

export default ButtonsContainerModeratorPanel;