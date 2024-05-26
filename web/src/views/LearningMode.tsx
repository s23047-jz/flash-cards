// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import CardsButtonsContainerLearningMode from "../components/learning_mode/CardsButtonsContainerLearningMode";


const MyDecks = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-learning-mode">
                <CardsButtonsContainerLearningMode/>

            </main>
        </>
    );
};

export default MyDecks;