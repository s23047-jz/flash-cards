// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/users_ranking/users_ranking.scss'
import {ActiveUser} from "../services/user";
import UsersRankingContainer from "../components/users_ranking/UsersRankingContainer";

const MyDecks = () => {

    localStorage.removeItem("deckData");
    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-users-ranking">

                <UsersRankingContainer/>

            </main>
        </>
    );
};

export default MyDecks;