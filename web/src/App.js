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
import PublicDecks from "./views/PublicDecks";
import UsersRanking from "./views/UsersRanking";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>

                    <Route element={<PrivateRoute/>}>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/create_deck" element={<CreateFlashCardsPage/>}/>
                        <Route path="/my_decks" element={<MyDecks/>}/>
                        <Route path="/public_decks" element={<PublicDecks/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/my_deck_learning_modes" element={<DeckAllFlashcards/>}/>
                        <Route path="/voice_control" element={<VoiceControlMode/>}/>
                        <Route path="/not_memorized_flash_cards" element={<NotMemorizedFlashCards/>}/>
                        <Route path="/memorized_flash_cards" element={<MemorizedFlashCards/>}/>
                        <Route path="/learning_mode" element={<LearningMode/>}/>
                        <Route path="/users_ranking" element={<UsersRanking/>}/>
                    </Route>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/registration" element={<Registration/>}/>


                </Routes>
            </div>
        </Router>
    );
}

export default App;