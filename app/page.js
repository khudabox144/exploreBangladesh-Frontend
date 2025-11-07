// app/page.js
import Header from "@/components/Header";
import TouristSpotList from "@/components/TouristSpotList";
import BangladeshTour from "@/components/BangladeshTour";
import Recommendation from "@/components/Recommendation";
import Hero from "@/components/Hero";
import UserRegistration from "@/components/UserRegistration";

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