// pages/Books.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
    const accessToken = localStorage.getItem('access_token');

    axios.get(`${baseUrl}/api/books/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(res => {
      setBooks(res.data);
      setError('');
    })
    .catch(err => {
      console.error('API call failed:', err);
      setError('Failed to load books.');
    });
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Library Books</h1>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      {books.length > 0 ? (
        <ul className="space-y-2">
          {books.map(book => (
            <li key={book.id} className="border p-4 rounded shadow-sm">
              <strong>{book.title}</strong>
              <div className="text-sm text-gray-600">by {book.author}</div>
            </li>
          ))}
        </ul>
      ) : !error ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : null}
    </div>
  );
}

export default Books;
