// components/TouristSpotCard.js
"use client";

import React from "react";
import Link from "next/link";

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
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-48 object-cover"
        />
        {/* Price Badge */}
        {spot.price && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
            {formatPrice(spot.price)}
          </div>
        )}
        {/* Duration Badge */}
        {spot.duration && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {spot.duration} days
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{spot.name}</h3>
        <p className="text-gray-500 mb-4 flex-1 line-clamp-2">{spot.description}</p>

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
          <Link 
            href={`/tours/${spot.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TouristSpotCard;