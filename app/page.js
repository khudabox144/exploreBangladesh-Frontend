import Header from "@/components/Header";
import TouristSpotList from "@/components/TouristSpotList";
import WorldTour from "@/components/world-tour";
import Recommendation from "@/components/Recommendation";
import Hero from "@/components/Hero";

export default function Page() {
  return (
    <>
      <header className="p-4 flex justify-end max-w-7xl mx-auto"></header>
      <main>
        <section id="hero" >
          <Hero />
        </section>
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
