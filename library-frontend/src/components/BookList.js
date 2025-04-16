import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios.get('http://127.0.0.1:8000/api/books/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setBooks(response.data))
    .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Library Books</h2>
      <ul className="space-y-2">
        {books.map(book => (
          <li key={book.id} className="border rounded p-2">
            <strong>{book.title}</strong> — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
