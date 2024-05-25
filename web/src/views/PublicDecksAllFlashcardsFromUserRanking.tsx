// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import PublicDecksFlashCardsContainerFromUserRanking
    from "../components/public_decks_all_flashcards_from_user_ranking/ PublicDecksFlashCardsContainerFromUserRanking";

const PublicDecksAllFlashcardsFromUserRanking = () => {

    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-public-deck-flashcards-from-user-ranking">
                <PublicDecksFlashCardsContainerFromUserRanking/>
            </main>
        </>
    );
};

export default PublicDecksAllFlashcardsFromUserRanking;