"use client";

import React from "react";

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.84-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
  </svg>
);

const TouristSpotCard = ({ spot }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative">
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{spot.name}</h3>
        <p className="text-gray-500 mb-4 flex-1">{spot.description}</p>

        <div className="flex items-center justify-between mt-auto">
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex -space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} filled={i < Math.round(spot.rating)} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{spot.rating}</span>
          </div>

          {/* Button */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristSpotCard;
