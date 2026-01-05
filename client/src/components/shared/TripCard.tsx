import { Link } from "wouter";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TripCardProps {
  id: string;
  title: string;
  dates: string;
  destinations: number;
  image: string;
  isNew?: boolean;
}

export function TripCard({ id, title, dates, destinations, image, isNew }: TripCardProps) {
  if (isNew) {
    return (
      <Link href="/create-trip">
        <div className="h-full min-h-[300px] border-2 border-dashed border-muted-foreground/20 rounded-container flex flex-col items-center justify-center p-6 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group bg-card/50">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-3xl text-primary font-light">+</span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-foreground">Create New Trip</h3>
          <p className="text-muted-foreground text-sm mt-2">Start a new adventure</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/trip/${id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 group cursor-pointer card-elevated hover-border-soft">
        <div className="relative h-48 overflow-hidden rounded-t-container-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-4 left-4 z-20">
            <Badge variant="secondary" className="mb-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-0 rounded-full">
              {destinations} Stops
            </Badge>
            <h3 className="text-xl font-heading font-bold text-white leading-tight">{title}</h3>
          </div>
        </div>
        <CardContent className="pt-4">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4 mr-2" />
            {dates}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            Europe Tour
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4">
          <div className="text-sm font-medium text-primary flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            View Itinerary <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
