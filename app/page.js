// app/page.js
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TouristSpotList from "@/components/TouristSpotList";
import BangladeshTour from "@/components/BangladeshTour";
import Recommendation from "@/components/Recommendation";
import Hero from "@/components/Hero";
import UserRegistration from "@/components/UserRegistration";
import Link from 'next/link';

// Districts Section Component
const DistrictsSection = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDistricts() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/districts');
        if (!res.ok) throw new Error('Failed to fetch districts');
        const data = await res.json();
        setDistricts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDistricts();
  }, []);

  const formatDistrictUrl = (name) => {
    return name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
  };

  const getDivisionName = (district) => {
    return district.division?.name || 'Unknown Division';
  };

  const getTourPlacesCount = (district) => {
    return district.tourPlaces?.length || 0;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-lg text-gray-600 mb-2">Popular Districts</h2>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore by District</h1>
            <p className="text-gray-600 text-lg">
              Discover amazing tourist spots across different districts of Bangladesh
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-yellow-800">Error loading districts: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-lg text-gray-600 mb-2">Popular Districts</h2>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore by District</h1>
          <p className="text-gray-600 text-lg">
            Discover amazing tourist spots across {districts.length} districts of Bangladesh
          </p>
        </div>
        
        {/* Horizontal Scrollable Container */}
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {districts.map((district) => (
              <Link 
                key={district.id}
                href={`/division/${formatDistrictUrl(getDivisionName(district))}/${formatDistrictUrl(district.name)}`}
                className="flex-shrink-0 w-64"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {district.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {getDivisionName(district)}
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm text-blue-600 font-medium">
                      {getTourPlacesCount(district)} tourist places
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Gradient fade effect on the right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Scroll to explore more districts
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </p>
        </div>
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

// Featured Tours Section Component
const FeaturedToursSection = () => {
  const featuredTours = [
    {
      id: 1,
      title: "Historical Dhaka City Exploration",
      price: "$120.00",
      duration: "1 day",
      description: "Explore the rich history of Dhaka through its ancient monuments, museums, and cultural heritage...",
      rating: 4.5,
      image: "/images/dhaka-tour.jpg"
    },
    {
      id: 2,
      title: "Sylhet Tea Garden Experience",
      price: "$95.00",
      duration: "2 days",
      description: "Immerse yourself in the beautiful tea gardens and natural wonders of Sylhet region...",
      rating: 4.8,
      image: "/images/sylhet-tour.jpg"
    },
    {
      id: 3,
      title: "Cox's Bazar Beach Paradise",
      price: "$150.00",
      duration: "3 days",
      description: "Enjoy the world's longest natural sea beach with stunning sunsets and water activities...",
      rating: 4.7,
      image: "/images/coxs-bazar-tour.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Featured Tours
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map(tour => (
            <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-sm">
                  ⭐ {tour.rating}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">{tour.price}</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {tour.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {tour.title}
                </h3>
                
                <p className="text-gray-600 line-clamp-3 mb-6">
                  {tour.description}
                </p>
                
                <Link href={`/tours/${tour.id}`}>
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <>
      <header className="p-4 flex justify-end max-w-7xl mx-auto">
        {/* <Header /> */}
      </header>
      <main>
        <section id="hero">
          <Hero />
        </section>

        {/* Dynamic Districts Section */}
        <section id="districts">
          <DistrictsSection />
        </section>
        
        <section id="spots">
          <TouristSpotList />
        </section>
        
        <section id="bangladesh-tour">
          <BangladeshTour />
        </section>

        {/* <section id="registration" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Join Our Community</h2>
            <UserRegistration />
          </div>
        </section> */}
        
        <section id="recommendation">
          <Recommendation />
        </section>
      </main>
    </>
  );
}