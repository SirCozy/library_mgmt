import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Books from './pages/Books';
import Dashboard from './pages/Dashboard';

const App = () => {
  const accessToken = localStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/books"
          element={accessToken ? <Books /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={accessToken ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={accessToken ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
