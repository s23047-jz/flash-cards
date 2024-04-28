import React from 'react';
import './styles/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './views/SignIn.tsx';
import Registration from './views/Registration.tsx';
import HomePage from './views/HomePage';
import PrivateRoute from './utils/PrivateRoute';
import CreateFlashCardsPage from "./views/CreateFlashCardsPage";
import MyDecks from "./views/MyDecks";
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/home" element={<HomePage/>} exact/>
                    </Route>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/create_deck" element={<CreateFlashCardsPage/>}/>
                    <Route path="/my_decks" element={<MyDecks/>}/>

                </Routes>
            </div>
        </Router>
    );
}

export default App;