// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import PublicDecksFlashCardsContainer from "../components/public_decks_flashcards/PublicDecksFlashCardsContainer";

const PublicDecksFlashCards = () => {

    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-public-deck-flashcards">
                <PublicDecksFlashCardsContainer/>
            </main>
        </>
    );
};

export default PublicDecksFlashCards;