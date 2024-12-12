import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField'; 
import './LoginForm.css'; 

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State za prikaz lozinke
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false); // State za prikaz potvrde lozinke
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Funkcija za generisanje nasumičnog korisnika koristeći Random User API
  const generateRandomUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const randomUser = response.data.results[0];

      // Popunjavanje input polja sa nasumičnim podacima
      setName(`${randomUser.name.first} ${randomUser.name.last}`);
      setEmail(randomUser.email);
      const generatedPassword = randomUser.login.password;
      setPassword(generatedPassword);
      setPasswordConfirmation(generatedPassword);
    } catch (error) {
      setError('Neuspešno generisanje korisnika. Pokušajte ponovo.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      navigate('/login');
    } catch (err) {
      setError('Registracija nije uspela. Pokušajte ponovo.');
    }
  };

  return (
    <div className="login-container">
      <h2>Registruj se</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <InputField
          label="Ime:"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label="Email:"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Polje za unos lozinke sa opcijom prikazivanja i skrivanja */}
        <div className="password-container">
          <InputField
            label="Lozinka:"
            type={showPassword ? "text" : "password"} // Prikazuje lozinku u zavisnosti od state-a
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Sakrij" : "Prikaži"}
          </button>
        </div>

        {/* Polje za potvrdu lozinke sa opcijom prikazivanja i skrivanja */}
        <div className="password-container">
          <InputField
            label="Potvrdi lozinku:"
            type={showPasswordConfirmation ? "text" : "password"}
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
          >
            {showPasswordConfirmation ? "Sakrij" : "Prikaži"}
          </button>
        </div>

        <button type="submit" className="login-button">Registruj se</button>
      </form>
      <button onClick={generateRandomUser} className="generate-button">Generiši nasumičnog korisnika</button>
    </div>
  );
};

export default RegisterForm;
