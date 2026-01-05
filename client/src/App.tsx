import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import CreateTrip from "@/pages/CreateTrip";
import ItineraryBuilder from "@/pages/ItineraryBuilder";
import TripOverview from "@/pages/TripOverview";
import About from "@/pages/About";
import Team from "@/pages/Team";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-trip" component={CreateTrip} />
      <Route path="/itinerary/new" component={ItineraryBuilder} />
      <Route path="/itinerary/builder" component={ItineraryBuilder} />
      <Route path="/trip/:id" component={TripOverview} />
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
          <Navbar />
          <main className="flex-1 pt-20">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
