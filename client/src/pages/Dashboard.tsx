import { TripCard } from "@/components/shared/TripCard";
import mapBg from "@assets/generated_images/minimalist_vector_world_map_background.png";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const trips = [
    {
      id: "1",
      title: "Summer in Italy",
      dates: "Jun 15 - Jun 30, 2024",
      destinations: 4,
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "2",
      title: "Japan Cherry Blossoms",
      dates: "Apr 01 - Apr 14, 2025",
      destinations: 6,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 relative">
      {/* Subtle Blended Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        <div
          className="absolute inset-0 opacity-[0.08] bg-center bg-no-repeat bg-cover mix-blend-soft-light"
          style={{
            backgroundImage: `url(/travel-landmarks-3d.png)`,
            backgroundSize: '1200px auto',
            backgroundPosition: 'center bottom'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Welcome back, Traveler</h1>
            <p className="text-muted-foreground mt-1">Ready to continue planning your next adventure?</p>
          </div>
          <Link href="/create-trip">
            <Button className="rounded-full shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Create New Trip
            </Button>
          </Link>
        </div>

        {/* Trips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trips.map(trip => (
            <TripCard key={trip.id} {...trip} />
          ))}
          <TripCard id="new" title="" dates="" destinations={0} image="" isNew />
        </div>

        {/* Map Preview Section */}
        <div className="card-floating overflow-hidden">
          <div className="p-6 border-b border-soft flex justify-between items-center bg-card/50">
            <h2 className="text-xl font-heading font-semibold">Your Travel Map</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground rounded-full">Expand Map</Button>
          </div>
          <div className="relative h-[400px] w-full bg-muted/30">
            <img src={mapBg} alt="World Map" className="w-full h-full object-cover opacity-60" />

            {/* Mock Markers */}
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 animate-pulse" style={{ left: '52%', top: '35%' }} />
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-secondary rounded-full ring-4 ring-secondary/20" style={{ left: '85%', top: '42%' }} />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-background/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                Visualizing 10 destinations across 2 trips
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
