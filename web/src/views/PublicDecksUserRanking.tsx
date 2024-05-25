// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/my_decks/my_decks.scss'
import DecksContainerPublicUserRanking from "../components/public_decks_user_ranking/DecksContainerPublicUserRanking";

const PublicDecksUserRanking = () => {

    localStorage.removeItem("deckData");
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-public-decks-user-ranking">

                <DecksContainerPublicUserRanking/>

            </main>
        </>
    );
};

export default PublicDecksUserRanking;