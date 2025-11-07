// app/page.js
import Header from "@/components/Header";
import TouristSpotList from "@/components/TouristSpotList";
import BangladeshTour from "@/components/BangladeshTour";
import Recommendation from "@/components/Recommendation";
import Hero from "@/components/Hero";
import UserRegistration from "@/components/UserRegistration";
import Link from 'next/link';

// Districts Section Component
const DistrictsSection = () => {
  const districts = [
    { name: 'Dhaka', tourCount: 15 },
    { name: 'Chittagong', tourCount: 12 },
    { name: 'Cox\'s Bazar', tourCount: 8 },
    { name: 'Bandarban', tourCount: 6 },
    { name: 'Rangamati', tourCount: 5 },
    { name: 'Sylhet', tourCount: 7 }
  ];

  const formatDistrictUrl = (name) => {
    return name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-lg text-gray-600 mb-2">Popular Districts</h2>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore by District</h1>
          <p className="text-gray-600 text-lg">
            Discover amazing tourist spots across different districts of Bangladesh
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {districts.map((district) => (
            <Link 
              key={district.name}
              href={`/districts/${formatDistrictUrl(district.name)}`}
            >
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-semibold text-gray-900 mb-2">{district.name}</h3>
                <p className="text-sm text-gray-600">{district.tourCount} tours</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Tours Section Component
const FeaturedToursSection = () => {
  const featuredTours = [
    {
      id: 1,
      title: "Historical Dhaka City Exploration",
      price: "$120.00",
      duration: "1 day",
      description: "Explore the rich history of Dhaka through its ancient monuments, museums, and cultural heritage...",
      rating: 4.5,
      image: "/images/dhaka-tour.jpg"
    },
    {
      id: 2,
      title: "Sylhet Tea Garden Experience",
      price: "$95.00",
      duration: "2 days",
      description: "Immerse yourself in the beautiful tea gardens and natural wonders of Sylhet region...",
      rating: 4.8,
      image: "/images/sylhet-tour.jpg"
    },
    {
      id: 3,
      title: "Cox's Bazar Beach Paradise",
      price: "$150.00",
      duration: "3 days",
      description: "Enjoy the world's longest natural sea beach with stunning sunsets and water activities...",
      rating: 4.7,
      image: "/images/coxs-bazar-tour.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Featured Tours
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map(tour => (
            <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <>
      <header className="p-4 flex justify-end max-w-7xl mx-auto">
        {/* <Header /> */}
      </header>
      <main>
        <section id="hero">
          <Hero />
        </section>
        
        {/* Featured Tours Section */}
        <section id="featured-tours">
          <FeaturedToursSection />
        </section>

        {/* Districts Section */}
        <section id="districts">
          <DistrictsSection />
        </section>
        
        <section id="spots">
          <TouristSpotList />
        </section>
        
        <section id="bangladesh-tour">
          <BangladeshTour />
        </section>

        <section id="registration" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Join Our Community</h2>
            <UserRegistration />
          </div>
        </section>
        
        <section id="recommendation">
          <Recommendation />
        </section>
      </main>
    </>
  );
}