// @ts-ignore
import microphone_black from '../../assets/Microphone_black.png';
// @ts-ignore
import React, {useState} from "react";
import FlashCard from "./FlashCard";
import FlashCardField from "./FlashCardField";
import {DeckService} from '../../services/decs';
import "../../styles/flash_cards/flash_cards_container.scss"
const FlashCardsContainer  = () => {


    return (
        <div className={"all-flashcards-container"}>
            <FlashCard front_text={"text front"} back_text={"back text"} icon={microphone_black}/>
            <p className={"all-flashcards-text"}>All Flashcards</p>
            <FlashCardField front_text={"opularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software li"} back_text={"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} icon={microphone_black}/>
        </div>

    );
};

export default FlashCardsContainer;