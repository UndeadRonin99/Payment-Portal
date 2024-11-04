import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import PaymentComponent from './components/PaymentComponent';
import PaymentVerificationComponent from './components/PaymentVerificationComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/make-payment" element={<PaymentComponent />} />
        <Route path="/verify-payment" element={<PaymentVerificationComponent />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
