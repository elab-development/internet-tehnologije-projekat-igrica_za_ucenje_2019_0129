import React from 'react';

const LessonRow = ({ lesson }) => {
  return (
    <tr>
      <td>{lesson.title}</td>
      <td>{lesson.difficulty}</td>
      <td>{lesson.description}</td>
      <td>{lesson.estimated_time || 'N/A'}</td>
    </tr>
  );
};

export default LessonRow;
