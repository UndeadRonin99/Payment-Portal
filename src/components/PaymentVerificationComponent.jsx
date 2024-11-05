import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCsrf } from '../CsrfContext'; // Import the useCsrf hook

const VerifyPaymentsComponent = () => {
  const [payments, setPayments] = useState([]);
  const csrfToken = useCsrf(); // Get CSRF token from context

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:443/api/payments/unverified', {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-CSRF-Token': csrfToken // Include CSRF token in the header
          },
          withCredentials: true, // Include cookies
        });
        console.log('Payments fetched:', response.data); // Debug log to confirm data shape
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments', error);
      }
    };

    fetchPayments();
  }, [csrfToken]); // Add csrfToken as a dependency to ensure it's updated

  const handleVerify = async (paymentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://localhost:443/api/payments/${paymentId}/verify`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-CSRF-Token': csrfToken // Include CSRF token in the header
        },
        withCredentials: true, // Include cookies
      });
      alert('Payment verified successfully');

      // Update state to reflect the verified payment has been removed
      setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== paymentId));
    } catch (error) {
      console.error('Error verifying payment', error);
      alert('Verification failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Pending Payments</h2>
      {payments.length === 0 ? (
        <p className="text-center">No pending payments</p>
      ) : (
        <div className="list-group w-50 mx-auto">
          {payments.map((payment) => (
            <div key={payment._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1">Amount: {payment.amount}</p>
                <p className="mb-1">Currency: {payment.currency}</p>
                <p className="mb-1">Provider: {payment.provider}</p>
              </div>
              <button className="btn btn-success" onClick={() => handleVerify(payment._id)}>Verify Payment</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifyPaymentsComponent;
