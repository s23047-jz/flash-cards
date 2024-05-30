// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/decks_ranking/decks_ranking.scss'
import ModeratorPanelDecksContainer from "../components/moderator_panel_decks/ModeratorPanelDecksContainer";

const ModeratorPanelDecks = () => {

    localStorage.removeItem("deckData");
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-decks-ranking">

                <ModeratorPanelDecksContainer/>

            </main>
        </>
    );
};

export default ModeratorPanelDecks ;