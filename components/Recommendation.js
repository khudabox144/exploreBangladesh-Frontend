"use client";
import React from "react";

// Famous tourist spots in Bangladesh
const recommendedDestinations = [
  { name: "Cox’s Bazar", tours: 1200, image: "https://r-xx.bstatic.com/xdata/images/city/608x352/666843.webp?k=4744586c4a79c997023e878de81730e457af8a28a1178d29f92f7677e658f95a&o=" },
  { name: "Sundarbans", tours: 950, image: "https://indiantigersafaris.com/wp-content/uploads/2024/09/sun-banner-3.webp" },
  { name: "Srimangal Tea Gardens", tours: 780, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqaDdLziFvLz9n3P5wS1Nvg3Dt8y5OGevgkQ&s" },
  { name: "Saint Martin’s Island", tours: 600, image: "https://www.shutterstock.com/image-photo/beauty-saint-martin-island-coxs-600nw-2308207335.jpg" },
  { name: "Bandarban", tours: 850, image: "https://www.travelmate.com.bd/wp-content/uploads/2021/02/Tindu-Thanchi-Bandarban.jpg" },
  { name: "Rangamati", tours: 500, image: "https://i.pinimg.com/564x/6e/20/da/6e20dafa689809390de47fbfff55f119.jpg" },
  { name: "Sylhet Ratargul Swamp Forest", tours: 420, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0huTfgXa6iJspEpfJp7s-3G578lCWNS7aPQ&s" },
  { name: "Paharpur Buddhist Monastery", tours: 310, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0sbQloRnklFuf7BhxBKj65E69OPbLfQZOw&s" },
  { name: "Mahasthangarh", tours: 260, image: "https://farm8.staticflickr.com/7620/27715467586_81cf9c0141_b.jpg" },
  { name: "Ahsan Manzil, Dhaka", tours: 400, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/16/b2/fe/ahsan-monjil.jpg?w=900&h=500&s=1" },
  { name: "Jaflong", tours: 550, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjpVUssHzOvQfWbkzACkFz9Rrr9vIOShjDQ&s" },
  { name: "Kuakata Sea Beach", tours: 480, image: "https://media.istockphoto.com/id/1500051616/photo/sea-wave-closeup-on-a-beach-beautiful-beach-with-blue-sky-and-tree-kuakata-sea-beach.jpg?s=612x612&w=0&k=20&c=tuM4FDLsuhsP7LI-Qu4f6rFntXR2BDZ3lKMZXZU7WmY=" },
];

const RecommendationCard = ({ name, tours, image }) => {
  return (
    <div className="relative w-full aspect-[1/1] overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-3 text-white">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm opacity-90">{tours} tours</p>
      </div>
    </div>
  );
};

const Recommendation = () => {
  return (
    <section className="px-4 py-8 md:px-8 md:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Famous Tourist Spots in Bangladesh Recommended by Our Travel Experts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {recommendedDestinations.map((dest, index) => (
            <RecommendationCard
              key={index}
              name={dest.name}
              tours={dest.tours}
              image={dest.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
