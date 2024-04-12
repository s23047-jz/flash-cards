import React from 'react';
import './styles/App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './views/SignIn.tsx';
import Registration from './views/Registration.tsx';
import HomePage from './views/HomePage';
import PrivateRoute from './utils/PrivateRoute';

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

                </Routes>
            </div>
        </Router>
    );
}

export default App;