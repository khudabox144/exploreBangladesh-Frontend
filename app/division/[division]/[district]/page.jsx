// app/division/[division]/[district]/page.js - FIXED VERSION
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TouristSpotCard from '@/components/common/TouristSpotCard';

// API call - working version
async function getDistrictTourPlaces(divisionName, districtName) {
  try {
    // Use the exact format that works from your test
    const apiUrl = `http://localhost:5000/api/tour-places?division=${divisionName}&district=${districtName}`;
    
    console.log('Fetching from:', apiUrl);
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error('API response not OK:', res.status);
      return [];
    }
    
    const data = await res.json();
    console.log('API returned data:', data);
    return data;
  } catch (error) {
    console.error('Error in getDistrictTourPlaces:', error);
    return [];
  }
}

function formatName(slug) {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export default async function DistrictTourPlacesPage({ params }) {
  try {
    const { division, district } = await params;
    
    console.log('Page received params:', { division, district });
    
    const tourPlaces = await getDistrictTourPlaces(division, district);
    const divisionName = formatName(division);
    const districtName = formatName(district);

    console.log('Final tour places count:', tourPlaces.length);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span>›</span>
              <Link href={`/division/${division}`} className="hover:text-blue-600 transition-colors">
                {divisionName}
              </Link>
              <span>›</span>
              <span className="text-gray-900 font-medium">{districtName}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tourist Places in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{districtName}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing tourist spots and attractions in {districtName}, {divisionName}
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center space-x-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{tourPlaces.length}</div>
                <div className="text-sm text-gray-500">Tourist Places</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${tourPlaces.length > 0 ? Math.min(...tourPlaces.map(p => p.price)) : 0}
                </div>
                <div className="text-sm text-gray-500">Starting Price</div>
              </div>
            </div>
          </div>

          {/* Tour Places Grid */}
          {tourPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tourPlaces.map((spot) => (
                <TouristSpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tourist Places Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any tourist places in {districtName} yet.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* Back to Division Button */}
          {tourPlaces.length > 0 && (
            <div className="text-center mt-12">
              <Link 
                href={`/division/${division}`}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {divisionName} Division
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Page error:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600 mb-2">Error: {error.message}</p>
          <p className="text-sm text-gray-500 mb-4">
            Check the browser console (F12) for more details
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }
}