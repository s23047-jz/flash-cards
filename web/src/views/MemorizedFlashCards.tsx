// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import CardsButtonsContainerMemorizedFlashcards
    from "../components/memorized_flash_cards/CardsButtonsContainerMemorizedFlashcards";

const MyDecks = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-not-memorized">
                <CardsButtonsContainerMemorizedFlashcards/>

            </main>
        </>
    );
};

export default MyDecks;