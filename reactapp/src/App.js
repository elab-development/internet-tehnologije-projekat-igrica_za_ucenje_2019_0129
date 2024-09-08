import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import FlexboxGame from './FlexboxGame';
import Pocetna from './Pocetna';
import RegisterForm from './RegisterForm';
import Navbar from './Navbar';
import LessonsTable from './LessonsTable';
import ChallengeTable from './ChallengeTable';
import TriviaQuestions from './TriviaQuestions';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Učitavanje tokena i korisnika iz sessionStorage-a pri pokretanju aplikacije
  useEffect(() => {
    const savedToken = sessionStorage.getItem('auth_token');
    const savedUser = JSON.parse(sessionStorage.getItem('user'));

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <Router>
      <Navbar token={token} user={user} setToken={setToken} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/lessons" element={<LessonsTable />} />
        <Route path="/challenges" element={<ChallengeTable />} />
        <Route path="/trivia" element={<TriviaQuestions />} />


        <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/flexboxfroggygame" element={<FlexboxGame />} />
      </Routes>
    </Router>
  );
}

export default App;
