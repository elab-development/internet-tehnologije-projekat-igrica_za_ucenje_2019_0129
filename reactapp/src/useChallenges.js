import { useState, useEffect } from 'react';
import axios from 'axios';

const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      const token = sessionStorage.getItem('auth_token');

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/challenges', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChallenges(response.data.data); // Postavi preuzete izazove u state
        setLoading(false);
      } catch (err) {
        setError('Nije moguće učitati izazove.');
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return { challenges,setChallenges, loading, error };
};

export default useChallenges;
