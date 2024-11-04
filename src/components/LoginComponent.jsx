import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = ({ role }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', { ...formData, role });
      alert('Login successful');
    } catch (error) {
      console.error('Error logging in', error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginComponent;