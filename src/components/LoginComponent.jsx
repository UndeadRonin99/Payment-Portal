import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCsrf } from '../CsrfContext'; // Import the useCsrf hook

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    password: ''
  });
  const csrfToken = useCsrf(); // Get CSRF token from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include CSRF token in the header
      const response = await axios.post(
        'https://localhost:443/api/auth/login',
        formData,
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true, // Include cookies
        }
      );

      const { token } = response.data;
      localStorage.setItem('token', token); // Store JWT in local storage
      alert('Login successful');
      navigate('/navigation'); // Navigate to the main page after login
    } catch (error) {
      console.error('Error during login', error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="accountNumber"
        placeholder="Account Number"
        value={formData.accountNumber}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginComponent;
