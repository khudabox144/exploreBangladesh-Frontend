import Link from "next/link";
import React from "react";

const worldData = [
  {
    continent: "Dhaka",
    image: "https://t3.ftcdn.net/jpg/05/98/42/60/360_F_598426018_dZSafUODg9I0cEBJrj8F4AHzYmrXrHdW.jpg",
    countries: [
      "Lalbagh Fort",
      "Ahsan Manzil",
      "Bangladesh National Museum",
      "Star Mosque",
      "Dhakeshwari Temple",
      "Liberation War Museum",
      "National Parliament House",
      "Savar National Memorial",
      "Curzon Hall",
      "Tara Masjid"
    ]
  },
  {
    continent: "Chittagong",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0a/74/f0/27/chittagong-port.jpg",
    countries: [
      "Foy's Lake",
      "Patenga Beach",
      "Ethnological Museum",
      "Chittagong Commonwealth War Cemetery",
      "Shrine of Bayazid Bostami",
      "World War II Cemetery",
      "Bhatiary Lake",
      "Zia Memorial Museum",
      "Kaptai Lake",
      "Chandranath Hill"
    ]
  },
  {
    continent: "Sylhet",
    image: "https://grandsylhet.com/wp-content/uploads/2025/01/Best-Tourist-Places-in-Sylhet-1024x538.webp",
    countries: [
      "Ratargul Swamp Forest",
      "Jaflong",
      "Bisnakandi",
      "Lalakhal",
      "Sreemangal Tea Gardens",
      "Bichanakandi",
      "Lawachara National Park",
      "Malnicherra Tea Estate",
      "Khasi Punji",
      "Hazrat Shahjalal Mazar"
    ]
  },
  {
    continent: "Khulna",
    image: "https://i.natgeofe.com/n/a50f7239-ff6d-4874-9448-25d94d8d1c80/sundarbans-bangladesh.jpg",
    countries: [
      "The Sundarbans",
      "Shat Gumbad Mosque",
      "Rabindranath Tagore's Home",
      "Sixty Dome Mosque",
      "Khan Jahan Ali Bridge",
      "Karamjal Eco-Tourism Center",
      "Khulna University",
      "Rupsha River",
      "Mongla Port",
      "Kotka Beach"
    ]
  },
  {
    continent: "Barisal",
    image: "https://barishaltourismcenters.wordpress.com/wp-content/uploads/2018/11/pi.jpg",
    countries: [
      "Kuakata Beach",
      "Durga Sagar",
      "Guthia Mosque",
      "Floating Guava Market",
      "Barisal Museum",
      "Cemetery of Sheikh Majibur Rahman",
      "Padri Shibpur Church",
      "Barisal Circuit House",
      "Lakutia Zamindar Bari",
      "Shawrapatra Beel"
    ]
  },
  {
    continent: "Rajshahi",
    image: "https://ecdn.dhakatribune.net/contents/cache/images/640x0x1/uploads/media/2023/09/13/Rajshahi-Development-5-f6819dd6ea94084fd01a011dac7ca45d.jpg",
    countries: [
      "Varendra Research Museum",
      "Paharpur Buddhist Monastery",
      "Somapura Mahavihara",
      "Mahasthangarh",
      "Puthia Rajbari",
      "Choto Sona Mosque",
      "Bagarpara Mazar",
      "Uttara Gonobhaban",
      "Bagha Mosque",
      "Bhavani Mandir"
    ]
  },
  {
    continent: "Rangpur",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/60/70/51/caption.jpg?w=800&h=800&s=1",
    countries: [
      "Tajhat Palace",
      "Daria Lal Shah Mazar",
      "Rangpur Zoo",
      "Natore Rajbari",
      "Kantanagar Temple",
      "Pirganj Jamindar Bari",
      "Chiklir Beel",
      "Carmichael College",
      "Shyamasundari Canal",
      "Anandabazar"
    ]
  },
  {
    continent: "Mymensingh",
    image: "https://i.pinimg.com/736x/0b/11/88/0b11881451048581d97df71a2b25d64e.jpg",
    countries: [
      "Gouripur House",
      "Mymensingh Museum",
      "Shashi Lodge",
      "Muktagacha Zamindar House",
      "Alexander Castle",
      "Bokainagar Fort",
      "Bhaluka Elephant Training Camp",
      "Zainul Abedin Museum",
      "Kalikapur Forest",
      "Dhaleshwari River"
    ]
  }
];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

const WorldTour = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {worldData.map((region, index) => (
          <div
            key={index}
            className="bg-purple-100 rounded-lg shadow-xl hover:shadow-2xl transition"
          >
            {/* Banner with Image + Title */}
            <div
              className="relative h-48 rounded-t-lg overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.05)), url(${region.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <h2 className="absolute left-4 bottom-4 text-white text-2xl font-bold drop-shadow">
                {region.continent}
              </h2>
            </div>

            {/* Country List */}
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
              {region.countries.map((country, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-purple-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Link
                    href={`/division/sylhet/${slugify(country)}`}
                    className="w-full block text-left cursor-pointer text-sm py-1 rounded transition text-purple-800 hover:text-purple-600"
                  >
                    {country}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorldTour;