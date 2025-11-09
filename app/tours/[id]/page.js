// app/tour/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function TourDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Random image fallback
  const getRandomImage = () => {
    const images = [
      "https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2019/07/18/sundarbans_unesco.jpg",
      "https://media.gettyimages.com/id/1436236504/photo/aerial-view-cityscape-of-chittagong-city-bangladesh-chittagong-city-skyline-corporate-and.jpg?s=612x612&w=gi&k=20&c=ymrhvnKMN_G42MzyzKAeXKg4QoNJIy3W9UmF1-zjpvM=",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpDgXEUwosIRq6ytGbLE3SSJxRVikcnuVJg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNCgA0ylpM2UnVLmQxQtu5cUwrLWUL4Hh9ZQ&s",
      "https://images.ecency.com/p/99pyU5Ga1kwqSXWA2evTexn6YzPHotJF8R85JZsErvtTWXoJZycx7frYZrNVEQDYGGpkJ749esoFW5doKyBfE59dKqQnrdQb4Uwfx2XxFiH8faB13aHvXJb6KPwM65qwTC.png?format=match&mode=fit",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ049JUVh2OYjPa0pJgbgsK1quYKwTQn-RTdg&s",
      "https://pbs.twimg.com/media/Eco6w0EUwAAPqz_.jpg",
      "https://images.unsplash.com/photo-1610486849405-b7f7c4e51e70?fit=crop&w=800&h=600",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  // Get image URL with fallback
  const getImageUrl = (tour) => {
    return tour?.images?.length > 0 ? tour.images[0].url : getRandomImage();
  };

  useEffect(() => {
    async function fetchTour() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/tours/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch tour: ${res.status}`);
        const data = await res.json();
        if (!data) throw new Error("Tour not found");
        setTour(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchTour();
  }, [id]);

  const formatPrice = (price, currency = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "bg-gray-100 text-gray-800 border-gray-200";
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-green-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );

  if (!tour)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Tour Not Found</h3>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96 relative">
            <Image
              src={getImageUrl(tour)}
              alt={tour.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">About {tour.title}</h2>
            <p className="text-gray-700 leading-relaxed">{tour.description}</p>
          </div>

          {tour.itineraries?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
              <div className="space-y-4">
                {tour.itineraries.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.day}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      {item.details && <p className="text-gray-600">{item.details}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h3 className="text-2xl font-bold mb-2">{formatPrice(tour.basePrice, tour.currency)}</h3>
            <p className="text-gray-600 mb-4">per person</p>

            {/* Difficulty */}
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(tour.difficulty)}`}>
              {tour.difficulty || "Easy"}
            </span>

            {/* Book Button */}
            <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
