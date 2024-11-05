import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCsrf } from '../CsrfContext'; // Import the useCsrf hook

const LoginComponent = () => {
  const [formData, setFormData] = useState({
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="idNumber" className="form-label">ID Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="idNumber"
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
                    className="form-control"
                    name="accountNumber"
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
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <button type="button" onClick={() => navigate('/register')} className="btn btn-link w-100 mt-2">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
