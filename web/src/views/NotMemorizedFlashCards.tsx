// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import CardsButtonsContainerNotMemorized
    from "../components/not_memorized_flashcards/CardsButtonsContainerNotMemorized";
// @ts-ignore
const NotMemorizedFlashCards = ({backToDeckPath}) => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-not-memorized">
                <CardsButtonsContainerNotMemorized backToDeckPath={backToDeckPath}/>

            </main>
        </>
    );
};

export default NotMemorizedFlashCards;