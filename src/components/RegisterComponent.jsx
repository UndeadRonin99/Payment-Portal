import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCsrf } from '../CsrfContext'; // Import the useCsrf hook

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
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
      await axios.post(
        'https://localhost:443/api/auth/register',
        { ...formData, role: 'customer' }, // Explicitly set role as 'customer'
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true, // Include cookies
        }
      );

      alert('Registration successful');
      navigate('/login'); // Navigate to the login page after successful registration
    } catch (error) {
      console.error('Error during Registration', error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="idNumber"
        placeholder="ID Number"
        value={formData.idNumber}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Register</button>
      <button type="button" onClick={() => navigate('/login')}>Login</button>
    </form>
  );
};

export default RegisterComponent;
