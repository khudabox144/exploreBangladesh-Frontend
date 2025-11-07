// hooks/useDivisions.js
import { useState, useEffect } from 'react';
import { divisionsAPI } from '../utils/api';

export const useDivisions = () => {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await divisionsAPI.getAll();
        setDivisions(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch divisions');
        console.error('Error fetching divisions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDivisions();
  }, []);

  return { divisions, loading, error };
};