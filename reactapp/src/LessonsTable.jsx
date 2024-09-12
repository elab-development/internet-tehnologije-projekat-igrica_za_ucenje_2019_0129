import React, { useState } from 'react';
import axios from 'axios';
import useLessons from './useLessons'; 
import LessonRow from './LessonRow'; 
import './LessonsTable.css'; 

const LessonsTable = () => {
  const { lessons, loading, error, setLessons } = useLessons();
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(5); 
  const [showModal, setShowModal] = useState(false); 
  const [editingLesson, setEditingLesson] = useState(null); // State za editovanje
  const [newLesson, setNewLesson] = useState({
    title: '',
    content: '',
    difficulty: '',
    description: '',
    video_url: '',
    image_url: '',
    estimated_time: ''
  });

  // Filtriranje lekcija
  const filteredLessons = lessons.filter((lesson) => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginacija
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

  // Kreiranje ili ažuriranje lekcije
  const handleSaveLesson = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      alert('Niste prijavljeni!');
      return;
    }

    try {
      if (editingLesson) {
        // Ažuriraj lekciju
        const response = await axios.put(
          `http://127.0.0.1:8000/api/lessons/${editingLesson.id}`, 
          newLesson,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLessons(lessons.map((lesson) => lesson.id === editingLesson.id ? response.data.data : lesson));
      } else {
        // Kreiraj novu lekciju
        const response = await axios.post('http://127.0.0.1:8000/api/lessons', newLesson, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLessons([...lessons, response.data.data]);
      }
      setShowModal(false);
      setNewLesson({
        title: '',
        content: '',
        difficulty: '',
        description: '',
        video_url: '',
        image_url: '',
        estimated_time: ''
      });
      setEditingLesson(null);
    } catch (error) {
      console.error('Greška prilikom kreiranja/ažuriranja lekcije:', error);
    }
  };

  // Prikaz modala za editovanje
  const handleEditLesson = (lesson) => {
    setNewLesson(lesson);
    setEditingLesson(lesson);
    setShowModal(true);
  };

  // Brisanje lekcije
  const handleDeleteLesson = async (id) => {
    const token = sessionStorage.getItem('auth_token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/lessons/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    } catch (error) {
      console.error('Greška prilikom brisanja lekcije:', error);
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
          setCurrentPage(1);
        }}
        className="search-input"
      />

      {/* Dugme za otvaranje modala */}
      <button onClick={() => setShowModal(true)} className="create-lesson-button">
        {editingLesson ? "Ažuriraj Lekciju" : "Kreiraj Lekciju"}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingLesson ? "Ažuriraj Lekciju" : "Kreiraj novu lekciju"}</h3>
            <form onSubmit={handleSaveLesson} className="create-lesson-form">
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
              <button type="submit">{editingLesson ? "Ažuriraj" : "Kreiraj"}</button>
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
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {currentLessons.map((lesson) => (
            <LessonRow 
              key={lesson.id} 
              lesson={lesson} 
              onEdit={() => handleEditLesson(lesson)}
              onDelete={() => handleDeleteLesson(lesson.id)} 
            />
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
