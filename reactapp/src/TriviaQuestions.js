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

  const generateFileContent = () => {
    let content = `Trivia Kviz Pitanja i Odgovori:\n\n`;
    questions.forEach((question, index) => {
      content += `Pitanje ${index + 1}: ${question.question}\n`;
      content += `Vaš odgovor: ${userAnswers[index] || 'Nema odgovora'}\n`;
      content += `Tačan odgovor: ${question.answer}\n\n`;
    });
    return content;
  };

  const downloadFile = () => {
    const content = generateFileContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trivia_questions.txt';
    link.click();
    window.URL.revokeObjectURL(url); // Oslobađanje memorije
  };

  const printQuestions = () => {
    const content = generateFileContent();
    const newWindow = window.open('', '_blank', 'width=600,height=400');
    newWindow.document.write('<pre>' + content + '</pre>');
    newWindow.document.close();
    newWindow.print();
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

      {/* Dodato dugme za preuzimanje pitanja */}
      <button onClick={downloadFile} className="download-button">
        Preuzmi pitanja
      </button>

      {/* Dodato dugme za štampanje pitanja */}
      <button onClick={printQuestions} className="print-button">
        Štampaj pitanja
      </button>
    </div>
  );
};

export default TriviaQuestions;
