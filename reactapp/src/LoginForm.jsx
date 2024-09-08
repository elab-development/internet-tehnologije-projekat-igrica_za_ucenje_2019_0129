import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ setToken, setUser }) => {
  const [email, setEmail] = useState('oj20190129@student.fon.bg.ac.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      // Čuvanje podataka o korisniku u session storage
      const { access_token, user } = response.data;
      sessionStorage.setItem('auth_token', access_token);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Postavljanje tokena i korisnika u App.js
      setToken(access_token);
      setUser(user);

      // Navigacija ka Flexbox Froggy igrici
      navigate('/flexboxfroggygame');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Prijavi se</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Lozinka:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Prijavi se</button>
      </form>
    </div>
  );
};

export default LoginForm;
