// @ts-ignore
import React from "react";
import ButtonFlashAllFlashCards from "../all_flashcards_page_buttons/ButtonFlashAllFlashCards";
import '../../styles/public_deck_flashcards/public_decks_buttons_container.scss'
// @ts-ignore
const PublicDecksButtonsContainer = ({onClickPrev, onClickNext, onClickRotate, onClickBackToDecks, onClickImportDecks}) => {
    const texts = ['Prev', 'Next', 'Rotate Side', 'back to decks', 'import deck']
    const button_colors = ['#FF2020', '#46EF31', '#9C1CFF', '#e05a12', '#c22593']
    const border = '3px solid black'
    return (
        <div className={"grid-container-public-decks-buttons"}>
            <ButtonFlashAllFlashCards onClick={onClickPrev} text={texts[0]} color={button_colors[0]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickNext} text={texts[1]} color={button_colors[1]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickRotate} text={texts[2]} color={button_colors[2]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickBackToDecks} text={texts[3]} color={button_colors[3]} border={border}></ButtonFlashAllFlashCards>
            <ButtonFlashAllFlashCards onClick={onClickImportDecks} text={texts[4]} color={button_colors[4]} border={border}></ButtonFlashAllFlashCards>
        </div>
    );
};

export default PublicDecksButtonsContainer;