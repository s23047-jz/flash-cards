// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/home_page/home_page_style.scss'
import {ActiveUser} from "../services/user";
import '../styles/my_decks/web_title.scss'
import { useNavigate } from 'react-router-dom';
import DecksContainer from "../components/my_deck_page/DecksContainer";
const MyDecks = () => {
    const navigate = useNavigate();

    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container">
                <DecksContainer/>
                    <p className="web-title">My Decks</p>
            </main>
        </>
    );
};

export default MyDecks;