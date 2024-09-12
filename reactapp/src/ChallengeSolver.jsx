import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChallengeSolver.css';

const ChallengeSolver = () => {
  const [challenges, setChallenges] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [showHints, setShowHints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = 1; // Primer za korisnika, možeš ga dinamički dohvatiti

  const savedToken = sessionStorage.getItem('auth_token'); // Uzimanje auth tokena iz sessionStorage

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/challenges', {
          headers: {
            Authorization: `Bearer ${savedToken}`, // Slanje tokena u zaglavlju
          },
        });
        setChallenges(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Greška prilikom učitavanja izazova.');
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [savedToken]);

  const handleAnswerChange = (challengeId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [challengeId]: answer,
    });
  };

  const handleSubmitAnswer = async (challenge) => {
    const userAnswer = userAnswers[challenge.id]?.toLowerCase();
    const correctAnswer = challenge.answer.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    setCorrectAnswers({
      ...correctAnswers,
      [challenge.id]: isCorrect ? 'correct' : 'incorrect',
    });

    if (!isCorrect) {
      // Ako je odgovor netačan, prikazujemo dugme za hint
      setShowHints({
        ...showHints,
        [challenge.id]: true,
      });
    }

    // Slažemo pokušaj u bazu
    await submitChallengeAttempt(challenge.id, isCorrect ? 'success' : 'failed');
  };

  const submitChallengeAttempt = async (challengeId, status) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/challenge-user-pivot', {
        user_id: userId,
        challenge_id: challengeId,
        attempted_at: new Date(),
        status: status,
      }, {
        headers: {
          Authorization: `Bearer ${savedToken}`, // Slanje tokena u zaglavlju
        },
      });
    } catch (err) {
      console.error('Greška prilikom zapisivanja pokušaja:', err);
    }
  };

  if (loading) return <p>Učitavanje izazova...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="challenge-solver-container">
      <h1>Rešavanje Izazova</h1>
      <div className="challenge-list">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-item">
            <h3>{challenge.question}</h3>
            <p><strong>Težina:</strong> {challenge.difficulty}</p>
            <input
              type="text"
              placeholder="Vaš odgovor"
              value={userAnswers[challenge.id] || ''}
              onChange={(e) => handleAnswerChange(challenge.id, e.target.value)}
            />
            <button
              onClick={() => handleSubmitAnswer(challenge)}
              className="submit-answer-button"
            >
              Proveri odgovor
            </button>
            {/* Prikazujemo poruku o tačnosti odgovora */}
            {correctAnswers[challenge.id] === 'correct' && (
              <p className="correct-answer">Tačno!</p>
            )}
            {correctAnswers[challenge.id] === 'incorrect' && (
              <p className="incorrect-answer">Netačno, pokušajte ponovo.</p>
            )}
            {/* Dugme za prikaz hint-a, koje se prikazuje nakon prvog netačnog odgovora */}
            {showHints[challenge.id] && challenge.hint && (
              <button
                className="show-hint-button"
                onClick={() => alert(`Hint: ${challenge.hint}`)}
              >
                Prikaži hint
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeSolver;
