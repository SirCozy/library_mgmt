import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await axios.post(`${baseUrl}/api/register/`, formData);
      setSuccessMsg('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border rounded p-2"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded p-2"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded"
        >
          Register
        </button>
        <p className="text-sm text-center mt-2">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
