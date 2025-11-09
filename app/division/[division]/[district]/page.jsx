"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TouristSpotCard from "@/components/TouristSpotCard";

export default function DistrictTourPage() {
  const params = useParams(); // { division, district }
  const { division, district } = params;
  const [tourPlaces, setTourPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTourPlaces() {
      try {
        setLoading(true);
        
        // Format division and district names for API
        const formattedDivision = division.toLowerCase().replace(/\s+/g, '-');
        const formattedDistrict = district.toLowerCase().replace(/\s+/g, '-');
        
        console.log('Fetching tour places for:', { formattedDivision, formattedDistrict });
        
        const res = await fetch(
          `http://localhost:5000/api/tour-places?division=${formattedDivision}&district=${formattedDistrict}`,
          { cache: "no-store" }
        );
        
        console.log('Response status:', res.status);
        
        if (!res.ok) throw new Error("Failed to fetch tour places");
        
        const data = await res.json();
        console.log('Tour places data:', data);
        setTourPlaces(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (division && district) {
      fetchTourPlaces();
    }
  }, [division, district]);

  // Format names for display
  const formatName = (slug) => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) return <div className="text-center py-8">Loading tourist places...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Tourist Places in {formatName(district)}, {formatName(division)}
        </h1>
        
        {tourPlaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tourist Places Found</h3>
              <p className="text-gray-600">
                No tourist places available for {formatName(district)} district.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourPlaces.map(place => (
              <TouristSpotCard key={place.id} spot={place} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}