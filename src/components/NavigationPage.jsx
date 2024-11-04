import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Navigation Page</h2>
      <button onClick={() => navigate('/payments')}>Go to Payments Page</button>
      <button onClick={() => navigate('/verify-payments')}>Go to Verify Payments Page</button>
      <button onClick={() => navigate('/login')}>Logout</button>
    </div>
  );
};

export default NavigationPage;
