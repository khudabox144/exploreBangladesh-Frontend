import Link from 'next/link';

const TouristSpotCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
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
  );
};

export default TouristSpotCard;