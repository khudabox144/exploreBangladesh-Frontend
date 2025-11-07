import { notFound } from 'next/navigation';
import Link from 'next/link';

// Updated mock data function that handles any ID
async function getTour(id) {
  // Replace with your actual API call
  // const res = await fetch(`http://localhost:5000/api/tours/${id}`);
  // if (!res.ok) return null;
  // return res.json();
  
  // Mock data that works for any ID - replace with your actual data structure
  const mockTours = {
    1: {
      id: 1,
      name: "Historical Dhaka City Exploration",
      price: 120,
      currency: 'USD',
      duration: 1,
      difficulty: 'Easy',
      rating: 4.5,
      image: "/teagarden.jpg",
      location: "Dhaka, Bangladesh",
      description: "Explore the rich history of Dhaka through its ancient monuments, museums, and cultural heritage.",
      fullDescription: `This full-day tour takes you through the heart of Old Dhaka, where history comes alive. Begin your journey at the magnificent Lalbagh Fort, a 17th-century Mughal fort complex. Then proceed to Ahsan Manzil, the Pink Palace, which served as the official residential palace of the Dhaka Nawab Family.`,
      highlights: ["Lalbagh Fort visit", "Ahsan Manzil exploration", "Star Mosque architecture"],
      included: ["Professional English-speaking guide", "All entrance fees", "Traditional Bengali lunch"],
      requirements: ["Comfortable walking shoes", "Camera for photos", "Sun protection"]
    },
    17: {
      id: 17,
      name: "Sylhet Tea Garden Experience",
      price: 95,
      currency: 'USD',
      duration: 2,
      difficulty: 'Easy',
      rating: 4.8,
      image: "/teagarden.jpg",
      location: "Sylhet, Bangladesh",
      description: "Immerse yourself in the beautiful tea gardens and natural wonders of Sylhet region.",
      fullDescription: `Discover the breathtaking beauty of Sylhet's tea gardens in this 2-day immersive experience. Walk through endless green tea plantations, learn about tea processing from local experts, and enjoy stunning views of the surrounding hills and waterfalls. Visit the famous Ratargul Swamp Forest and experience the unique ecosystem of this freshwater swamp forest.`,
      highlights: ["Tea garden exploration", "Tea tasting session", "Ratargul Swamp Forest", "Waterfall visits"],
      included: ["Expert local guide", "All entrance fees", "Accommodation for 1 night", "All meals included"],
      requirements: ["Comfortable walking shoes", "Rain jacket", "Camera", "Light backpack"]
    }
    // Add more IDs as needed based on your actual data
  };
  
  // Return mock data for the specific ID, or create dynamic data
  return mockTours[id] || {
    id: id,
    name: `Tour ${id}`,
    price: 100,
    currency: 'USD',
    duration: 1,
    difficulty: 'Medium',
    rating: 4.0,
    image: "/teagarden.jpg",
    location: "Bangladesh",
    description: `This is tour number ${id}`,
    fullDescription: `Detailed description for tour ${id}. This is an amazing experience that you'll love.`,
    highlights: ["Beautiful scenery", "Cultural experience", "Local guides"],
    included: ["Professional guide", "Transportation", "Entrance fees"],
    requirements: ["Comfortable shoes", "Water bottle", "Camera"]
  };
}

const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.92-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.84-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
  </svg>
);

export default async function TourDetailPage({ params }) {
  const { id } = await params;
  const tour = await getTour(id);
  
  if (!tour) {
    notFound();
  }

  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(tour.difficulty)}`}>
                {tour.difficulty}
              </span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-600">
                {tour.duration} day{tour.duration > 1 ? 's' : ''}
              </span>
            </div>

            {/* Price */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-gray-900">{formatPrice(tour.price, tour.currency)}</div>
            </div>

            {/* Title and Rating */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{tour.name}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="flex -space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < Math.round(tour.rating)} />
                      ))}
                    </div>
                    <span className="ml-2 text-lg">{tour.rating}</span>
                  </div>
                  <div className="flex items-center text-lg">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {tour.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Description</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {tour.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      ✓
                    </span>
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {tour.gallery && tour.gallery.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${tour.name} ${index + 1}`}
                      className="w-full h-32 md:h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book This Tour</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(tour.price, tour.currency)}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>

                {/* Included Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">What's Included</h4>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="text-green-500 mr-3">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-lg">What to Bring</h4>
                  <ul className="space-y-2">
                    {tour.requirements.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="text-blue-500 mr-3">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book Button */}
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  Book Now
                </button>

                {/* Contact Info */}
                <div className="text-center text-sm text-gray-500">
                  Need help? <a href="tel:+880123456789" className="text-blue-600 hover:text-blue-800">Call +880 1234 56789</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}