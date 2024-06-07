// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import DownloadedDecksVoiceControlContainer from "../components/downloaded_decks/DownloadedDecksVoiceControlContainer";


const DownloadedDeckVoiceControl = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-voice-mode">
                <DownloadedDecksVoiceControlContainer/>

            </main>
        </>
    );
};

export default DownloadedDeckVoiceControl;