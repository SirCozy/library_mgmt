import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const accessToken = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  useEffect(() => {
    if (!accessToken) {
      setErrorMsg('You must log in first.');
      setLoading(false);
      return;
    }

    axios
      .get('http://127.0.0.1:8000/api/books/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setErrorMsg('Failed to fetch books.');
        setLoading(false);
      });
  }, [accessToken]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Books List</h2>

      {loading && <p>Loading books...</p>}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      {books.length > 0 ? (
        <ul className="space-y-2">
          {books.map((book) => (
            <li key={book.id} className="border p-3 rounded shadow hover:bg-gray-100">
              <p className="font-bold">{book.title}</p>
              <p className="text-sm text-gray-600">Author: {book.author}</p>
            </li>
          ))}
        </ul>
      ) : !loading && !errorMsg ? (
        <p>No books found.</p>
      ) : null}
    </div>
  );
};

export default Dashboard;
