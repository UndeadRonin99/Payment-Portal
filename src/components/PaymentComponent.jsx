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
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={paymentData.amount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="currency"
        placeholder="Currency"
        value={paymentData.currency}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="provider"
        placeholder="Provider"
        value={paymentData.provider}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="accountInfo"
        placeholder="Account Info"
        value={paymentData.accountInfo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="swiftCode"
        placeholder="SWIFT Code"
        value={paymentData.swiftCode}
        onChange={handleChange}
        required
      />
      <button type="submit">Make Payment</button>
    </form>
  );
};

export default PaymentComponent;
