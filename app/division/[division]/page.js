import { notFound } from 'next/navigation';
import Link from 'next/link';

// Real API call for division data
async function getDivisionData(divisionName) {
  try {
    // Format division name for URL
    const formattedDivision = divisionName.toLowerCase().replace(/\s+/g, '-');
    
    const res = await fetch(`http://localhost:5000/api/divisions/${formattedDivision}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error(`API error: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching division data:', error);
    return null;
  }
}

function formatName(slug) {
  return slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export default async function DivisionPage({ params }) {
  const { division } = await params;
  const divisionData = await getDivisionData(division);
  
  if (!divisionData) {
    notFound();
  }

  const divisionName = formatName(division);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <Link 
              href="/"
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{divisionName}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Districts in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{divisionName}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore all districts and their tourist attractions in {divisionName} division
          </p>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {divisionData.districts && divisionData.districts.length > 0 ? (
            divisionData.districts.map((district) => (
              <Link
                key={district.id}
                href={`/division/${division}/${slugify(district.name)}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {district.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {district.tourPlaces || 0} tourist places
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">⭐</span>
                        <span className="text-xs text-gray-600 ml-1">
                          {district.averageRating ? district.averageRating.toFixed(1) : '4.0'}
                        </span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Districts Found</h3>
                <p className="text-gray-600 mb-6">
                  No districts available for {divisionName} division.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}