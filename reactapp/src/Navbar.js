import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ token, user, setToken, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Slanje POST zahteva za odjavu
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Uklanjanje tokena i korisničkih podataka iz sessionStorage
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');

      // Ažuriranje stanja
      setToken(null);
      setUser(null);

      // Redirektovanje na početnu stranicu
      navigate('/');
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Početna</Link>
        {!token ? (
          <>
            <Link to="/login">Prijavi se</Link>
            <Link to="/register">Registruj se</Link>
          </>
        ) : (
          <>
          <Link to="/lessons">Lessons</Link>
            <Link to="/flexboxfroggygame">Flexbox Froggy</Link>
            <span>Dobrodošli, {user?.name}</span>
            <button onClick={handleLogout}>Odjavi se</button>
          </>
        )}
      
      </div>
    </nav>
  );
};

export default Navbar;
