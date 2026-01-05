import { useState } from "react";
import mapBg from "@assets/generated_images/minimalist_vector_world_map_background.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MapPin, Calendar, Clock, Coffee, Hotel, Camera, MoreVertical, Search, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const initialItinerary = [
  {
    day: 1,
    date: "Jun 15",
    title: "Arrival in Rome",
    activities: [
      { id: 1, time: "10:00 AM", title: "Arrive at Fiumicino Airport", type: "transport", location: "FCO Airport" },
      { id: 2, time: "12:00 PM", title: "Check-in at Hotel", type: "stay", location: "Hotel Artemide" },
      { id: 3, time: "02:00 PM", title: "Lunch at Trattoria", type: "food", location: "Trattoria da Enzo" },
      { id: 4, time: "04:00 PM", title: "Colosseum Visit", type: "activity", location: "Colosseum" },
    ]
  },
  {
    day: 2,
    date: "Jun 16",
    title: "Vatican City",
    activities: [
      { id: 5, time: "09:00 AM", title: "Vatican Museums", type: "activity", location: "Vatican City" },
      { id: 6, time: "01:00 PM", title: "Lunch Break", type: "food", location: "Prati District" },
    ]
  }
];

export default function ItineraryBuilder() {
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Top Bar */}
      <div className="bg-background border-b border-soft px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-heading font-bold flex items-center gap-2">
            Summer in Italy <span className="text-muted-foreground text-sm font-normal">Jun 15 - Jun 30</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">Share</Button>
          <Button size="sm" className="rounded-full">Export</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Itinerary List */}
        <div className="w-[400px] border-r border-soft bg-background flex flex-col shrink-0">
          <div className="p-4 border-b border-soft-light">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search places to add..." className="pl-9 rounded-2xl border-soft" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {itinerary.map((day) => (
                <div key={day.day} className="space-y-4">
                  <div className="sticky top-0 bg-background/95 backdrop-blur z-10 py-2 border-b border-soft-light flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                      <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm ring-1 ring-primary/20">
                        {day.day}
                      </span>
                      {day.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">{day.date}</span>
                  </div>

                  <div className="space-y-3 pl-4 border-l-2 border-muted/50 ml-4 relative">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="group relative card-soft p-3 hover-border-soft cursor-move">
                        <div className="absolute -left-[25px] top-4 w-3 h-3 rounded-full bg-muted border-2 border-background group-hover:bg-primary transition-colors ring-1 ring-border/50" />

                        <div className="flex gap-3">
                          <div className="text-muted-foreground pt-1">
                            <GripVertical className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {activity.time}
                              </span>
                              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                            <h4 className="font-medium text-sm">{activity.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {activity.type === 'stay' && <Hotel className="h-3 w-3" />}
                              {activity.type === 'food' && <Coffee className="h-3 w-3" />}
                              {activity.type === 'activity' && <Camera className="h-3 w-3" />}
                              {activity.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button variant="ghost" className="w-full text-muted-foreground border-dashed border hover:bg-muted/50 hover:text-primary hover:border-primary/50">
                      <Plus className="h-4 w-4 mr-2" /> Add Activity
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel: Map */}
        <div className="flex-1 relative bg-muted/10 overflow-hidden">
          <img
            src={mapBg}
            alt="Map View"
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
          />

          {/* Mock Floating Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="shadow-lg rounded-full h-10 w-10">+</Button>
            <Button size="icon" variant="secondary" className="shadow-lg rounded-full h-10 w-10">-</Button>
          </div>

          {/* Mock Markers on Map */}
          <div className="absolute top-[30%] left-[45%] group cursor-pointer">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform font-bold text-xs border-2 border-white">
              1
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Fiumicino Airport
            </div>
          </div>

          <div className="absolute top-[32%] left-[46%] group cursor-pointer">
            <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform font-bold text-xs border-2 border-white">
              2
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Hotel Artemide
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
