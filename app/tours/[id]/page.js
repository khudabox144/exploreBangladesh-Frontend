import { notFound } from 'next/navigation';
import Link from 'next/link';

// Real API call for tour details
async function getTour(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/tours/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error(`API error: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

// Function to get a random image URL with more robust links that don't rely on Next.js config
function getRandomImage() {
    // Using high-quality images of Bangladesh without complex Unsplash query parameters 
    // to improve compatibility in environments without full Next.js image optimization configuration.
    const images = [
      'https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2019/07/18/sundarbans_unesco.jpg', // Sundarbans, Bangladesh
      'https://media.gettyimages.com/id/1436236504/photo/aerial-view-cityscape-of-chittagong-city-bangladesh-chittagong-city-skyline-corporate-and.jpg?s=612x612&w=gi&k=20&c=ymrhvnKMN_G42MzyzKAeXKg4QoNJIy3W9UmF1-zjpvM=', // Dhaka River View
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpDgXEUwosIRq6ytGbLE3SSJxRVikcnuVJg&s', // Tea gardens, Sreemangal
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNCgA0ylpM2UnVLmQxQtu5cUwrLWUL4Hh9ZQ&s', // Cox's Bazar beach
      'https://images.ecency.com/p/99pyU5Ga1kwqSXWA2evTexn6YzPHotJF8R85JZsErvtTWXoJZycx7frYZrNVEQDYGGpkJ749esoFW5doKyBfE59dKqQnrdQb4Uwfx2XxFiH8faB13aHvXJb6KPwM65qwTC.png?format=match&mode=fit', // Lush Green Landscape
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ049JUVh2OYjPa0pJgbgsK1quYKwTQn-RTdg&s', // Rural Boat Scene
      'https://pbs.twimg.com/media/Eco6w0EUwAAPqz_.jpg', // Boat on a river
      'https://images.unsplash.com/photo-1610486849405-b7f7c4e51e70?fit=crop&w=800&h=600', // Traditional Boat
    ];
    return images[Math.floor(Math.random() * images.length)];
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

  // Determine the image source, using a random image if none is available from the API
  const imageUrl = tour.images && tour.images.length > 0 
    ? tour.images[0].url 
    : getRandomImage();

  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800 border-gray-200';
    
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate average rating from reviews
  const averageRating = tour.reviews && tour.reviews.length > 0 
    ? tour.reviews.reduce((sum, review) => sum + review.rating, 0) / tour.reviews.length 
    : 4.0;

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
              src={imageUrl} // <-- Uses the calculated URL, which now includes more compatible links
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {tour.difficulty && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(tour.difficulty)}`}>
                  {tour.difficulty}
                </span>
              )}
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-600">
                {tour.durationDays} day{tour.durationDays > 1 ? 's' : ''}
              </span>
            </div>

            {/* Price */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-gray-900">{formatPrice(tour.basePrice, tour.currency)}</div>
            </div>

            {/* Title and Rating */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{tour.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="flex -space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} filled={i < Math.round(averageRating)} />
                      ))}
                    </div>
                    <span className="ml-2 text-lg">{averageRating.toFixed(1)}</span>
                    <span className="ml-1 text-sm text-gray-300">({tour.reviews?.length || 0} reviews)</span>
                  </div>
                  {tour.location && (
                    <div className="flex items-center text-lg">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {tour.location.name || 'Bangladesh'}
                    </div>
                  )}
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
                {(tour.description || 'No description available.')
                  .split('\n')
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))
                }
              </div>
            </div>

            {/* Itinerary */}
            {tour.itineraries && tour.itineraries.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Itinerary</h2>
                <div className="space-y-4">
                  {tour.itineraries.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {item.day}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        {item.details && (
                          <p className="text-gray-600 mt-1">{item.details}</p>
                        )}
                      </div>
                    </div>
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
                    {formatPrice(tour.basePrice, tour.currency)}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>

                {/* Operator Info */}
                {tour.operator && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Operated By</h4>
                    <p className="text-gray-700">{tour.operator.name}</p>
                    {tour.operator.description && (
                      <p className="text-sm text-gray-600 mt-1">{tour.operator.description}</p>
                    )}
                  </div>
                )}

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