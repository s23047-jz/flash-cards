// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/decks_ranking/decks_ranking.scss'
import DeckFlashCardContainerModeratorPanel
    from "../components/moderator_panel_decks/DeckFlashCardContainerModeratorPanel";

const ModeratorPanelDeckAllFlashCards = () => {

    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-decks-moderator-panel">

                <DeckFlashCardContainerModeratorPanel/>

            </main>
        </>
    );
};

export default ModeratorPanelDeckAllFlashCards ;