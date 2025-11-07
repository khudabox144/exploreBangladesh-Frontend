// components/TourList.js
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import TouristSpotCard from "./TouristSpotCard";
import { useTours } from "@/hooks/useTours";
import LoadingSpinner from "./common/LoadingSpinner";

const TouristSpotList = () => {
  const { tours, loading, error } = useTours();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const spotsToShow = 4;
  const containerRef = useRef(null);

  // Transform real tour data to match component expectations
  const touristInfo = useMemo(() => {
    return tours.map(tour => ({
      id: tour.id,
      name: tour.title,
      description: tour.description || 'Explore this amazing destination',
      rating: 4.5, // Default rating since your schema doesn't have rating
      image: getRandomImage(),
      price: tour.basePrice,
      duration: tour.durationDays,
      difficulty: tour.difficulty,
      location: tour.location?.name,
      currency: tour.currency
    }));
  }, [tours]);

  // Filtered spots by search + rating
  const filtered = useMemo(() => {
    return touristInfo.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) || 
                          s.description.toLowerCase().includes(query.toLowerCase());
      const matchesRating = s.rating >= minRating;
      return matchesQuery && matchesRating;
    });
  }, [touristInfo, query, minRating]);

  useEffect(() => {
    if (currentIndex >= filtered.length) setCurrentIndex(0);
  }, [filtered, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(filtered.length, 1));
    containerRef.current?.focus();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    containerRef.current?.focus();
  };

  const getVisibleSpots = () => {
    if (filtered.length <= spotsToShow) return filtered;
    let visibleSpots = [];
    for (let i = 0; i < spotsToShow; i++) {
      visibleSpots.push(filtered[(currentIndex + i) % filtered.length]);
    }
    return visibleSpots;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  // Static images function
  function getRandomImage() {
    const images = [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=300&fit=crop',
    ];
    return images[Math.floor(Math.random() * images.length)];
  }

  if (loading) {
    return (
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Success/Error Message */}
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center">
              <span className="text-yellow-600 mr-2">⚠️</span>
              <div>
                <p className="text-yellow-800 font-medium">Backend Connection Issue</p>
                <p className="text-yellow-700 text-sm">{error}</p>
                <p className="text-yellow-600 text-xs mt-1">
                  Showing {tours.length} tour(s) {tours.length > 0 && tours[0].id > 2 ? 'from backend' : 'from mock data'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">Trending Adventures</h2>
            <p className="text-sm text-gray-500 mt-1">
              {tours.length > 0 && tours[0].id > 2 ? 'Real tours from your backend' : 'Demo tours'}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <input
              aria-label="Search tours"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or description"
              className="px-3 py-2 border rounded-md text-sm w-56"
            />

            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="px-3 py-2 border rounded-md text-sm">
              <option value={0}>All ratings</option>
              <option value={4}>4+ stars</option>
              <option value={4.5}>4.5+ stars</option>
            </select>

            {filtered.length > spotsToShow && (
              <div className="hidden sm:flex items-center space-x-2">
                <button onClick={handlePrev} className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition">
                  ‹
                </button>
                <button onClick={handleNext} className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition">
                  ›
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {getVisibleSpots().length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No tours match your search.
            </div>
          ) : (
            getVisibleSpots().map((spot, index) => (
              <TouristSpotCard key={spot.id} spot={spot} />
            ))
          )}
        </div>

        {/* Mobile nav */}
        {filtered.length > spotsToShow && (
          <div className="flex items-center justify-center mt-6 sm:hidden space-x-4">
            <button onClick={handlePrev} className="px-3 py-2 border rounded">Prev</button>
            <div className="text-sm text-gray-600">
              {currentIndex + 1}-{Math.min(currentIndex + spotsToShow, filtered.length)} of {filtered.length}
            </div>
            <button onClick={handleNext} className="px-3 py-2 border rounded">Next</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TouristSpotList;