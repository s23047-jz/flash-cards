// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/my_decks/my_decks.scss'
import {ActiveUser} from "../services/user";
import DecksContainer from "../components/my_deck_page/DecksContainer";

const MyDecks = () => {

    localStorage.removeItem("deckData");
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-my-decks">

                <DecksContainer/>

            </main>
        </>
    );
};

export default MyDecks;