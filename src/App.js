import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import PaymentComponent from './components/PaymentComponent';
import PaymentVerificationComponent from './components/PaymentVerificationComponent';
import NavigationPage from './components/NavigationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/navigation" element={<NavigationPage />} />
        <Route path="/payments" element={<PaymentComponent />} />
        <Route path="/verify-payments" element={<PaymentVerificationComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
