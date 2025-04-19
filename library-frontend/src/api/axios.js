// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Adjust if needed
});

// Attach token if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('access');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
