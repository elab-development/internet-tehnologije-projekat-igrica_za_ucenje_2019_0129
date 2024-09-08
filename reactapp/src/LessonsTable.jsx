import React, { useState } from 'react';
import axios from 'axios';
import useLessons from './useLessons'; 
import LessonRow from './LessonRow'; // Uvozimo reusable komponentu za red tabele
import './LessonsTable.css'; 

const LessonsTable = () => {
  const { lessons, loading, error, setLessons } = useLessons(); // Dodajemo setLessons kako bismo osvežili lekcije
  const [searchTerm, setSearchTerm] = useState(''); // Filter za pretragu
  const [currentPage, setCurrentPage] = useState(1); // Trenutna stranica
  const [itemsPerPage] = useState(5); // Broj lekcija po stranici
  const [showModal, setShowModal] = useState(false); // Kontrola za modal

  // State za kreiranje nove lekcije
  const [newLesson, setNewLesson] = useState({
    title: '',
    content: '',
    difficulty: '',
    description: '',
    video_url: '',
    image_url: '',
    estimated_time: ''
  });
  
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

  // Funkcija za slanje POST zahteva i kreiranje nove lekcije
  const handleCreateLesson = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      alert('Niste prijavljeni!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/lessons', newLesson, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dodavanje nove lekcije u listu bez potrebe za osvežavanjem cele stranice
      setLessons([...lessons, response.data.data]);
      setNewLesson({
        title: '',
        content: '',
        difficulty: '',
        description: '',
        video_url: '',
        image_url: '',
        estimated_time: ''
      });
      setShowModal(false); // Zatvori modal nakon kreiranja lekcije
    } catch (error) {
      console.error('Greška prilikom kreiranja lekcije:', error);
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

      {/* Dugme za otvaranje modala */}
      <button onClick={() => setShowModal(true)} className="create-lesson-button">Kreiraj Lekciju</button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Kreiraj novu lekciju</h3>
            <form onSubmit={handleCreateLesson} className="create-lesson-form">
              <input 
                type="text" 
                placeholder="Naslov" 
                value={newLesson.title} 
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} 
                required 
              />
              <textarea 
                placeholder="Sadržaj" 
                value={newLesson.content} 
                onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Težina" 
                value={newLesson.difficulty} 
                onChange={(e) => setNewLesson({ ...newLesson, difficulty: e.target.value })} 
                required 
              />
              <textarea 
                placeholder="Opis" 
                value={newLesson.description} 
                onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })} 
                required 
              />
              <input 
                type="url" 
                placeholder="Video URL (opciono)" 
                value={newLesson.video_url} 
                onChange={(e) => setNewLesson({ ...newLesson, video_url: e.target.value })} 
              />
              <input 
                type="url" 
                placeholder="Slika URL (opciono)" 
                value={newLesson.image_url} 
                onChange={(e) => setNewLesson({ ...newLesson, image_url: e.target.value })} 
              />
              <input 
                type="number" 
                placeholder="Procenjeno vreme (min)" 
                value={newLesson.estimated_time} 
                onChange={(e) => setNewLesson({ ...newLesson, estimated_time: e.target.value })} 
              />
              <button type="submit">Kreiraj Lekciju</button>
              <button type="button" onClick={() => setShowModal(false)}>Zatvori</button>
            </form>
          </div>
        </div>
      )}

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
            <LessonRow key={lesson.id} lesson={lesson} />  // Koristimo reusable komponentu za red tabele
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
