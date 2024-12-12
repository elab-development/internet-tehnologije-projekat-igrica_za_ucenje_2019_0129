import React from 'react';
import { FaBook, FaTasks, FaUserGraduate } from 'react-icons/fa';
import './Pocetna.css';

const Pocetna = () => {
  return (
    <div className="pocetna-container">
      <header className="header">
        <h1>Dobrodošli u našu platformu za učenje programiranja!</h1>
        <p>
          Učite programiranje na jednostavan i interaktivan način. Pristupite raznovrsnim lekcijama i rešavajte izazovne zadatke kako biste unapredili svoje znanje.
        </p>
      </header>

      <section className="features-section">
        <div className="feature-box">
          <FaBook className="icon" />
          <h3>Interaktivne lekcije</h3>
          <p>
            Naučite osnove programiranja kroz interaktivne lekcije koje pokrivaju teme od početničkog do naprednog nivoa.
          </p>
        </div>

        <div className="feature-box">
          <FaTasks className="icon" />
          <h3>Praktični zadaci</h3>
          <p>
            Vežbajte ono što ste naučili sa praktičnim zadacima. Svaki zadatak dolazi sa jasnim uputstvima i primerima.
          </p>
        </div>

        <div className="feature-box">
          <FaUserGraduate className="icon" />
          <h3>Pratite svoj napredak</h3>
          <p>
            Pratite svoj napredak kroz platformu. Postanite programer sa certifikatom i pridružite se našoj zajednici programera.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>
          Započnite danas i postanite majstor programiranja. <a href="/register">Registrujte se</a> ili <a href="/login">prijavite se</a> da biste pristupili svim lekcijama i zadacima.
        </p>
      </footer>
    </div>
  );
};

export default Pocetna;
