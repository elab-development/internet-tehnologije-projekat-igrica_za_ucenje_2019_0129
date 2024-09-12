import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChallengeTable.css'; 
import useChallenges from './useChallenges';
import useLessons from './useLessons'; // Importujemo hook za učitavanje lekcija

const ChallengeTable = () => {
  const { challenges, loading, error, setChallenges } = useChallenges();  
  const { lessons, loading: lessonsLoading, error: lessonsError } = useLessons(); // Koristimo useLessons za učitavanje lekcija
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 
  const [showModal, setShowModal] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null); // Držimo trenutno editovani izazov
  const [newChallenge, setNewChallenge] = useState({
    question: '',
    answer: '',
    difficulty: '',
    lesson_id: '',
    hint: '',
    max_attempts: '',
    time_limit: '',
    type: '',
    points: ''
  });

  // Čitanje iz lokalne memorije (localStorage) pri prvom učitavanju
  useEffect(() => {
    const storedChallenges = localStorage.getItem('challenges');
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges));
    }
  }, [setChallenges]);

  // Ažuriraj localStorage svaki put kada se izazovi promene
  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  // Filtriranje izazova
  const filteredChallenges = challenges.filter((challenge) => 
    challenge.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    challenge.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginacija
  const indexOfLastChallenge = currentPage * itemsPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - itemsPerPage;
  const currentChallenges = filteredChallenges.slice(indexOfFirstChallenge, indexOfLastChallenge);
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Kreiranje ili ažuriranje izazova
  const handleSaveChallenge = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      alert('Niste prijavljeni!');
      return;
    }

    try {
      let updatedChallenges;
      if (editingChallenge) {
        // Ažuriranje izazova
        const response = await axios.put(
          `http://127.0.0.1:8000/api/challenges/${editingChallenge.id}`, 
          newChallenge,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        updatedChallenges = challenges.map((challenge) => 
          challenge.id === editingChallenge.id ? response.data.data : challenge
        );
      } else {
        // Kreiranje novog izazova
        const response = await axios.post('http://127.0.0.1:8000/api/challenges', newChallenge, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updatedChallenges = [...challenges, response.data.data];
      }
      setChallenges(updatedChallenges);
      setShowModal(false);
      setNewChallenge({
        question: '',
        answer: '',
        difficulty: '',
        lesson_id: '',
        hint: '',
        max_attempts: '',
        time_limit: '',
        type: '',
        points: ''
      });
      setEditingChallenge(null);
    } catch (error) {
      console.error('Greška prilikom kreiranja/ažuriranja izazova:', error);
    }
  };

  // Prikaz modala za editovanje
  const handleEditChallenge = (challenge) => {
    setNewChallenge(challenge);
    setEditingChallenge(challenge);
    setShowModal(true);
  };

  // Brisanje izazova
  const handleDeleteChallenge = async (id) => {
    const token = sessionStorage.getItem('auth_token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/challenges/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedChallenges = challenges.filter((challenge) => challenge.id !== id);
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Greška prilikom brisanja izazova:', error);
    }
  };

  if (loading || lessonsLoading) return <p>Učitavanje...</p>;
  if (error || lessonsError) return <p>{error || lessonsError}</p>;

  return (
    <div className="challenge-table-container">
      <h2>Lista Izazova</h2>

      {/* Filter za pretragu */}
      <input 
        type="text" 
        placeholder="Pretraži izazove..." 
        value={searchTerm} 
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Resetovanje na prvu stranicu prilikom pretrage
        }}
        className="search-input"
      />

      {/* Dugme za otvaranje modala */}
      <button onClick={() => setShowModal(true)} className="create-challenge-button">
        {editingChallenge ? "Ažuriraj Izazov" : "Kreiraj Izazov"}
      </button>

      {/* Modal za kreiranje/uređivanje izazova */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingChallenge ? "Ažuriraj Izazov" : "Kreiraj novi izazov"}</h3>
            <form onSubmit={handleSaveChallenge} className="create-challenge-form">
              <input 
                type="text" 
                placeholder="Pitanje" 
                value={newChallenge.question} 
                onChange={(e) => setNewChallenge({ ...newChallenge, question: e.target.value })} 
                required 
              />
              <textarea 
                placeholder="Odgovor" 
                value={newChallenge.answer} 
                onChange={(e) => setNewChallenge({ ...newChallenge, answer: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Težina" 
                value={newChallenge.difficulty} 
                onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value })} 
                required 
              />

              {/* Select za biranje lekcije */}
              <select 
                value={newChallenge.lesson_id} 
                onChange={(e) => setNewChallenge({ ...newChallenge, lesson_id: e.target.value })} 
                required
              >
                <option value="">Izaberite lekciju</option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>

              <input 
                type="text" 
                placeholder="Tip" 
                value={newChallenge.type} 
                onChange={(e) => setNewChallenge({ ...newChallenge, type: e.target.value })} 
                required 
              />
              <input 
                type="number" 
                placeholder="Poeni" 
                value={newChallenge.points} 
                onChange={(e) => setNewChallenge({ ...newChallenge, points: e.target.value })} 
                required 
              />
              <button type="submit">{editingChallenge ? "Ažuriraj" : "Kreiraj"}</button>
              <button type="button" onClick={() => setShowModal(false)}>Zatvori</button>
            </form>
          </div>
        </div>
      )}

      {/* Tabela sa izazovima */}
      <table className="challenge-table">
        <thead>
          <tr>
            <th>Pitanje</th>
            <th>Težina</th>
            <th>Tip</th>
            <th>Poeni</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentChallenges.map((challenge) => (
            <tr key={challenge.id}>
              <td>{challenge.question}</td>
              <td>{challenge.difficulty}</td>
              <td>{challenge.type}</td>
              <td>{challenge.points}</td>
              <td>
                <button onClick={() => handleEditChallenge(challenge)}>Uredi</button>
                <button onClick={() => handleDeleteChallenge(challenge.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginacija */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Prethodna
        </button>
        <span>
          Stranica {currentPage} od {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Sledeća
        </button>
      </div>
    </div>
  );
};

export default ChallengeTable;
