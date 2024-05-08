// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import CardsButtonsContainerNotMemorized
    from "../components/not_memorized_flashcards/CardsButtonsContainerNotMemorized";

const MyDecks = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-not-memorized">
                <CardsButtonsContainerNotMemorized/>

            </main>
        </>
    );
};

export default MyDecks;