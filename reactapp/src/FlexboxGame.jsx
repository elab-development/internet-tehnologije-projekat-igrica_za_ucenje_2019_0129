import React, { useState, useEffect } from 'react';
import './FlexboxGame.css';

const FlexboxGame = () => {
  const levels = [
    {
      task: "Zadatak: Postavi žabu u centar pomoću Flexbox-a!",
      targetCSS: `
        display: flex;
        justify-content: center;
        align-items: center;
      `,
    },
    {
      task: "Zadatak: Postavi žabu levo pomoću Flexbox-a!",
      targetCSS: `
        display: flex;
        justify-content: flex-start;
        align-items: center;
      `,
    },
    {
      task: "Zadatak: Postavi žabu desno pomoću Flexbox-a!",
      targetCSS: `
        display: flex;
        justify-content: flex-end;
        align-items: center;
      `,
    },
    {
      task: "Zadatak: Postavi žabu dole levo pomoću Flexbox-a!",
      targetCSS: `
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
      `,
    },
    {
      task: "Zadatak: Postavi žabu gore desno pomoću Flexbox-a!",
      targetCSS: `
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
      `,
    },
  ];

  const [userCSS, setUserCSS] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    // Učitaj pokušaje iz localStorage-a prilikom inicijalizacije
    const storedAttempts = JSON.parse(localStorage.getItem('flexboxGameAttempts')) || [];
    setAttempts(storedAttempts);
  }, []);

  const handleChange = (e) => {
    setUserCSS(e.target.value);
    applyUserCSS(e.target.value);
  };

  const applyUserCSS = (css) => {
    const gameBox = document.getElementById('game-box');
    gameBox.style = '';
    try {
      gameBox.style.cssText = css;
    } catch (e) {
      console.log('Invalid CSS');
    }

    checkSolution(css);
  };

  const checkSolution = (css) => {
    if (css.trim() === levels[currentLevel].targetCSS.trim()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextLevel = () => {
    // Snimi rezultat u localStorage
    const newAttempt = {
      level: currentLevel + 1,
      date: new Date().toLocaleString(),
    };

    const updatedAttempts = [...attempts, newAttempt];
    setAttempts(updatedAttempts);
    localStorage.setItem('flexboxGameAttempts', JSON.stringify(updatedAttempts));

    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setIsCorrect(false);
      setUserCSS('');
    } else {
      alert("Čestitamo! Završili ste sve nivoe!");
    }
  };

  return (
    <div className="game-container">
      <h1>Flexbox Igrica</h1>
      <p>{levels[currentLevel].task}</p>

      <div id="game-box" className="game-box">
        <div className="frog">🐸</div>
      </div>

      <textarea
        placeholder="Unesite svoj CSS ovde"
        value={userCSS}
        onChange={handleChange}
        className="css-input"
      />

      {isCorrect ? (
        <>
          <p className="success-message">Bravo! Tačno!</p>
          <button className="next-level-button" onClick={nextLevel}>
            Sledeći nivo
          </button>
        </>
      ) : null}

     
      <div className="attempts-container">
        <h2>Istorija pokušaja</h2>
        <table className="attempts-table">
          <thead>
            <tr>
              <th>Nivo</th>
              <th>Datum</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt, index) => (
              <tr key={index}>
                <td>{attempt.level}</td>
                <td>{attempt.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlexboxGame;
