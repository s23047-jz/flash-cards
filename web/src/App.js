import React from 'react';
import './styles/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './views/SignIn.tsx';
import Registration from './views/Registration.tsx';
import HomePage from './views/HomePage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
