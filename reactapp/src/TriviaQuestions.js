import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TriviaQuestions.css';

const TriviaQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const categories = [
    'artliterature',
    'language',
    'sciencenature',
    'general',
    'fooddrink',
    'peopleplaces',
    'geography',
    'historyholidays',
    'entertainment',
    'toysgames',
    'music',
    'mathematics',
    'religionmythology',
    'sportsleisure',
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      const selectedCategories = categories.slice(0, 10); // Izaberemo 10 oblasti
      const requests = selectedCategories.map((category) =>
        axios.get(`https://api.api-ninjas.com/v1/trivia?category=${category}`, {
          headers: { 'X-Api-Key': 'ag23EGdc6Mp8KAFR8e9b0a2l5XXP4KdS7zFrPTV5' },  
        })
      );

      try {
        const responses = await Promise.all(requests);
        const triviaData = responses.map((response) => response.data[0]); // Uzimamo prvo pitanje iz svake oblasti
        setQuestions(triviaData);
        setLoading(false);
      } catch (err) {
        setError('Greška prilikom učitavanja pitanja.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, answer) => {
    setUserAnswers({ ...userAnswers, [index]: answer });
  };

  const handleSubmit = () => {
    let currentScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index]?.toLowerCase() === question.answer.toLowerCase()) {
        currentScore++;
      }
    });
    setScore(currentScore);
    alert(`Vaš rezultat je: ${currentScore} od ${questions.length}`);
  };

  if (loading) return <p>Učitavanje pitanja...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="trivia-container">
      <h1>Trivia Kviz</h1>
      <div className="trivia-list">
        {questions.map((question, index) => (
          <div key={index} className="trivia-question">
            <h3>Pitanje {index + 1}:</h3>
            <p>{question.question}</p>
            <input
              type="text"
              placeholder="Unesite odgovor"
              value={userAnswers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="answer-input"
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Pošalji odgovore
      </button>
      <p className="score">Rezultat: {score} od {questions.length}</p>
    </div>
  );
};

export default TriviaQuestions;
