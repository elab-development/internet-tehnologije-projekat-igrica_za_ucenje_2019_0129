import { useState, useEffect } from 'react';
import axios from 'axios';

const useLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      const token = sessionStorage.getItem('auth_token');  

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/lessons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLessons(response.data.data);  
        setLoading(false);
      } catch (err) {
        setError('Failed to load lessons');
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return { lessons, loading, error };
};

export default useLessons;
