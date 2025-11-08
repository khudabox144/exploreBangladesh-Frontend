// app/districts/[name]/page.js
import Link from 'next/link';
import TouristSpotCard from '@/components/common/TouristSpotCard';

// Format slug like 'cox-s-bazar' to 'Cox’s Bazar'
function formatSlug(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Fetch district info from /api/districts
async function getDistrictInfo(districtSlug) {
  const res = await fetch('http://localhost:5000/api/districts', { cache: 'no-store' });
  const districts = await res.json();

  // Match by slugified district name
  const district = districts.find(d =>
    d.name.toLowerCase().replace(/\s+/g, '-') === districtSlug.toLowerCase()
  );

  return district || null;
}

// Fetch tour places from backend
async function getTourPlaces(districtName, divisionName) {
  const url = `http://localhost:5000/api/tour-places?division=${encodeURIComponent(divisionName)}&district=${encodeURIComponent(districtName)}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function DistrictPage({ params }) {
  const { name: districtSlug } = params;

  const districtInfo = await getDistrictInfo(districtSlug);
  if (!districtInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">District not found!</h1>
      </div>
    );
  }

  const districtName = districtInfo.name;
  const divisionName = districtInfo.division.name;

  const tourPlaces = await getTourPlaces(districtName, divisionName);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href={`/division/${divisionName.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{divisionName}</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{districtName}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tourist Places in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{districtName}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing tourist spots and attractions in {districtName}, {divisionName}
          </p>

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

        {/* Grid */}
        {tourPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPlaces.map(spot => <TouristSpotCard key={spot.id} spot={spot} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tourist Places Found</h3>
              <p className="text-gray-600 mb-6">We couldn’t find any tourist places in {districtName} yet.</p>
              <Link href="/" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {tourPlaces.length > 0 && (
          <div className="text-center mt-12">
            <Link href={`/division/${divisionName.toLowerCase()}`} className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400">
              Back to {divisionName} Division
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
