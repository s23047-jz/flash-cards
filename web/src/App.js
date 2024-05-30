import React from 'react';
import './styles/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './views/SignIn.tsx';
import Registration from './views/Registration.tsx';
import HomePage from './views/HomePage';
import PrivateRoute from './utils/PrivateRoute';
import CreateFlashCardsPage from "./views/CreateFlashCardsPage";
import MyDecks from "./views/MyDecks";
import Profile from "./views/Profile";
import DeckAllFlashcards from "./views/DeckAllFlashcards";
import VoiceControlMode from "./views/VoiceControlMode";
import NotMemorizedFlashCards from "./views/NotMemorizedFlashCards";
import MemorizedFlashCards from "./views/MemorizedFlashCards";
import LearningMode from "./views/LearningMode";
import UserStatsPage from "./views/UserStats";
import PublicDecks from "./views/PublicDecks";
import UsersRanking from "./views/UsersRanking";
import DecksRanking from "./views/DecksRanking";
import PublicDecksFlashCards from "./views/PublicDeckFlashCards";
import PublicDecksUserRanking from "./views/PublicDecksUserRanking";
import PublicDecksAllFlashcardsFromUserRanking from "./views/PublicDecksAllFlashcardsFromUserRanking";
import ModeratorPanelDecks from "./views/ModeratorPanelDecks";
import ModeratorPanelDeckAllFlashCards from "./views/ModeratorPanelDeckAllFlashCards";
import ModeratorPanelUsers from "./views/ModeratorPanelUsers";
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/create_deck" element={<CreateFlashCardsPage/>}/>
                        <Route path="/my_decks" element={<MyDecks/>}/>
                        <Route path="/public_decks" element={<PublicDecks/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/user-stats" element={<UserStatsPage />} />
                        <Route path="/my_deck_learning_modes" element={<DeckAllFlashcards/>}/>
                        <Route path="/voice_control" element={<VoiceControlMode/>}/>
                        <Route path="/not_memorized_flash_cards" element={<NotMemorizedFlashCards/>}/>
                        <Route path="/memorized_flash_cards" element={<MemorizedFlashCards/>}/>
                        <Route path="/learning_mode" element={<LearningMode/>}/>
                        <Route path="/users_ranking" element={<UsersRanking/>}/>
                        <Route path="/decks_ranking" element={<DecksRanking/>}/>
                        <Route path="/public_decks_flashcards" element={<PublicDecksFlashCards/>}/>
                        <Route path="/public_decks_user_ranking" element={<PublicDecksUserRanking/>}/>
                        <Route path="/moderator_panel_decks" element={<ModeratorPanelDecks />}/>
                        <Route path="/reported_Deck" element={<ModeratorPanelDeckAllFlashCards/>}/>
                        <Route path="/users_moderator_panel" element={<ModeratorPanelUsers/>}/>
                    </Route>
                    <Route path="/flashcards_from_user_ranking" element={< PublicDecksAllFlashcardsFromUserRanking/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/registration" element={<Registration/>}/>


                </Routes>
            </div>
        </Router>
    );
}

export default App;