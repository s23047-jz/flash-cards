// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import DownloadedDeckMemorizedFlashcardsContainer
    from "../components/downloaded_decks/DownloadedDecksMemorizedFlashcardsContainer";

const DownloadedDecksMemorizedFlashcards = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-not-memorized">
                <DownloadedDeckMemorizedFlashcardsContainer/>

            </main>
        </>
    );
};

export default DownloadedDecksMemorizedFlashcards ;