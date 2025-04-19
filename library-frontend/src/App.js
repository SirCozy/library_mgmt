import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';

function App() {
  const accessToken = localStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={accessToken ? <Books /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={accessToken ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={accessToken ? '/dashboard' : '/login'} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
