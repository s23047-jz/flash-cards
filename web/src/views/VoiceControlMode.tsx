// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import CardsButtonsContainer from "../components/voice_control/CardsButtonsContainer";

const MyDecks = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-voice-mode">
                <CardsButtonsContainer></CardsButtonsContainer>

            </main>
        </>
    );
};

export default MyDecks;