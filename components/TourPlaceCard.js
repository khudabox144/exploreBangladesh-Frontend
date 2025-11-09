// components/TourPlaceCard.jsx
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

const TourPlaceCard = ({ place }) => {
  // Format price with currency
  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <div className="relative">
        <img
          src={place.image || '/placeholder-image.jpg'}
          alt={place.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow-lg">
          {formatPrice(place.price, place.currency)}
        </div>
        
        {/* Difficulty Badge */}
        {place.difficulty && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(place.difficulty)}`}>
            {place.difficulty}
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          {place.duration || 1} day{place.duration > 1 ? 's' : ''}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {place.name}
        </h3>
        
        {/* Location */}
        {place.location && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{place.location}</span>
          </div>
        )}
        
        <p className="text-gray-500 mb-4 flex-1 line-clamp-3 leading-relaxed">
          {place.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex -space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} filled={i < Math.round(place.rating || 4)} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{(place.rating || 4).toFixed(1)}</span>
          </div>

          {/* Button - Links to TOUR PLACE details page */}
          <Link 
            href={`/tourPlace/${place.id}`}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourPlaceCard;