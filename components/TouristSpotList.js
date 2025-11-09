"use client";

import React, { useState, useMemo } from "react";
import TouristSpotCard from "./TouristSpotCard";

const TouristSpotList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [displayCount, setDisplayCount] = useState(8); // Track how many tours to show

  // Fetch tours on component mount
  React.useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/tours');
        if (!res.ok) throw new Error('Failed to fetch tours');
        const data = await res.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  // Transform tour data for the card component
  const touristInfo = useMemo(() => {
    return tours.map(tour => ({
      id: tour.id,
      name: tour.title,
      description: tour.description || 'Explore this amazing destination',
      rating: 4.5, // Default rating
      image: getRandomImage(),
      price: tour.basePrice,
      duration: tour.durationDays,
      difficulty: tour.difficulty,
      location: tour.location?.name,
      currency: tour.currency
    }));
  }, [tours]);

  // Filtered spots by search + difficulty + price
  const filtered = useMemo(() => {
    return touristInfo.filter((tour) => {
      const matchesQuery = tour.name.toLowerCase().includes(query.toLowerCase()) || 
                          tour.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesDifficulty = difficultyFilter === "all" || 
                               tour.difficulty?.toLowerCase() === difficultyFilter;
      
      const matchesPrice = priceFilter === "all" || 
                          (priceFilter === "budget" && tour.price <= 200) ||
                          (priceFilter === "mid" && tour.price > 200 && tour.price <= 400) ||
                          (priceFilter === "premium" && tour.price > 400);
      
      return matchesQuery && matchesDifficulty && matchesPrice;
    });
  }, [touristInfo, query, difficultyFilter, priceFilter]);

  // Tours to display based on current displayCount
  const toursToDisplay = useMemo(() => {
    return filtered.slice(0, displayCount);
  }, [filtered, displayCount]);

  // Load more function
  const loadMore = () => {
    setDisplayCount(prevCount => prevCount + 8); // Load 8 more tours
  };

  // Reset display count when filters change
  React.useEffect(() => {
    setDisplayCount(8);
  }, [query, difficultyFilter, priceFilter]);

  // Static images function
  function getRandomImage() {
    const images = [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    ];
    return images[Math.floor(Math.random() * images.length)];
  }

  if (loading) {
    return (
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">Featured Tours</h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing {toursToDisplay.length} of {filtered.length} amazing tours
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              aria-label="Search tours"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tours..."
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <select 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)} 
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)} 
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="budget">Budget ($0-200)</option>
              <option value="mid">Mid ($201-400)</option>
              <option value="premium">Premium ($400+)</option>
            </select>
          </div>
        </div>

        {/* Show tours based on displayCount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {toursToDisplay.map((spot) => (
            <TouristSpotCard key={spot.id} spot={spot} />
          ))}
        </div>

        {/* Show "Load More" if there are more tours to display */}
        {filtered.length > displayCount && (
          <div className="text-center mt-8">
            <button 
              onClick={loadMore}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-medium shadow-md"
            >
              Load More Tours ({filtered.length - displayCount} more available)
            </button>
          </div>
        )}

        {/* Show "Show Less" if more than initial count is displayed */}
        {displayCount > 8 && (
          <div className="text-center mt-4">
            <button 
              onClick={() => setDisplayCount(8)}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Show Less
            </button>
          </div>
        )}

        {/* Show message if no tours match filters */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-gray-100">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TouristSpotList;