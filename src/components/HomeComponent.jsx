import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import PaymentComponent from './components/PaymentComponent';
import PaymentVerificationComponent from './components/PaymentVerificationComponent';

function HomeComponent() {
  return (
    <div>
      <h1>Welcome to the Payment Portal</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
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
