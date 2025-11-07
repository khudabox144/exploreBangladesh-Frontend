// hooks/useTours.js
import { useState, useEffect } from 'react';
import { toursAPI } from '../utils/api';

export const useTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await toursAPI.getAll();
        setTours(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch tours');
        console.error('Error fetching tours:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return { tours, loading, error, refetch: () => useEffect(() => {}, []) };
};