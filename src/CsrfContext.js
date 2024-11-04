import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the CSRF Context
const CsrfContext = createContext();

// Hook to use CSRF token anywhere
export const useCsrf = () => {
  return useContext(CsrfContext);
};

// Provider Component to hold CSRF token
export const CsrfProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');

  // Fetch CSRF token when the app starts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('https://localhost:443/api/csrf-token', { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={csrfToken}>
      {children}
    </CsrfContext.Provider>
  );
};
