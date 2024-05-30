// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import '../styles/users_ranking/users_ranking.scss'
import UsersContainerModeratorPanel from "../components/moderator_panel_users/UsersContainerModeratorPanel";

const ModeratorPanelUsers = () => {

    localStorage.removeItem("deckData");
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container-users-ranking">

                <UsersContainerModeratorPanel/>

            </main>
        </>
    );
};

export default ModeratorPanelUsers;