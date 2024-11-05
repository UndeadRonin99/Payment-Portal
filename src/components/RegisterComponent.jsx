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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register as a Customer</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idNumber" className="form-label">ID Number</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            className="form-control"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="accountNumber" className="form-label">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            className="form-control"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
        <button type="button" className="btn btn-link w-100 mt-2" onClick={() => navigate('/login')}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
