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
        
        console.log('Fetching tours from API...');
        const response = await toursAPI.getAll();
        console.log('Tours data received:', response.data);
        
        setTours(response.data);
        
      } catch (err) {
        console.error('Error in useTours:', err);
        const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch tours';
        setError(errorMessage);
        
        // Fallback to mock data if backend is not available
        if (err.message?.includes('Backend server is not running')) {
          console.log('Using mock data as fallback');
          setTours(getMockTours());
          setError(null); // Clear error since we're using mock data
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return { tours, loading, error };
};

// Mock data as fallback
const getMockTours = () => [
  {
    id: 1,
    title: "Sundarbans Adventure",
    description: "Explore the largest mangrove forest in the world and witness the Royal Bengal Tiger",
    durationDays: 3,
    difficulty: "Medium",
    capacity: 15,
    basePrice: 299,
    currency: "USD",
    location: { name: "Khulna" }
  },
  {
    id: 2,
    title: "Cox's Bazar Beach Tour",
    description: "Relax on the world's longest natural sea beach with stunning sunset views",
    durationDays: 2,
    difficulty: "Easy",
    capacity: 20,
    basePrice: 199,
    currency: "USD",
    location: { name: "Cox's Bazar" }
  }
];