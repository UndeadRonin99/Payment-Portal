import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentVerificationComponent = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/verify-payment');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments', error);
      }
    };
    fetchPayments();
  }, []);

  const handleVerify = async (paymentId) => {
    try {
      await axios.post(`/api/verify-payment/${paymentId}`);
      alert('Payment verified successfully');
    } catch (error) {
      console.error('Error verifying payment', error);
      alert('Verification failed');
    }
  };

  return (
    <div>
      <h2>Pending Payments</h2>
      {payments.length === 0 ? (
        <p>No pending payments</p>
      ) : (
        payments.map((payment) => (
          <div key={payment.id}>
            <p>Amount: {payment.amount}</p>
            <p>Currency: {payment.currency}</p>
            <p>Provider: {payment.provider}</p>
            <button onClick={() => handleVerify(payment.id)}>Verify Payment</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentVerificationComponent;
