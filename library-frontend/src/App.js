import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

    axios
      .get(`${baseUrl}/api/books/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setBooks(res.data);
        setError('');
      })
      .catch((err) => {
        console.error('API call failed:', err);
        setError('Failed to load books. Please make sure you are logged in.');
      });
  }, [accessToken]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={accessToken ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={accessToken ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
