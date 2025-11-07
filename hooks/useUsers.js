// hooks/useUsers.js
import { useState } from 'react';
import { usersAPI } from '../utils/api';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await usersAPI.create(userData);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create user';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};