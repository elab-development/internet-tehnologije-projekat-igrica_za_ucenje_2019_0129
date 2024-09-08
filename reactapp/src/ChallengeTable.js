import React, { useState } from 'react';
import useChallenges from './useChallenges'; // Korisnička definisana kuka
import './ChallengeTable.css'; // Uvozimo CSS

const ChallengeTable = () => {
  const { challenges, loading, error } = useChallenges();
  
  const [searchTerm, setSearchTerm] = useState(''); // Filter za pretragu
  const [currentPage, setCurrentPage] = useState(1); // Trenutna stranica
  const [itemsPerPage] = useState(5); // Broj izazova po stranici

  // Filtriranje izazova na osnovu pojma za pretragu
  const filteredChallenges = challenges.filter((challenge) => 
    challenge.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    challenge.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Izračunavanje izazova za prikaz na trenutnoj stranici
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

  if (loading) return <p>Učitavanje izazova...</p>;
  if (error) return <p>{error}</p>;

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

      {/* Tabela sa izazovima */}
      <table className="challenge-table">
        <thead>
          <tr>
            <th>Pitanje</th>
            <th>Težina</th>
            <th>Tip</th>
            <th>Poeni</th>
          </tr>
        </thead>
        <tbody>
          {currentChallenges.map((challenge) => (
            <tr key={challenge.id}>
              <td>{challenge.question}</td>
              <td>{challenge.difficulty}</td>
              <td>{challenge.type}</td>
              <td>{challenge.points}</td>
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
