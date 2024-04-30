// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/home_page/home_page_style.scss'
import {ActiveUser} from "../services/user";
import FlashCard from "../components/flash_cards/FlashCard";

const DeckAllFlashcards = () => {

    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container">
                <FlashCard front={"text front"} back={"back text"}/>
            </main>
        </>
    );
};

export default DeckAllFlashcards;