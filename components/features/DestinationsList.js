'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { tourPlacesAPI } from '@/utils/api'; 

// Keep this function outside the component
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

export default function DestinationsList() {
  const [tourPlaces, setTourPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTourPlaces() {
      try {
        setLoading(true);
        setError(null);
        const response = await tourPlacesAPI.getAll();
        
        // Assign random images to places that don't have images
        const placesWithImages = response.data.map(place => ({
          ...place,
          displayImage: place.image || getRandomImage()
        }));
        
        setTourPlaces(placesWithImages || []);
      } catch (err) {
        console.error('Error fetching tour places:', err);
        setError('Failed to load destinations');
        setTourPlaces([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTourPlaces();
  }, []);

  // ... loading and error states remain the same

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tourPlaces.map((place) => (
        <div 
          key={place.id} 
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
          <div className="relative h-48">
            <img
              src={place.displayImage}
              alt={place.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/1e40af/ffffff?text=Destination';
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 truncate">
              {place.name}
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1110.9 0L10 18.293 5.05 4.05zm5 11.243l3.667-11.25a5 5 0 10-7.334 0l3.667 11.25z" clipRule="evenodd" />
              </svg>
              {place.district?.name || place.district || 'Unspecified District'}
            </div>
            
            <p className="text-gray-600 line-clamp-3 mb-4">
              {place.description || 'A beautiful location waiting to be explored.'}
            </p>
            
            <Link 
              href={`/tour-place/${place.id}`}
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}