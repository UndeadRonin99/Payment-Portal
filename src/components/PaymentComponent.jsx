import React, { useState } from 'react';
import axios from 'axios';
import { useCsrf } from '../CsrfContext'; // Import the useCsrf hook

const PaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    currency: '',
    provider: '',
    accountInfo: '',
    swiftCode: ''
  });
  const csrfToken = useCsrf(); // Get CSRF token from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'https://localhost:443/api/payments/make-payment',
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-CSRF-Token': csrfToken // Include CSRF token in the header
          },
          withCredentials: true, // Include cookies
        }
      );

      alert('Payment successful');
    } catch (error) {
      console.error('Error making payment', error);
      alert('Payment failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Make a Payment</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-control"
            placeholder="Amount"
            value={paymentData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currency" className="form-label">Currency</label>
          <input
            type="text"
            id="currency"
            name="currency"
            className="form-control"
            placeholder="Currency"
            value={paymentData.currency}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="provider" className="form-label">Provider</label>
          <input
            type="text"
            id="provider"
            name="provider"
            className="form-control"
            placeholder="Provider"
            value={paymentData.provider}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="accountInfo" className="form-label">Account Info</label>
          <input
            type="text"
            id="accountInfo"
            name="accountInfo"
            className="form-control"
            placeholder="Account Info"
            value={paymentData.accountInfo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="swiftCode" className="form-label">SWIFT Code</label>
          <input
            type="text"
            id="swiftCode"
            name="swiftCode"
            className="form-control"
            placeholder="SWIFT Code"
            value={paymentData.swiftCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Make Payment</button>
      </form>
    </div>
  );
};

export default PaymentComponent;
