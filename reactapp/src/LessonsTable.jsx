import React, { useState } from 'react';
import useLessons from './useLessons'; 
import './LessonsTable.css'; 

const LessonsTable = () => {
  const { lessons, loading, error } = useLessons();
  
  const [searchTerm, setSearchTerm] = useState(''); // Filter za pretragu
  const [currentPage, setCurrentPage] = useState(1); // Trenutna stranica
  const [itemsPerPage] = useState(5); // Broj lekcija po stranici

  // Filtriranje lekcija na osnovu pojma za pretragu
  const filteredLessons = lessons.filter((lesson) => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Izračunavanje lekcija za prikaz na trenutnoj stranici
  const indexOfLastLesson = currentPage * itemsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - itemsPerPage;
  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);

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

  if (loading) return <p>Učitavanje lekcija...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lessons-table-container">
      <h2>Lista Lekcija</h2>

      {/* Filter za pretragu */}
      <input 
        type="text" 
        placeholder="Pretraži lekcije..." 
        value={searchTerm} 
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Resetovanje na prvu stranicu prilikom pretrage
        }}
        className="search-input"
      />

      {/* Tabela sa lekcijama */}
      <table className="lessons-table">
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Težina</th>
            <th>Opis</th>
            <th>Procenjeno vreme (min)</th>
          </tr>
        </thead>
        <tbody>
          {currentLessons.map((lesson) => (
            <tr key={lesson.id}>
              <td>{lesson.title}</td>
              <td>{lesson.difficulty}</td>
              <td>{lesson.description}</td>
              <td>{lesson.estimated_time || 'N/A'}</td>
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

export default LessonsTable;
