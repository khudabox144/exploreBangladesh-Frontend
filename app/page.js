// app/page.js
import Header from "@/components/Header";
import TouristSpotList from "@/components/TouristSpotList";
import WorldTour from "@/components/world-tour";
import Recommendation from "@/components/Recommendation";
import Hero from "@/components/Hero";
//  

export default function Page() {
  return (
    <>
      <header className="p-4 flex justify-end max-w-7xl mx-auto">
        <Header />
      </header>
      <main>
        <section id="hero">
          <Hero />
        </section>
        
        {/* Replace TouristSpotList with FeaturedTours or keep both */}
        {/* <section id="featured-tours">
          <FeaturedTours />
        </section> */}
        
        <section id="spots">
          <TouristSpotList />
        </section>
        
        <section id="world-tour">
          <WorldTour />
        </section>
        
        <section id="recommendation">
          <Recommendation />
        </section>
      </main>
    </>
  );
}