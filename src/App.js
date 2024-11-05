import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import PaymentComponent from './components/PaymentComponent';
import PaymentVerificationComponent from './components/PaymentVerificationComponent';
import NavigationPage from './components/NavigationPage';
import RegisterComponent from './components/RegisterComponent';

// Utility function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Wrapper component to protect routes
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent/>} />

        {/* Protected routes */}
        <Route path="/navigation" element={<ProtectedRoute element={<NavigationPage />} />} />
        <Route path="/payments" element={<ProtectedRoute element={<PaymentComponent />} />} />
        <Route path="/verify-payments" element={<ProtectedRoute element={<PaymentVerificationComponent />} />} />
      </Routes>
    </Router>
  );
}

export default App;
