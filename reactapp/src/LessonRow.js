import React from 'react';

const LessonRow = ({ lesson, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{lesson.title}</td>
      <td>{lesson.difficulty}</td>
      <td>{lesson.description}</td>
      <td>{lesson.estimated_time || 'N/A'}</td>
      <td>
 
        <button onClick={onEdit} className="edit-button">Uredi</button>
 
        <button onClick={onDelete} className="delete-button">Obriši</button>
      </td>
    </tr>
  );
};

export default LessonRow;
