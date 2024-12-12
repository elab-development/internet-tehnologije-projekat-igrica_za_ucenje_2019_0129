import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './AdminDashboard.css';

// Registracija komponenti iz Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const savedToken = sessionStorage.getItem('auth_token'); 

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/statistics', {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });
        setStatistics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Greška prilikom učitavanja statistika.');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [savedToken]);

  if (loading) return <p>Učitavanje statistika...</p>;
  if (error) return <p>{error}</p>;

  const challengeLabels = statistics.challenges.map((challenge) => `Izazov ${challenge.challenge_id}`);
  const successData = statistics.challenges.map((challenge) => challenge.success_count);
  const failData = statistics.challenges.map((challenge) => challenge.fail_count);

  const data = {
    labels: challengeLabels,
    datasets: [
      {
        label: 'Uspešni pokušaji',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        data: successData,
      },
      {
        label: 'Neuspešni pokušaji',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        data: failData,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="statistic-cards">
        <div className="stat-card">
          <h2>Broj lekcija</h2>
          <p>{statistics.lesson_count}</p>
        </div>
        <div className="stat-card">
          <h2>Broj učenika</h2>
          <p>{statistics.student_count}</p>
        </div>
        <div className="stat-card">
          <h2>Broj izazova</h2>
          <p>{statistics.challenge_count}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Izazovi: Uspešni vs Neuspešni pokušaji</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AdminDashboard;
