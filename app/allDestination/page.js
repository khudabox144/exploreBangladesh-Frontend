import DestinationsList from "@/components/features/DestinationsList";

export default function AllDestinationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 border-b pb-4">
          All Tour Destinations in Bangladesh
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Discover beautiful places, from historical sites to natural wonders.
        </p>
        
        {/* Client Component */}
        <DestinationsList />
      </div>
    </div>
  );
}