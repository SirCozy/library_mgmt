import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Books from './pages/Books';

function App() {
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
          path="/"
          element={<Navigate to={accessToken ? "/books" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
