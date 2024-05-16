// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/decks_ranking/decks_ranking.scss'
import DecksRankingContainer from "../components/decks_ranking/DecksRankingContainer";

const DecksRanking = () => {

    localStorage.removeItem("deckData");
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-decks-ranking">

                <DecksRankingContainer/>

            </main>
        </>
    );
};

export default DecksRanking;