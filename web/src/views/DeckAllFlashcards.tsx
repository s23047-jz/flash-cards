// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import FlashCardsContainer from "../components/flash_cards/FlashCardsContainer";


const DeckAllFlashcards = () => {

    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-flashcards">
                <FlashCardsContainer/>
            </main>
        </>
    );
};

export default DeckAllFlashcards;