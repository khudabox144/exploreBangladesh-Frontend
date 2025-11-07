"use client";
import { useParams } from "next/navigation";

const sylhetData = {
  "ratargul-swamp-forest": {
    name: "Ratargul Swamp Forest",
    images: [
      "https://www.travelmate.com.bd/wp-content/uploads/2019/07/Ratargul-2.jpg",
      "https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2024/04/15/01_0.jpg"
    ],
    cost: "৳500 - ৳1500 (from Sylhet city, depending on transport)",
    description:
      "Ratargul is the only freshwater swamp forest in Bangladesh, about 26 km from Sylhet. Travelers can go by CNG auto, car, or local bus, then take a boat ride inside the swamp forest. Best time to visit is during monsoon."
  },
  jaflong: {
    name: "Jaflong",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjpVUssHzOvQfWbkzACkFz9Rrr9vIOShjDQ&s",
      "https://www.travelmate.com.bd/wp-content/uploads/2019/07/Jaflong-Travel.jpg"
    ],
    cost: "৳800 - ৳2000",
    description:
      "Jaflong, located at the foot of the Khasi hills, is famous for its stone collection activities, rolling tea gardens, and the Dawki River flowing from India. It is one of Sylhet's most iconic tourist destinations."
  },
  bisnakandi: {
    name: "Bisnakandi",
    images: [
      "https://d34vm3j4h7f97z.cloudfront.net/original/4X/7/b/3/7b3a9550642f9e80f4bf233caf359a2942641f96.jpeg",
      "https://en.wikipedia.org/wiki/Bichnakandi"
    ],
    cost: "৳700 - ৳1800",
    description:
      "Bisnakandi is a natural wonder where many layers of the Khasi hills meet at a single point. Known for its crystal-clear water and stone beds, it is best enjoyed during the rainy season."
  },
  lalakhal: {
    name: "Lalakhal",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNR0hsiDOgzidCdce0kdB1bt7SywJXsE98uA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRftmlDcsVYu9hvgmID5cO0T9iMyWeQNQ-Mzw&s"
    ],
    cost: "৳600 - ৳1500",
    description:
      "Lalakhal is a stunning river with crystal-clear blue-green water, surrounded by hills and tea gardens. Tourists can enjoy boat rides while taking in the natural beauty of Sylhet."
  },
  "sreemangal-tea-gardens": {
    name: "Sreemangal Tea Gardens",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8N8rSNjxI-JyLCtClDSKH3eGz5ol5i2ysmw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtX9spR5lv6veu8NCBL0IK9-4dKeCIPjf_pQ&s"
    ],
    cost: "৳500 - ৳1200",
    description:
      "Known as the 'Tea Capital of Bangladesh,' Sreemangal is home to endless tea gardens. Visitors can enjoy lush greenery, fresh tea, and the tranquil environment."
  },
  bichanakandi: {
    name: "Bichanakandi",
    images: [
      "https://d34vm3j4h7f97z.cloudfront.net/original/4X/7/b/3/7b3a9550642f9e80f4bf233caf359a2942641f96.jpeg",
      "https://en.wikipedia.org/wiki/Bichnakandi"
    ],
    cost: "৳700 - ৳1800",
    description:
      "Bichanakandi is a beautiful spot where stones from the Khasi hills gather in flowing streams. It's a peaceful place to relax and enjoy nature, especially in the rainy season."
  },
  "lawachara-national-park": {
    name: "Lawachara National Park",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPVZtpB4FOv-55wcQhKJp9PINVQAEeF6PWTA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_GApYNV1_owbEX15Ho0QUY_g3ej95-bQb5g&s"
    ],
    cost: "৳300 - ৳1000",
    description:
      "Lawachara is a tropical rainforest located near Sreemangal. It's rich in biodiversity, home to rare species like the Hollock Gibbons. Ideal for trekking and nature walks."
  },
  "malnicherra-tea-estate": {
    name: "Malnicherra Tea Estate",
    images: [
      "https://vromonguide.com/wp-content/uploads/malnicherra-tea-garden-1.jpg",
      "https://bangla.tourtoday.com.bd/wp-content/uploads/2016/10/Malani-rhyme-tea-garden.jpg"
    ],
    cost: "৳200 - ৳800",
    description:
      "Established in 1849, Malnicherra is the oldest tea estate in Bangladesh. Visitors can walk through scenic tea gardens and experience the heritage of Sylhet's tea industry."
  },
  "khasi-punji": {
    name: "Khasi Punji (Tribal Village)",
    images: [
      "https://c8.alamy.com/comp/3CAGR80/november-23-2023-sylhet-bangladesh-khasi-tribe-adorn-with-there-tradional-attaire-and-performing-dance-on-the-occasion-to-celebrate-khasi-seng-kut-snem-2023-organized-by-the-khasi-social-council-khasi-seng-kutsnem-a-traditional-year-end-festival-of-the-khasi-community-of-greater-sylhet-division-was-held-at-magurchhara-khasia-punji-field-in-kamalganj-credit-image-md-rafayat-haque-khanzuma-press-wire-3CAGR80.jpg",
      "https://c8.alamy.com/comp/3CAGR7M/november-23-2023-sylhet-bangladesh-khasi-tribe-adorn-with-there-tradional-attaire-on-the-occasion-to-celebrate-khasi-seng-kut-snem-2023-organized-by-the-khasi-social-council-khasi-seng-kutsnem-a-traditional-year-end-festival-of-the-khasi-community-of-greater-sylhet-division-was-held-at-magurchhara-khasia-punji-field-in-kamalganj-credit-image-md-rafayat-haque-khanzuma-press-wire-3CAGR7M.jpg"
    ],
    cost: "৳500 - ৳1200",
    description:
      "Khasi Punji is a traditional Khasi tribal village where visitors can experience indigenous culture, bamboo houses, betel leaf farming, and the unique lifestyle of the Khasi community."
  },
  "hazrat-shahjalal-mazar": {
    name: "Hazrat Shahjalal Mazar Sharif",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnzIu98pijrAjF1n_F6cItvz8IDhnokEWuZQ&s",
      "https://c8.alamy.com/comp/2C6BAH6/hazrat-shah-jalal-mosque-and-tomb-sylhet-bangladesh-asia-2C6BAH6.jpg"
    ],
    cost: "Free entry (donations optional)",
    description:
      "The shrine of Hazrat Shahjalal (R), a revered Sufi saint, is one of Sylhet’s most visited spiritual sites. Pilgrims and tourists alike come here to seek blessings and witness its spiritual atmosphere."
  }
};


export default function TouristSpotPage() {
  const { id } = useParams();
  const place = sylhetData[id];

  if (!place) {
    return (
      <div className="p-6 text-center text-red-500">
        ❌ Tourist spot not found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="h-72 sm:h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${place.images[0]})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
            {place.name}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Cost + Description */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{place.description}</p>
          <p className="text-lg font-medium text-indigo-600">
            💰 Travel Cost: {place.cost}
          </p>
        </div>

        {/* Image Gallery */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {place.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={place.name}
              className="rounded-xl shadow-md hover:scale-[1.02] transition-transform"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
