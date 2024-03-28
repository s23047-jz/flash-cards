import React from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './views/SignIn.tsx';
import Registration from './views/Registration.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/registration" element={<Registration />} />
          {/* Możesz dodać więcej ścieżek i komponentów tutaj */}
          {/* Domyślna ścieżka/strona główna */}
          {/*<Route path="/" element={<div>Strona główna</div>} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
