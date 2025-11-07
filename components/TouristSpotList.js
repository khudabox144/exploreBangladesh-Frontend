"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import TouristSpotCard from "./TouristSpotCard";
import touristInfo from "./TouristInfo.card";

const TouristSpotList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const spotsToShow = 4;
  const containerRef = useRef(null);

  // Filtered spots by search + rating
  const filtered = useMemo(() => {
    return touristInfo.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase());
      const matchesRating = s.rating >= minRating;
      return matchesQuery && matchesRating;
    });
  }, [query, minRating]);

  useEffect(() => {
    // Ensure index is within filtered bounds
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
    // If fewer items than spotsToShow, just return filtered
    if (filtered.length <= spotsToShow) return filtered;
    let visibleSpots = [];
    for (let i = 0; i < spotsToShow; i++) {
      visibleSpots.push(filtered[(currentIndex + i) % filtered.length]);
    }
    return visibleSpots;
  };

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">Trending Adventures</h2>
            <p className="text-sm text-gray-500 mt-1">Handpicked tours with exclusive deals</p>
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

            <div className="hidden sm:flex items-center space-x-2">
              <button onClick={handlePrev} className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition">
                ‹
              </button>
              <button onClick={handleNext} className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition">
                ›
              </button>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {getVisibleSpots().length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">No tours match your search.</div>
          ) : (
            getVisibleSpots().map((spot, index) => <TouristSpotCard key={spot.name + index} spot={spot} />)
          )}
        </div>

        {/* Mobile nav */}
        <div className="flex items-center justify-center mt-6 sm:hidden space-x-4">
          <button onClick={handlePrev} className="px-3 py-2 border rounded">Prev</button>
          <div className="text-sm text-gray-600">{filtered.length} results</div>
          <button onClick={handleNext} className="px-3 py-2 border rounded">Next</button>
        </div>
      </div>
    </section>
  );
};

export default TouristSpotList;
