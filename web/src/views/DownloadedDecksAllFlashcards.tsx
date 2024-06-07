// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import DownloadedDecksAllFlashcardsContainer
    from "../components/downloaded_decks/DownloadedDecksAllFlashcardsContainer";

const DownloadedDecksAllFlashcards = () => {

    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-flashcards">
                <DownloadedDecksAllFlashcardsContainer/>
            </main>
        </>
    );
};

export default DownloadedDecksAllFlashcards;