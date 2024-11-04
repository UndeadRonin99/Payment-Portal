import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    currency: '',
    provider: '',
    accountInfo: '',
    swiftCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/make-payment', paymentData);
      alert('Payment successful');
    } catch (error) {
      console.error('Error making payment', error);
      alert('Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="amount" placeholder="Amount" value={paymentData.amount} onChange={handleChange} required />
      <input type="text" name="currency" placeholder="Currency" value={paymentData.currency} onChange={handleChange} required />
      <input type="text" name="provider" placeholder="Provider" value={paymentData.provider} onChange={handleChange} required />
      <input type="text" name="accountInfo" placeholder="Account Information" value={paymentData.accountInfo} onChange={handleChange} required />
      <input type="text" name="swiftCode" placeholder="SWIFT Code" value={paymentData.swiftCode} onChange={handleChange} required />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentComponent;