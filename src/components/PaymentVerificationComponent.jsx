import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentVerificationComponent = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:5000/api/payments/unverified', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments', error);
      }
    };
    fetchPayments();
  }, []);

  const handleVerify = async (paymentId) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      await axios.post(`http://localhost:5000/api/payments/${paymentId}/verify`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Payment verified successfully');
      setPayments(payments.filter((payment) => payment._id !== paymentId)); // Remove verified payment from list
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
          <div key={payment._id}>
            <p>Amount: {payment.amount}</p>
            <p>Currency: {payment.currency}</p>
            <p>Provider: {payment.provider}</p>
            <button onClick={() => handleVerify(payment._id)}>Verify Payment</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentVerificationComponent;
