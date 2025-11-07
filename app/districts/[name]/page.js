import TouristSpotCard from '@/components/common/TouristSpotCard';
import { notFound } from 'next/navigation';

async function getDistrictTours(districtName) {
  // Replace with your actual API call
  const res = await fetch(`http://localhost:5000/api/tours?district=${districtName}`);
  if (!res.ok) return [];
  return res.json();
}

function formatDistrictName(name) {
  if (!name) return '';
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export default async function DistrictPage({ params }) {
  // FIX: Await the params promise
  const { name } = await params;
  const tours = await getDistrictTours(name);
  const districtName = formatDistrictName(name);

  if (!name) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back to Home
        </button>

        {/* District Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tourist Spots in {districtName}
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing tours and experiences in {districtName} district
          </p>
        </div>

        {/* Tours Grid */}
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(tour => (
              <TouristSpotCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              No tours found for {districtName}
            </h2>
            <p className="text-gray-500">
              Check back later for new tours in this district.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}