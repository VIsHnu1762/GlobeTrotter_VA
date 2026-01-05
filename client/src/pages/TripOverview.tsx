import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Map, Calendar, Wallet, Share2, Download, ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import mapBg from "@assets/generated_images/minimalist_vector_world_map_background.png";

export default function TripOverview() {
  const [, params] = useRoute("/trip/:id");
  const id = params?.id;

  return (
    <div className="min-h-screen pb-20">
      {/* Header Image */}
      <div className="h-[40vh] relative bg-muted overflow-hidden">
        <img src={mapBg} alt="Map Background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="absolute top-6 left-6">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto">
          <Badge className="mb-4 bg-primary text-white hover:bg-primary/90">Europe Tour</Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-2">Summer in Italy</h1>
          <p className="text-lg text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Jun 15 - Jun 30, 2024
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="card-floating">
            <CardHeader>
              <CardTitle className="font-heading">Trip Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Duration</span>
                <span className="font-medium">15 Days</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Destinations</span>
                <span className="font-medium">Rome, Florence, Venice, Milan</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Distance</span>
                <span className="font-medium">~650 km</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-floating">
            <CardHeader>
              <CardTitle className="font-heading">Route Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 space-y-8 border-l-2 border-primary/20 ml-4">
                {[
                  { title: "Rome", days: "3 Days" },
                  { title: "Florence", days: "4 Days" },
                  { title: "Venice", days: "3 Days" },
                  { title: "Milan", days: "2 Days" },
                ].map((stop, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-background border-4 border-primary ring-2 ring-primary/20" />
                    <h3 className="font-bold text-lg">{stop.title}</h3>
                    <p className="text-muted-foreground">{stop.days}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="card-elevated bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary font-heading">
                <Wallet className="h-5 w-5" /> Budget Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 rounded-2xl bg-white/50 flex items-center justify-center border-2 border-dashed border-primary/30">
                <p className="text-sm text-muted-foreground text-center px-4">
                  Budget tracking & expense visualization coming soon!
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>

          <Link href="/itinerary/builder">
            <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20">
              <Map className="mr-2 h-4 w-4" /> Edit Itinerary
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
