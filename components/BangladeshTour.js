// components/BangladeshTour.js
"use client";

import Link from "next/link";
import React from "react";
import { useDivisions } from "../hooks/useDivisions";
import LoadingSpinner from "./common/LoadingSpinner";

const DIVISION_IMAGES = {
  "Dhaka": "https://t3.ftcdn.net/jpg/05/98/42/60/360_F_598426018_dZSafUODg9I0cEBJrj8F4AHzYmrXrHdW.jpg",
  "Chittagong": "https://media-cdn.tripadvisor.com/media/photo-s/0a/74/f0/27/chittagong-port.jpg",
  "Sylhet": "https://grandsylhet.com/wp-content/uploads/2025/01/Best-Tourist-Places-in-Sylhet-1024x538.webp",
  "Khulna": "https://i.natgeofe.com/n/a50f7239-ff6d-4874-9448-25d94d8d1c80/sundarbans-bangladesh.jpg",
  "Barisal": "https://barishaltourismcenters.wordpress.com/wp-content/uploads/2018/11/pi.jpg",
  "Rajshahi": "https://ecdn.dhakatribune.net/contents/cache/images/640x0x1/uploads/media/2023/09/13/Rajshahi-Development-5-f6819dd6ea94084fd01a011dac7ca45d.jpg",
  "Rangpur": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/60/70/51/caption.jpg?w=800&h=800&s=1",
  "Mymensingh": "https://i.pinimg.com/736x/0b/11/88/0b11881451048581d97df71a2b25d64e.jpg"
};

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

const BangladeshTour = () => {
  const { divisions, loading, error } = useDivisions();

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12 bg-white">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="text-gray-600 mt-4">Loading divisions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12 bg-white">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <div className="text-red-600 text-lg font-semibold mb-2">Failed to load divisions</div>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Bangladesh</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the beauty of Bangladesh through its diverse divisions and districts
        </p>
      </div>

      {/* Divisions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {divisions.map((division) => {
          const divisionImage = DIVISION_IMAGES[division.name] || "https://images.unsplash.com/photo-1540959733332-8cbd5d1a45f9?w=400&h=300&fit=crop";
          
          return (
            <div
              key={division.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              {/* Banner with Image + Title */}
              <div
                className="relative h-48 overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url(${divisionImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h2 className="absolute left-6 bottom-6 text-white text-2xl font-bold drop-shadow-lg">
                  {division.name}
                </h2>
                
                {/* District Count Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {division.districts?.length || 0} districts
                </div>
              </div>

              {/* Districts List */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Popular Districts
                </h3>
                
                {division.districts && division.districts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {division.districts.slice(0, 9).map((district) => (
                      <Link
                        key={district.id}
                        href={`/division/${slugify(division.name)}/${slugify(district.name)}`}
                        className="group"
                      >
                        <div className="p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 border border-purple-100 hover:border-purple-300 hover:shadow-md">
                          <span className="text-sm text-purple-800 group-hover:text-purple-600 font-medium transition-colors line-clamp-1">
                            {district.name}
                          </span>
                          
                          {/* Tour Places Count */}
                          {district.tourPlaces && district.tourPlaces.length > 0 && (
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-purple-500 bg-purple-100 px-1.5 py-0.5 rounded-full">
                                {district.tourPlaces.length} places
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                    
                    {/* Show "View More" if there are more than 9 districts */}
                    {division.districts.length > 9 && (
                      <Link
                        href={`/division/${slugify(division.name)}`}
                        className="group"
                      >
                        <div className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-md flex items-center justify-center h-full">
                          <span className="text-sm text-gray-600 group-hover:text-gray-800 font-medium transition-colors">
                            +{division.districts.length - 9} more
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">No districts available</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BangladeshTour;