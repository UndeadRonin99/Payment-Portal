import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Navigation Page</h2>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <button className="btn btn-primary w-50 mb-3" onClick={() => navigate('/payments')}>
          Go to Payments Page
        </button>
        <button className="btn btn-success w-50 mb-3" onClick={() => navigate('/verify-payments')}>
          Go to Verify Payments Page
        </button>
        <button className="btn btn-danger w-50" onClick={() => navigate('/login')}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavigationPage;
