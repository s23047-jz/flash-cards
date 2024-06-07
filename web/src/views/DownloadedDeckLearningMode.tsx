// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import DownloadedDeckLearningModeContainer from "../components/downloaded_decks/DownloadedDeckLearningModeContainer";


const DownloadedDecksLearningMode = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-learning-mode">
                <DownloadedDeckLearningModeContainer/>

            </main>
        </>
    );
};

export default DownloadedDecksLearningMode;