// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import {ActiveUser} from "../services/user";
import DownloadedDecksNotMemorizedContainer from "../components/downloaded_decks/DownloadedDecksNotMemorizedContainer";
const DownloadedDecksNotMemorized = () => {
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-not-memorized">
                <DownloadedDecksNotMemorizedContainer/>

            </main>
        </>
    );
};

export default DownloadedDecksNotMemorized;